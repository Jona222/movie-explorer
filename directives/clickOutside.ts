export default {
    mounted(el: HTMLElement, binding: any) {
        const handler = (event: MouseEvent) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event)
            }
        }

        (el as any).__clickOutsideHandler__ = handler
        document.addEventListener('click', handler)
    },

    unmounted(el: HTMLElement) {
        document.removeEventListener('click', (el as any).__clickOutsideHandler__)
    }
}
