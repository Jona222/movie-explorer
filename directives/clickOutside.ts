import type { DirectiveBinding } from 'vue'

type ClickOutsideHandler = (event: MouseEvent) => void

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding<(event: MouseEvent) => void>) {
        const handler: ClickOutsideHandler = (event: MouseEvent) => {
                if (!(el === event.target || el.contains(event.target as Node))) {
                    binding.value(event)
                }
            }

         ;(el as HTMLElement & { __clickOutsideHandler__?: ClickOutsideHandler }).__clickOutsideHandler__ = handler

        document.addEventListener('click', handler)
    },

    unmounted(el: HTMLElement) {
        const handler = (el as HTMLElement & { __clickOutsideHandler__?: ClickOutsideHandler }).__clickOutsideHandler__
        if (handler) {
            document.removeEventListener('click', handler)
        }
    }
}
