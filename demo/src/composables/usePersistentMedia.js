import { inject, provide } from 'vue'

const persistentMediaKey = Symbol('persistent-media')

export const providePersistentMedia = controller => provide(persistentMediaKey, controller)

export const usePersistentMedia = () => {
  const controller = inject(persistentMediaKey)
  if (!controller) throw new Error('Persistent media provider is missing')
  return controller
}
