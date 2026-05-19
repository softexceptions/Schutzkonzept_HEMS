import { ref } from 'vue'

const dunkel = ref(false)

export function useDarkMode() {
  function init() {
    const gespeichert = localStorage.getItem('farbschema')
    if (gespeichert) {
      dunkel.value = gespeichert === 'dunkel'
    } else {
      dunkel.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    document.documentElement.classList.toggle('dark', dunkel.value)
  }

  function umschalten() {
    dunkel.value = !dunkel.value
    document.documentElement.classList.toggle('dark', dunkel.value)
    localStorage.setItem('farbschema', dunkel.value ? 'dunkel' : 'hell')
  }

  return { dunkel, init, umschalten }
}
