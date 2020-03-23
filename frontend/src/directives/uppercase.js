export default {
  bind (el, _, node) {
    el.addEventListener('input', e => {
      if (isNaN(e.target.value) && e.target.value) {
        e.target.value = e.target.value.toUpperCase()
      }
    }, true)
  }
}
