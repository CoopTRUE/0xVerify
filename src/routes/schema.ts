import { z } from 'zod'

export const formSchema = z.object({
  message: z.string().min(1, { message: 'Message cannot be empty' }),
  signatureHash: z.string().regex(/^0x([A-Fa-f0-9]{130})$/, { message: 'Invalid signature hash' }),
  address: z
    .string()
    .regex(/^0x([A-Fa-f0-9]{40})$/, { message: 'Invalid address' })
    .optional(),
})

export type FormSchema = typeof formSchema
