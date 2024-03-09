import type { Hex, Address } from 'viem'
import { z } from 'zod'

export const formSchema = z.object({
  message: z.string().min(1, { message: 'Message cannot be empty' }),
  signatureHash: z
    .string()
    .regex(/^0x([A-Fa-f0-9]{130})$/, { message: 'Invalid signature hash' })
    .transform((v) => v as Hex),
  address: z
    .string()
    .regex(/^0x([A-Fa-f0-9]{40})$/, { message: 'Invalid address' })
    .transform((v) => v as Address)
    .optional(),
})

export type FormSchema = typeof formSchema
