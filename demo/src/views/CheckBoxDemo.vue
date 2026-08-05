<template>
  <div class="checkbox-demo">
    <div class="page-header">
      <h1>CheckBox 复选框</h1>
      <p>Fluent 复选框组件，用于多选操作。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentCheckBox v-model="checked1" label="选项 1" />
          <FluentCheckBox v-model="checked2" label="选项 2" />
          <FluentCheckBox v-model="checked3" label="选项 3" />
        </div>
        <div class="demo-info">
          <p>选中的选项: {{ selectedOptions }}</p>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentCheckBox v-model="disabledChecked" label="禁用的复选框" disabled />
          <FluentCheckBox v-model="disabledUnchecked" label="禁用的复选框" disabled />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不确定状态" 
      :source-code="indeterminateCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentCheckBox v-model="indeterminateValue" label="不确定状态" indeterminate />
          <FluentCheckBox v-model="indeterminateChecked" label="选中状态" />
          <FluentCheckBox v-model="indeterminateUnchecked" label="未选中状态" />
        </div>
        <div class="demo-info">
          <p>三态复选框可以切换三种状态：选中、未选中、不确定。</p>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义标签" 
      :source-code="customLabelCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentCheckBox v-model="customChecked1">
            <span class="custom-label">自定义标签内容</span>
          </FluentCheckBox>
          <FluentCheckBox v-model="customChecked2">
            <div class="custom-label-content">
              <strong>富文本标签</strong>
              <p>可以包含任意内容</p>
            </div>
          </FluentCheckBox>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FluentCheckBox, FluentControlExample } from 'vue-fluent-widgets'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const disabledChecked = ref(true)
const disabledUnchecked = ref(false)
const indeterminateValue = ref(null)
const indeterminateChecked = ref(true)
const indeterminateUnchecked = ref(false)
const customChecked1 = ref(false)
const customChecked2 = ref(true)

const selectedOptions = computed(() => {
  const options = []
  if (checked1.value) options.push('选项1')
  if (checked2.value) options.push('选项2')
  if (checked3.value) options.push('选项3')
  return options.join(', ') || '无'
})

const basicCode = `<FluentCheckBox v-model="checked1" label="选项 1" />
<FluentCheckBox v-model="checked2" label="选项 2" />
<FluentCheckBox v-model="checked3" label="选项 3" />

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)`

const disabledCode = `<FluentCheckBox v-model="checked" label="禁用的复选框" disabled />

const checked = ref(true)`

const indeterminateCode = `<FluentCheckBox v-model="value" label="不确定状态" indeterminate />

// 三态复选框可以切换三种状态：true, false, null
const value = ref(null)`

const customLabelCode = `<FluentCheckBox v-model="checked">
  <span class="custom-label">自定义标签内容</span>
</FluentCheckBox>

<FluentCheckBox v-model="checked">
  <div class="custom-label-content">
    <strong>富文本标签</strong>
    <p>可以包含任意内容</p>
  </div>
</FluentCheckBox>`
</script>

<style scoped>
.checkbox-demo {
  max-width: 800px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.page-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-info {
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.custom-label {
  font-weight: 600;
  color: var(--accent);
}

.custom-label-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.custom-label-content strong {
  font-size: 14px;
  color: var(--text-primary);
}

.custom-label-content p {
  margin: 0;
  font-size: 12px;
  color: var(--text-secondary);
}
</style>