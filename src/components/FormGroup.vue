<template lang="pug">
  form(@submit.prevent='onFormSubmit', novalidate, autocomplete='on')
    slot Content needed in FormGroup
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { FormInputContext } from "@/use/form-input-validation"

export default defineComponent({
  name: "FormGroup",
  inheritAttrs: false,
  setup(_, { emit, slots }) {
    // Check Form Inputs in default slot and emit submit if all are valid
    const onFormSubmit = () => {
      let valid = true
      const vnodes = slots.default()
      for (const vnode of vnodes) {
        if (!vnode.componentOptions) break
        if (vnode.componentOptions.tag !== "FormInput") break
        const formInput = vnode.componentInstance as FormInputContext
        if (!formInput.valid) {
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
