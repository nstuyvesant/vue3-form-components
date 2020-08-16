// Adapted from Anthony Gore's article https://vuejsdevelopers.com/2020/03/31/vue-js-form-composition-api/
import { VNode, ref, watch, Ref, computed, ComputedRef } from "vue"

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
  errors: Ref<(string | null)[]>
  input: Ref<string>
  valid: ComputedRef<boolean>
  validityClass: ComputedRef<Validity>
}
export interface FormInputContext extends VNode {
  focus(): void
  input: string
  valid: boolean
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

// TODO: call API (`GET /api/${val}/${input}`) to get array of matches
// const unique = (val: string): ValidatorFunction => {
//   If length of array is zero, the value is unique
//   return (input: string) => (input === "user" ? null : `Not a unique: ${val}.`)
// }

export { between, email, minLength, numeric, required, sameAs /*, unique*/ }

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

  // Applies array of validator functions against a string value
  // and populates errors array with error messages or nulls (if valid)
  const validate = (valueToCheck: string): void => {
    errors.value = validators.map((validator) => validator(valueToCheck))
  }

  // Watch for changes to FormInput's input (v-model), validate new value
  watch(input, (newVal): void => {
    validate(newVal)
    onValidate(newVal) // callback from FormInput (emits new value to parent)
  })

  // If validation performed, return is-valid or is-invalid, else ""
  const validityClass = computed(() => {
    if (errors.value.length > 0)
      return errors.value.every((error) => error === null)
        ? Validity.Valid
        : Validity.Invalid
    return Validity.NotChecked
  })

  const valid = computed((): boolean => {
    validate(input.value)
    const result: boolean =
      validityClass.value === Validity.Valid ||
      validityClass.value === Validity.NotChecked
    return result
  })

  return {
    input,
    errors,
    validityClass,
    valid,
  }
}
