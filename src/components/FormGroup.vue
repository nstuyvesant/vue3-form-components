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
        const x = formInput?.componentInstance as FormInputContext
        return x.validityClass !== Validity.Invalid
      }
      return formInputs.every(isValid)
    }

    // Prevent submission if FormInputs are invalid
    const onFormSubmit = () => {
      console.log("FormGroup:onFormSubmit()")
      // TODO: trigger validation on each child that's a FormInput (displays any invalid messages)

      // Made it past validation, emit submit event so handler in App.vue can take it.
      if (validationErrorFree()) emit("submit")
    }

    return { onFormSubmit }
  },
})
</script>
