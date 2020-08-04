<template lang="pug">
  form(@submit.prevent='onFormSubmit', novalidate, autocomplete='on')
    slot Content needed in FormGroup
</template>

<script lang="ts">
// Loosely based on Vue Formulate's FormulateForm https://vueformulate.com/guide/forms/#setting-initial-values
// Wrapper for FormInputs so we can holistically track validation and prevent submits
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  name: "FormGroup",
  setup(_, ctx) {
    const onFormSubmit = () => {
      // const directChildren = ctx.parent.$children[0].$children // Only if the parent only has one component
      console.log("ctx", ctx)
      // console.log("Direct children", directChildren)
      console.log("FormGroup:onFormSubmit()")
      // TODO: trigger validation on each child that's a FormInput (displays any invalid messages)
      // TODO: loop through child FormInputs and if any have validityClass = Validity.Invalid,
      //       stop the submit process (errors will have been displayed in previous step)

      // Made it past validation, emit submit event so handler in App.vue can take it.
      const { emit } = ctx
      emit("submit")
    }

    return { onFormSubmit }
  },
})
</script>
