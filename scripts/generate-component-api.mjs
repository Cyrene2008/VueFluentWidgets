import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseJavaScript } from '@babel/parser'
import { baseParse } from '@vue/compiler-dom'
import { parse as parseSfc } from '@vue/compiler-sfc'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = resolve(root, 'packages/vue-fluent-widgets/src/index.js')
const outputPath = resolve(root, 'demo/src/data/componentApi.generated.js')
const checkOnly = process.argv.includes('--check')

const walk = (node, visit) => {
  if (!node || typeof node !== 'object') return
  visit(node)
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'start', 'end', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) continue
    if (Array.isArray(value)) value.forEach(child => walk(child, visit))
    else if (value && typeof value === 'object') walk(value, visit)
  }
}

const keyName = node => {
  if (!node) return ''
  if (node.type === 'Identifier') return node.name
  if (node.type === 'StringLiteral') return node.value
  return ''
}

const literalValue = node => {
  if (!node) return undefined
  if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral'].includes(node.type)) return node.value
  if (node.type === 'NullLiteral') return null
  return undefined
}

const nodeSource = (source, node) => source.slice(node.start, node.end)

const typeNames = node => {
  if (!node) return []
  if (node.type === 'Identifier') return [node.name]
  if (node.type === 'ArrayExpression') return node.elements.flatMap(typeNames)
  return [node.type.replace(/Expression$/, '')]
}

const validatorValues = node => {
  if (!node) return []
  let values = []
  walk(node, child => {
    if (child.type !== 'CallExpression' || child.callee?.type !== 'MemberExpression') return
    if (keyName(child.callee.property) !== 'includes' || child.callee.object?.type !== 'ArrayExpression') return
    const candidates = child.callee.object.elements.map(literalValue)
    if (candidates.every(value => value !== undefined)) values = candidates
  })
  return values
}

const parseProps = (scriptAst, source) => {
  let propsObject
  walk(scriptAst, node => {
    if (node.type === 'CallExpression' && node.callee?.type === 'Identifier' && node.callee.name === 'defineProps') {
      if (node.arguments[0]?.type === 'ObjectExpression') propsObject = node.arguments[0]
    }
  })
  if (!propsObject) return []

  return propsObject.properties.flatMap(property => {
    if (property.type !== 'ObjectProperty') return []
    const name = keyName(property.key)
    if (!name) return []
    const definition = property.value
    if (definition.type !== 'ObjectExpression') {
      return [{ name, types: typeNames(definition), required: false, default: undefined, values: [] }]
    }

    const fields = Object.fromEntries(definition.properties
      .filter(field => field.type === 'ObjectProperty')
      .map(field => [keyName(field.key), field.value]))
    return [{
      name,
      types: typeNames(fields.type),
      required: literalValue(fields.required) === true,
      default: fields.default ? nodeSource(source, fields.default) : undefined,
      defaultValue: literalValue(fields.default),
      values: validatorValues(fields.validator)
    }]
  })
}

const parseEmits = scriptAst => {
  let events = []
  walk(scriptAst, node => {
    if (node.type !== 'CallExpression' || node.callee?.type !== 'Identifier' || node.callee.name !== 'defineEmits') return
    const declaration = node.arguments[0]
    if (declaration?.type === 'ArrayExpression') {
      events = declaration.elements.map(literalValue).filter(value => typeof value === 'string')
    }
  })
  return events
}

const parseExposed = scriptAst => {
  let exposed = []
  walk(scriptAst, node => {
    if (node.type !== 'CallExpression' || node.callee?.type !== 'Identifier' || node.callee.name !== 'defineExpose') return
    const declaration = node.arguments[0]
    if (declaration?.type === 'ObjectExpression') exposed = declaration.properties.map(property => keyName(property.key)).filter(Boolean)
  })
  return exposed
}

const parseSlots = template => {
  if (!template) return []
  const ast = baseParse(template)
  const slots = []
  walk(ast, node => {
    if (node.type !== 1 || node.tag !== 'slot') return
    let name = 'default'
    const props = []
    for (const attribute of node.props) {
      if (attribute.type === 6) {
        if (attribute.name === 'name') name = attribute.value?.content || 'default'
        else props.push(attribute.name)
      } else if (attribute.type === 7 && attribute.name === 'bind') {
        const argument = attribute.arg?.content || 'dynamic'
        if (argument === 'name') name = `dynamic: ${attribute.exp?.content || 'name'}`
        else props.push(argument)
      }
    }
    const key = `${name}|${props.join(',')}`
    if (!slots.some(slot => slot.key === key)) slots.push({ key, name, props })
  })
  return slots.map(({ key, ...slot }) => slot)
}

const indexSource = await readFile(indexPath, 'utf8')
const indexAst = parseJavaScript(indexSource, { sourceType: 'module' })
const imports = new Map()
let exportedNames = []

for (const statement of indexAst.program.body) {
  if (statement.type === 'ImportDeclaration' && statement.source.value.endsWith('.vue')) {
    const defaultImport = statement.specifiers.find(specifier => specifier.type === 'ImportDefaultSpecifier')
    if (defaultImport) imports.set(defaultImport.local.name, statement.source.value)
  }
  if (statement.type === 'ExportNamedDeclaration') {
    exportedNames.push(...statement.specifiers.map(specifier => specifier.local.name))
  }
}

const generated = {}
for (const name of exportedNames) {
  const relativePath = imports.get(name)
  if (!relativePath) continue
  const componentPath = resolve(dirname(indexPath), relativePath)
  const source = await readFile(componentPath, 'utf8')
  const { descriptor } = parseSfc(source, { filename: componentPath })
  const setup = descriptor.scriptSetup?.content || ''
  const scriptAst = parseJavaScript(setup, { sourceType: 'module', plugins: ['jsx'] })
  generated[name] = {
    props: parseProps(scriptAst, setup),
    events: parseEmits(scriptAst),
    slots: parseSlots(descriptor.template?.content || ''),
    exposed: parseExposed(scriptAst)
  }
}

const contents = `// Generated by scripts/generate-component-api.mjs. Do not edit manually.\nexport const generatedComponentApi = ${JSON.stringify(generated, null, 2)}\n`

if (checkOnly) {
  const current = await readFile(outputPath, 'utf8').catch(() => '')
  if (current !== contents) {
    console.error('Component API metadata is out of date. Run pnpm docs:generate.')
    process.exit(1)
  }
} else {
  await writeFile(outputPath, contents, 'utf8')
  console.log(`Generated API metadata for ${Object.keys(generated).length} components.`)
}
