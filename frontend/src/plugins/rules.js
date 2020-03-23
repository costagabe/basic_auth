import { extend, localize } from 'vee-validate'

import br from 'vee-validate/dist/locale/pt_BR.json'

localize('pt_BR', br)

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    }
  },
  computesRequired: true
})
