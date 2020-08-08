# Product Backlog
* [High] Decide on 2 ways to force validation on submit
  1. Expose validate() on FormInput allowing FormGroup to call it when checking FormInputs
  2. Checking validityClass forces a re-evalution of the FormInput's value
* [High] Move validationErrorFree() and onFormSubmit() to form-validation.ts
* [High] Validation method for checking for duplicates via API
* [Medium] Recaptcha 3.0 support
* [High] Make Vue 3.0 compatible by fixing breaking changes to v-model prop and 
        event default names: prop: value -> modelValue, event: input -> update:modelValue;
