[![vuejs][vuejs]][vuejs-url]
[![node][node]][node-url]

# Vue3 Form Components
Sample project of two Vue 3 components, 
[FormGroup](https://github.com/nstuyvesant/form-components/blob/master/src/components/FormGroup.vue) and [FormInput](https://github.com/nstuyvesant/form-components/blob/master/src/components/FormInput.vue), that provide configurable validation.

Written in TypeScript using the [Vue 3's Composition API](https://v3.vuejs.org/api/composition-api.html). FormInputs with a validation error will display errors and the FormGroup's submit event will be suppressed. If a validation error occurs, the focus will move to the first FormInput with an error.

Based on [Anthony Gore's article](https://vuejsdevelopers.com/2020/03/31/vue-js-form-composition-api/) with ideas from [Vue Formulate's FormulateForm](https://vueformulate.com/guide/forms/#setting-initial-values).

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

[vuejs]: https://img.shields.io/badge/vuejs-3.0.11-red.svg
[vuejs-url]: https://vuejs.org
[node]: https://img.shields.io/badge/nodejs-16.0.0-green.svg
[node-url]: https://nodejs.org