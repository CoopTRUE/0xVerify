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
      return fail(400, { form })
    }

    const { message: signatureMessage, signatureHash, address } = form.data
    const recoveredAddress = await recoverMessageAddress({
      message: signatureMessage,
      signature: signatureHash,
    })

    if (address && address === recoveredAddress.toLowerCase()) {
      return message(form, { recoveredAddress, verified: true })
    }
    if (address && address !== recoveredAddress.toLowerCase()) {
      return message(form, { recoveredAddress, verified: false })
    }
    return message(form, { recoveredAddress, verified: null })
  },
}
