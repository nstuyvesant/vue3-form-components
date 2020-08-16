import { defineComponent, h, ComponentOptions } from "vue"
import { FormInputContext } from "@/use/form-input-validation"

export default defineComponent({
  name: "FormGroup",
  inheritAttrs: false,
  render() {
    const vnodesInDefaultSlot = this.$slots.default ? this.$slots.default() : []

    return h(
      "form",
      {
        novalidate: "",
        autocomplete: "on",
        onSubmit: (event: Event) => {
          let valid = true
          for (const vnode of vnodesInDefaultSlot) {
            if (typeof vnode.type !== "object") break
            const componentOption = vnode as ComponentOptions
            if (componentOption.type.name !== "FormInput") break
            const formInput = componentOption.component?.ctx as FormInputContext
            if (!formInput.valid) {
              if (valid) {
                formInput.focus()
              }
              valid = false
            }
          }

          if (valid) {
            this.$emit("submit")
          }

          event.stopPropagation()
          event.preventDefault()
        },
      },
      vnodesInDefaultSlot,
    )
  },
})
