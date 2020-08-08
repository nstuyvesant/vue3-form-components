<template lang="pug">
  form(@submit.prevent='onFormSubmit', novalidate, autocomplete='on')
    slot Content needed in FormGroup
</template>

<script lang="ts">
// Loosely based on Vue Formulate's FormulateForm https://vueformulate.com/guide/forms/#setting-initial-values
// Wrapper for FormInputs so we can holistically track validation and prevent submits
import { VNode } from "vue"
import { defineComponent } from "@vue/composition-api"
import { Validity, FormInputContext } from "@/use/form-input-validation"

export default defineComponent({
  name: "FormGroup",
  setup(_, { emit, slots }) {
    // TODO: Refactor validationErrorFree() and onFormSubmit() to composition function
    // Check validity of FormInputs in default slot
    const validationErrorFree = () => {
      const vnodes: VNode[] = slots?.default()
      const formInputs: VNode[] = vnodes?.filter(
        (vnode) => vnode?.componentOptions?.tag === "FormInput",
      )
      const isValid = (formInput: VNode) => {
        const currentFormInput = formInput?.componentInstance as FormInputContext
        // TODO: currentFormInput.validate()
        return currentFormInput.validityClass !== Validity.Invalid
      }
      return formInputs.every(isValid)
    }

    // Emit submit event to parent only if all FormInputs are valid
    const onFormSubmit = () => {
      if (validationErrorFree()) emit("submit")
    }

    return { onFormSubmit }
  },
})
</script>
