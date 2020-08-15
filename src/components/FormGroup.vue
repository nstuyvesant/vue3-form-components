<template lang="pug">
  form(@submit.prevent='onFormSubmit', novalidate, autocomplete='on')
    slot Content needed in FormGroup
</template>

<script lang="ts">
// Loosely based on Vue Formulate's FormulateForm https://vueformulate.com/guide/forms/#setting-initial-values
// Wrapper for FormInputs so we can holistically track validation and prevent submits
import { defineComponent } from "@vue/composition-api"
import { FormInputContext } from "@/use/form-input-validation"

export default defineComponent({
  name: "FormGroup",
  inheritAttrs: false,
  setup(_, { emit, slots }) {
    // Emit submit event to parent only if all FormInputs are valid
    const onFormSubmit = () => {
      let valid = true

      // Get VNodes from default slot
      const vnodes = slots.default()
      let formInputVNodes = vnodes.filter(
        (vnode) => vnode.componentOptions?.tag === "FormInput",
      )

      // Check each VNode that represents a FormInput
      for (const formInputVNode of formInputVNodes) {
        const formInput = formInputVNode.componentInstance as FormInputContext
        if (!formInput.valid) {
          // If previously valid (or untested) and not invalid, focus first invalid FormInput
          if (valid) {
            formInput.focus()
          }
          valid = false
        }
      }

      if (valid) {
        emit("submit")
      } else alert("Form is not valid.")
    }

    return { onFormSubmit }
  },
})
</script>
