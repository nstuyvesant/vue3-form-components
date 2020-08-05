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
  email,
  numeric,
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
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // Extract validator functions from props
    const validators: ValidatorFunctions = [...props.validators]

    // TODO: Refactor to useInputValidation()
    const formInputRef = ref<HTMLElement | null>(null)

    // TODO: Refactor to useInputValidation()
    // Always validate according to type
    if (props.type === "email") validators.push(email())
    if (props.type === "number") validators.push(numeric())

    // useInputValidation function:
    // input - bound to DOM input in template
    // errors - array with error messages (or nulls)
    // validityClass - Bootstrap classes is-valid, is-invalid, or "" if field isn't dirty or has no validator functions
    const { input, errors, validityClass } = useInputValidation(
      // If we pass all props, most of the functionality can move to useInputValidation()
      props.value, // value of input passed to component, half of 2-way data binding
      validators, // validators array
      (value: string) => emit("input", value), // emit built-in input event with the validated value to complete 2-way data binding
    )

    // TODO: Refactor to useInputValidation()
    // Child component's template root is div.form-group, not input so must expose this method to parent
    const focus = () => formInputRef.value?.focus()

    // TODO: Move to useInputValidation()
    onMounted(() => {
      if (props.autofocus) focus()
    })

    return {
      input, // for v-model on input DOM element
      errors, // errors array
      validityClass, // Tri-state: valid, invalid, not validated
      formInputRef, // otherwise focus() won't work
      focus,
    }
  },
})
</script>
