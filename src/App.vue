<template lang="pug">
#app
  .container
    h1 Form Experiment
    form(@submit.prevent='loginSubmit', novalidate='', autocomplete='on')
      FormInput(id='email', type='email', ref='emailRef', autofocus=true, v-model.trim='form.email', :validators='[required()]', label='Email', placeholder='Email address', sr-only=false, autocomplete='email', :maxlength='80')
      FormInput(id='password', type='password', v-model.trim='form.password', :validators='[required()]', label='Password', placeholder='Password', ref='passwordRef', sr-only=false, autocomplete='current-password', :maxlength='18')
      button.btn.btn-primary(type='button', @click='emailFocus') Focus on Email
      br
      br
      button.btn.btn-primary(type='submit') Submit
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api"
import FormInput, { FormInputContext } from "@/components/FormInput.vue"
import { required } from "@/use/form-input-validation"

export default defineComponent({
  name: "App",
  components: {
    FormInput,
  },
  setup() {
    const form = reactive({
      submitted: false,
      valid: false,
      email: "",
      password: "",
    })

    const loginSubmit = (): void => {
      form.submitted = true
    }

    const emailRef = ref<FormInputContext>()

    const emailFocus = (): void => {
      emailRef.value?.focus()
    }

    return { required, loginSubmit, form, emailRef, emailFocus }
  },
})
</script>
