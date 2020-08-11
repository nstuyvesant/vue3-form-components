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
    // TODO: Refactor validationErrorFree() and onFormSubmit() to composition function

    // Check to see if all FormInputs in default slot are valid (computed property)
    const validationErrorFree = () => {
      // Generate array of VNodes that are FormInputs in default slot
      let vnodes = slots.default()
      vnodes = vnodes.filter(
        (vnode) => vnode.componentOptions?.tag === "FormInput",
      )

      // Loop through all elements tracking whether any are falsy
      // Can't use Array.prototype.every because it stops on first falsy
      let allFormInputsValid = true
      for (const vnode of vnodes) {
        const formInput = vnode.componentInstance as FormInputContext
        if (!formInput.valid) {
          if (allFormInputsValid) {
            formInput.focus()
          }
          allFormInputsValid = false
        }
      }

      return allFormInputsValid
    }

    // Emit submit event to parent only if all FormInputs are valid
    const onFormSubmit = () => {
      if (validationErrorFree()) {
        emit("submit")
      } else alert("Form is not valid.")
    }

    return { onFormSubmit }
  },
})
</script>
