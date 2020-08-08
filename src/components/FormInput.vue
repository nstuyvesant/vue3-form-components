<template lang="pug">
.form-group
  label(:for='id', :class='srOnly ? "sr-only" : ""') {{ label }}
  input.form-control(:id='id', ref='formInputRef', :type='type', :class='validityClass', v-model='input', :maxlength='maxlength', :placeholder='placeholder', :autocomplete='autocomplete', :aria-describedby='`${id}Feedback`')
  .invalid-feedback(:id='`${id}Feedback`')
    template(v-for='error in errors')
      template(v-if='error')
        |{{ error }}
        br
</template>
<script lang="ts">
// Based on Anthony Gore's article https://vuejsdevelopers.com/2020/03/31/vue-js-form-composition-api/
import { defineComponent, ref, onMounted } from "@vue/composition-api"
import useInputValidation, {
  ValidatorFunctions,
} from "@/use/form-input-validation"

export default defineComponent({
  name: "FormInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Your value goes here",
    },
    srOnly: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    validators: {
      type: Array as () => ValidatorFunctions,
      default: [],
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: 20,
    },
  },
  setup(props, { emit }) {
    // Return values:
    // input - bound to DOM input in template
    // errors - array of error messages or nulls (if valid)
    // validityClass - Bootstrap classes is-valid, is-invalid, or "" if field isn't dirty or has no validator functions
    const { input, errors, validityClass } = useInputValidation(
      props.value, // value of input passed to component, half of 2-way data binding
      props.type, // control type (adds default validations)
      props.validators, // validators array
      (value: string) => emit("input", value), // emit built-in input event with the validated value to complete 2-way data binding
    )

    // Next 10 lines could move to a useFocus() function (but kinda thin)

    // Parent getting a ref would yield div.form-group.
    // Expose focus() method to parent to reach the inner input.
    const formInputRef = ref<HTMLElement | null>(null)
    const focus = () => formInputRef.value?.focus()

    // Support autofocus prop from parent
    onMounted(() => {
      if (props.autofocus) focus()
    })

    // TODO: add validate() method to useInputValidation then return it here
    return {
      input, // for v-model on input DOM element
      errors, // errors array
      validityClass, // Tri-state: valid, invalid, not validated
      formInputRef, // required for focus()
      focus, // allow parent to reach the inner input and make it the focus
    }
  },
})
</script>
