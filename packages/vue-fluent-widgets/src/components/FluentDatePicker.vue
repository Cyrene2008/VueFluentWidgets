<template>
  <FluentCalendarDatePicker
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :disabled="disabled"
    :error="error"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
  />
</template>

<script setup>
import FluentCalendarDatePicker from './FluentCalendarDatePicker.vue'

defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '选择日期' },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])
</script>
