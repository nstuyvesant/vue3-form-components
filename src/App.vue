<template lang="pug">
#app
  .container
    h1 Form Experiment
    FormGroup(@submit='onSubmit')
      FormInput(id='email', type='email', ref='emailRef', autofocus=true, v-model.trim='form.email', :validators='[required()]', label='Email', placeholder='Email address', sr-only=false, autocomplete='email', :maxlength='80')
      FormInput(id='password', type='password', ref='passwordRef', v-model.trim='form.password', :validators='[required()]', label='Password', placeholder='Password', sr-only=false, autocomplete='current-password', :maxlength='18')
      button.btn.btn-primary(type='button', @click='emailFocus') Focus on Email
      br
      br
      button.btn.btn-primary(type='submit') Submit
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import FormGroup from "@/components/FormGroup"
import FormInput from "@/components/FormInput.vue"
import { required, FormInputContext } from "@/use/form-input-validation"

export default defineComponent({
  name: "App",
  components: {
    FormGroup,
    FormInput,
  },
  setup() {
    const form = reactive({
      email: "",
      password: "",
    })

    // Local submit handler (only fires if FormInputs in FormGroup are all valid)
    const onSubmit = (): void => {
      alert(JSON.stringify(form))
    }

    const emailRef = ref<FormInputContext>()

    const emailFocus = (): void => {
      emailRef.value?.focus()
    }

    return { required, onSubmit, form, emailRef, emailFocus }
  },
})
</script>
