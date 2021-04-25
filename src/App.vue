<template lang="pug">
#app
  .container
    h1 Form Example
    FormGroup(@submit='onSubmit')
      FormInput(id='firstName', type='text', ref='firstNameRef', autofocus=true, v-model.trim='form.firstName', :validators='[required()]', label='First Name', sr-only=true, placeholder='Your first name', autocomplete='given-name', :maxlength='80')
      FormInput(id='lastName', type='text', ref='lastNameRef', v-model.trim='form.lastName', :validators='[required()]', label='Last Name', sr-only=true, placeholder='Your last name', autocomplete='family-name', :maxlength='80')
      FormInput(id='email', type='email', ref='emailRef', v-model.trim='form.email', :validators='[required()]', label='Email', sr-only=true, placeholder='Email address',  autocomplete='email', :maxlength='80')
      FormInput(id='password', type='password', ref='passwordRef', v-model.trim='form.password', :validators='[required(), minLength(4)]', label='Password', sr-only=true, placeholder='Password', autocomplete='current-password', :maxlength='18')
      FormInput(id='passwordConfirmation', type='password', ref='passwordConfirmationRef', v-model.trim='form.passwordConfirmation', :validators='[sameAs(form.password), required()]', label='Confirm Password', sr-only=true, placeholder='Confirm password', autocomplete='confirm-password', :maxlength='18')
      FormInput(id='question', type='textarea', ref='questionRef', v-model.trim='form.question', :validators='[required()]', label='Your question or comment', sr-only=true, placeholder='Your question or comment', :maxlength='512')
      button.btn.btn-primary(type='button', @click='emailFocus') Focus on Email
      br
      br
      button.btn.btn-primary(type='submit') Submit
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import FormGroup from "@/components/FormGroup"
import FormInput from "@/components/FormInput.vue"
import {
  required,
  sameAs,
  minLength,
  FormInputContext,
} from "@/use/form-input-validation"

export default defineComponent({
  name: "App",
  components: {
    FormGroup,
    FormInput,
  },
  setup() {
    const form = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      question: "",
    })

    // Local submit handler (only fires if FormInputs in FormGroup are all valid)
    const onSubmit = (): void => {
      alert(JSON.stringify(form))
    }

    const emailRef = ref<FormInputContext>()

    const emailFocus = (): void => {
      emailRef.value?.focus()
    }

    return { required, sameAs, minLength, onSubmit, form, emailRef, emailFocus }
  },
})
</script>
