<template lang="pug">
form(@submit.prevent='onFormSubmit', novalidate='', autocomplete='on')
  content Will only be displayed if no content is inserted.
</template>

<script lang="ts">
// Based on Vue Formulate's FormulateForm
// Wrapper for FormInputs so we can holistically track validation
import { defineComponent } from "@vue/composition-api"

// TODO: Members...
// event: onSubmit - fires to let children know to run their validation
// method: submit() - prevents submission until all $children.validityClass are valid - what about NotChecked?
export default defineComponent({
  name: "FormGroup",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  setup() {
    const onFormSubmit = () => {
      console.log("FormGroup:onFormSubmit()")
      // TODO: perform form submission on all $children - should I emit to trigger?
      // TODO: loop through $children and if all are valid, continue, else bail
      // ctx.root.$children.
      // TODO: if these are ok, continue normal submit - emit submit event
    }

    return { onFormSubmit }
  },
})
</script>
