export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!el.contains(event.target)) {
        binding.value(event)
      }
    }
    document.addEventListener('mousedown', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.clickOutsideEvent)
  },
}
