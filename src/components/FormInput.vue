<template lang="pug">
.form-group
  label(:for='id', :class='srOnly ? "sr-only" : ""') {{ label }}
  input.form-control(:id='id', ref='formInputRef', :type='type', :class='cssValidity', v-model='input', :maxlength='maxlength', :placeholder='placeholder', :aria-describedby='`${id}Feedback`')
  .invalid-feedback(:id='`${id}Feedback`')
    template(v-for='error in errors')
      template(v-if='error')
        |{{ error }}
        br
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/composition-api"
import useInputValidation, {
  email,
  numeric,
  ValidatorFunctions,
} from "@/use/form-input-validation"

export interface FormInputContext extends Vue {
  focus(): void
}

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
  setup(props, ctx) {
    const { emit } = ctx // Do it here in case I need ctx for something else

    // Extract validator functions from props
    const validators: ValidatorFunctions = [...props.validators]
    const formInputRef = ref<HTMLElement | null>(null)

    // Always validate according to type
    if (props.type === "email") validators.push(email())
    if (props.type === "number") validators.push(numeric())

    // Pass value into useInputValidation
    const { input, errors, cssValidity } = useInputValidation(
      props.value, // value of input passed to component
      validators, // validators array
      (value: string) => emit("input", value), // emit built-in input event with the validated value
    )

    const focus = () => formInputRef.value?.focus()

    onMounted(() => {
      if (props.autofocus) focus()
    })

    return {
      input,
      errors,
      cssValidity,
      formInputRef,
      focus,
    }
  },
})
</script>
