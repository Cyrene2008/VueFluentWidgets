<template>
  <div class="transitions-demo">
    <div class="page-header">
      <h1>过渡动画</h1>
      <p>Fluent 设计系统的过渡动画效果。</p>
    </div>

    <FluentControlExample 
      header-text="淡入淡出" 
      :source-code="fadeCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showFade = !showFade">切换淡入淡出</FluentButton>
          <Transition name="fade">
            <div v-if="showFade" class="transition-box">淡入淡出效果</div>
          </Transition>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="滑动" 
      :source-code="slideCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showSlide = !showSlide">切换滑动</FluentButton>
          <Transition name="slide">
            <div v-if="showSlide" class="transition-box">滑动效果</div>
          </Transition>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="缩放" 
      :source-code="scaleCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showScale = !showScale">切换缩放</FluentButton>
          <Transition name="scale">
            <div v-if="showScale" class="transition-box">缩放效果</div>
          </Transition>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="组合动画" 
      :source-code="combinedCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showCombined = !showCombined">切换组合动画</FluentButton>
          <Transition name="combined">
            <div v-if="showCombined" class="transition-box">组合动画效果</div>
          </Transition>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const showFade = ref(false)
const showSlide = ref(false)
const showScale = ref(false)
const showCombined = ref(false)

const fadeCode = `<Transition name="fade">
  <div v-if="show" class="transition-box">淡入淡出效果</div>
</Transition>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}`

const slideCode = `<Transition name="slide">
  <div v-if="show" class="transition-box">滑动效果</div>
</Transition>

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}`

const scaleCode = `<Transition name="scale">
  <div v-if="show" class="transition-box">缩放效果</div>
</Transition>

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}`

const combinedCode = `<Transition name="combined">
  <div v-if="show" class="transition-box">组合动画效果</div>
</Transition>

.combined-enter-active,
.combined-leave-active {
  transition: all 0.3s ease;
}

.combined-enter-from,
.combined-leave-to {
  transform: translateY(-20px) scale(0.9);
  opacity: 0;
}`
</script>

<style scoped>
.transitions-demo {
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

.transition-box {
  padding: 20px;
  background: var(--accent);
  color: white;
  border-radius: var(--radius-md);
  margin-left: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.combined-enter-active,
.combined-leave-active {
  transition: all 0.3s ease;
}

.combined-enter-from,
.combined-leave-to {
  transform: translateY(-20px) scale(0.9);
  opacity: 0;
}
</style>