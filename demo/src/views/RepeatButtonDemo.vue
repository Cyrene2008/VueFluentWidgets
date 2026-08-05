<template>
  <div class="repeat-button-demo">
    <div class="page-header">
      <h1>RepeatButton 重复按钮</h1>
      <p>Fluent 重复按钮组件，按住时会重复触发点击事件。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <div class="demo-row">
            <FluentRepeatButton 
              label="增加" 
              @click="increment"
            />
            <span class="counter-value">{{ count }}</span>
            <FluentRepeatButton 
              label="减少" 
              @click="decrement"
            />
          </div>
          <div class="demo-info">
            <p>按住按钮不放，数值会持续增加或减少。</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义速度" 
      :source-code="speedCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentRepeatButton 
            label="慢速" 
            :delay="1000"
            :interval="500"
            @click="slowCount++"
          />
          <span class="counter-value">{{ slowCount }}</span>
          <FluentRepeatButton 
            label="快速" 
            :delay="200"
            :interval="50"
            @click="fastCount++"
          />
          <span class="counter-value">{{ fastCount }}</span>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentRepeatButton 
            label="禁用按钮" 
            disabled
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentRepeatButton, FluentControlExample } from 'vue-fluent-widgets'

const count = ref(0)
const slowCount = ref(0)
const fastCount = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const basicCode = `<FluentRepeatButton 
  label="增加" 
  @click="increment"
/>

const increment = () => {
  count.value++
}`

const speedCode = `<FluentRepeatButton 
  label="慢速" 
  :delay="1000"
  :interval="500"
  @click="slowCount++"
/>
<FluentRepeatButton 
  label="快速" 
  :delay="200"
  :interval="50"
  @click="fastCount++"
/>

// delay: 按住多久后开始重复（毫秒）
// interval: 重复触发的间隔（毫秒）`

const disabledCode = `<FluentRepeatButton 
  label="禁用按钮" 
  disabled
/>`
</script>

<style scoped>
.repeat-button-demo {
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
  gap: 16px;
}

.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.counter-value {
  min-width: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: var(--accent);
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
</style>