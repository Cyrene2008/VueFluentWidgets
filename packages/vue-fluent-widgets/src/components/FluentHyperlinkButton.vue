<template>
  <a
    v-if="href"
    class="fluent-hyperlink-button"
    :class="{ 'is-disabled': disabled }"
    :href="disabled ? undefined : href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-disabled="disabled"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </a>
  <button
    v-else
    class="fluent-hyperlink-button"
    :class="{ 'is-disabled': disabled }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  href: { type: String, default: '' },
  target: { type: String, default: '_self' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const onClick = (event) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style scoped>
.fluent-hyperlink-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--accent);
  font-size: 14px;
  font-family: var(--font-ui);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.fluent-hyperlink-button:hover {
  color: var(--accent-dark);
  background: rgba(0, 120, 212, 0.1);
}

.fluent-hyperlink-button:active {
  color: var(--accent-hover);
  background: rgba(0, 120, 212, 0.2);
}

.fluent-hyperlink-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  text-decoration: none;
}

.fluent-hyperlink-button.is-disabled:hover {
  background: transparent;
}
</style>