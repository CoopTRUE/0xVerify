import { formSchema } from './schema'
import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

export async function load() {
  return {
    form: await superValidate(zod(formSchema)),
  }
}

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema))
    if (!form.valid) {
      return fail(400, { form })
    }
    form.data.message
    return { form }
  },
}
