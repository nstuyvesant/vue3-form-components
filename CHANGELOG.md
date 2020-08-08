# Product Backlog
* [High] Decide on 3 ways to force validation on submit
  1. Watch FormInput's submitted prop turn to true then do what other watch does
  2. Expose validate() on FormInput allowing FormGroup to call it when checking FormInputs
  3. Checking validityClass forces a re-evalution of the FormInput's value
* [High] Move validationErrorFree() and onFormSubmit() to form-validation.ts
* [High] Validation method for checking for duplicates via API
* [Medium] Recaptcha 3.0 support
* [High] Make Vue 3.0 compatible by fixing breaking changes to v-model prop and 
        event default names: prop: value -> modelValue, event: input -> update:modelValue;
