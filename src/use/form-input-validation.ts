// Based on article https://vuejsdevelopers.com/2020/03/31/vue-js-form-composition-api/
import Vue from "vue"
import { ref, watch, Ref, computed } from "@vue/composition-api"

export enum Validity {
  Invalid = "is-invalid",
  Valid = "is-valid",
  NotChecked = "",
}
export enum InputType {
  Text = "text",
  Email = "email",
  Number = "number",
  Date = "date",
}
export type ValidatorFunction = (input: string) => null | string
export type ValidatorFunctions = ValidatorFunction[]
export type ValidatorEventHandler = (value: string) => void
export type UseFormInputValidation = {
  input: Ref<string>
  errors: Ref<(string | null)[]>
  validityClass: Ref<Validity>
}
export interface FormInputContext extends Vue {
  focus(): void
  validityClass: Validity
}

const between = (low: number, high: number): ValidatorFunction => {
  return (input: string) => {
    const convertedNumber = Number(input)
    if (isNaN(convertedNumber)) return "Must be a number."
    return convertedNumber >= low && convertedNumber <= high
      ? null
      : `Number must be between ${low} and ${high}.`
  }
}

const email = (): ValidatorFunction => {
  const re = /\S+@\S+\.\S+/
  return (input: string) =>
    re.test(input) ? null : "Must be a valid email address."
}

const minLength = (min: number): ValidatorFunction => {
  return (input: string) =>
    input.length < min ? `Must be at least ${min} characters.` : null
}

const numeric = (): ValidatorFunction => {
  return (input: string) => {
    if (isNaN(Number(input))) return "Must be a number."
    return null
  }
}

const required = (): ValidatorFunction => {
  return (input: string) => (!input ? "Required." : null)
}

const sameAs = (val: string): ValidatorFunction => {
  return (input: string) => (input !== val ? "Passwords do not match." : null)
}

const unique = (val: string): ValidatorFunction => {
  // TODO: call API (`GET /api/${val}/${input}`) to get array of matches
  // If length of array is zero, the value is unique
  return (input: string) => (input === "user" ? null : `Not a unique: ${val}.`)
}

export { between, email, minLength, numeric, required, sameAs, unique }

export default function (
  startVal: string,
  inputType: string,
  validators: ValidatorFunctions,
  onValidate: ValidatorEventHandler,
): UseFormInputValidation {
  const input = ref<string>(startVal) // Gets ref to FormInput's input (v-model)
  const errors = ref<(string | null)[]>([]) // Array to populate with nulls (valid) or error strings

  // Always validate according to type
  if (inputType === InputType.Email) validators.push(email())
  if (inputType === InputType.Number) validators.push(numeric())

  // If validation performed, return is-valid or is-invalid, else ""
  const validityClass = computed(() => {
    if (errors.value.length > 0)
      return errors.value.every((error) => error === null)
        ? Validity.Valid
        : Validity.Invalid
    return Validity.NotChecked
  })

  // Whenever the input changes, new value is passed to each function in validators array
  // adding string to errors array if invalid (null skips)
  watch(input, (newVal) => {
    // watch for input event and callback with new value
    errors.value = validators.map((validator) => validator(newVal))
    onValidate(newVal) // emit value back to FormInput after calling each validator function
  })

  return {
    input,
    errors,
    validityClass,
  }
}
