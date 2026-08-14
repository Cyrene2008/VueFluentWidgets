import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 1. 路径处理
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const distPath = join(rootDir, 'packages/vue-fluent-widgets/dist');
const widgetDir = join(rootDir, 'packages/vue-fluent-widgets');
const demoDir = join(rootDir, 'demo');

try {
  // 2. 【关键步骤】确保组件库依赖已安装
  // 检查 node_modules 是否存在，如果不存在则安装
  const widgetNodeModules = join(widgetDir, 'node_modules');
  if (!existsSync(widgetNodeModules)) {
    console.log('📦 检测到组件库缺少依赖，正在安装...');
    execSync('bun install', {
      cwd: widgetDir,
      stdio: 'inherit'
    });
  }

  // 3. 检查是否需要构建
  if (!existsSync(distPath)) {
    console.log('🔨 未检测到构建产物，正在执行构建...');
    
    // 使用 bun run build，这会读取 package.json 里的 "build": "vite build"
    // 因为依赖已经装好了，这里就能找到 vite 了
    execSync('bun run build', {
      cwd: widgetDir,
      stdio: 'inherit'
    });
  } else {
    console.log('✅ 检测到已有构建产物，跳过构建。');
  }

  // 4. 启动 Demo (同样确保 Demo 依赖存在)
  const demoNodeModules = join(demoDir, 'node_modules');
  if (!existsSync(demoNodeModules)) {
    console.log('📦 检测到 Demo 缺少依赖，正在安装...');
    execSync('bun install', {
      cwd: demoDir,
      stdio: 'inherit'
    });
  }

  console.log('🚀 正在启动 Demo 开发服务器...');
  execSync('bun run dev', {
    cwd: demoDir,
    stdio: 'inherit'
  });

} catch (error) {
  console.error('❌ 执行出错:', error.message);
  process.exit(1);
}