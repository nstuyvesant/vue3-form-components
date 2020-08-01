import { ref, watch, Ref } from "@vue/composition-api"

export type ValidatorFunction = (input: string) => null | string
export type ValidatorFunctions = ValidatorFunction[]
export type ValidatorEventHandler = (value: string) => void
export type UseFormInputValidation = {
  input: Ref<string>
  errors: Ref<(string | null)[]>
  cssValidity: Ref<string>
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
  // TODO: return function that sees if (input: string) is already in the table
  // If length of array is zero, the value is unique
  return (input: string) => (input === "user" ? null : `Not a unique ${val}.`)
}

export { between, email, minLength, numeric, required, sameAs, unique }

export default function (
  startVal: string,
  validators: ValidatorFunctions,
  onValidate: ValidatorEventHandler,
): UseFormInputValidation {
  const input = ref<string>(startVal)
  const errors = ref<(string | null)[]>([])
  const cssValidity = ref<string>("")

  const updateState = (): void => {
    cssValidity.value = errors.value.every((error) => error === null) ? "is-valid" : "is-invalid"
  }

  // Whenever the input changes, new value is passed to each function in validators array
  // which adds a string to errors array if invalid (null skips)
  watch(input, (newVal) => { // watch for input event and callback with new value
    errors.value = validators.map((validator) => validator(newVal))
    console.log("Errors", errors.value)
    onValidate(newVal) // emit value back to FormInput after calling each validator function
    updateState()
  })

  return {
    input,
    errors,
    cssValidity,
  }
}
