import { formSchema } from './schema'
import { fail } from '@sveltejs/kit'
import { superValidate, message } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { recoverMessageAddress } from 'viem'

export async function load() {
  return { form: await superValidate(zod(formSchema)) }
}

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema))
    if (!form.valid) {
      console.log('form is invalid', form)
      return fail(400, { form })
    }

    const { message: signatureMessage, signatureHash } = form.data
    const recoveredAddress = await recoverMessageAddress({
      message: signatureMessage,
      signature: signatureHash,
    })

    return message(form, recoveredAddress)
  },
}
