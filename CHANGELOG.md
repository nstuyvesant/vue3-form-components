# Product Backlog
* [High] Make FormGroup aware of its children
* [High] Need a way to display validation errors for every FormInput on a form when it is submitted (page could have multiple forms).

Example:
FormGroup or form(v)
  FormInput(id="A", validityClass, v)
  FormInput(id="B", validityClass, v)
  FormInput(id="C", validityClass, v)

v = {
  submitted: false,
  valid: <computed>
  children: [A, B, C]
}

* [High] Need a way to determine whether a form is valid based on the validity of its child FormInputs.
* [High] Validation method for checking for duplicates via API
* [Medium] Recaptcha 3.0 support
* [High] For Vue 3.0
BREAKING: When used on custom components, v-model prop and event default names are changed:
prop: value -> modelValue;
event: input -> update:modelValue;
