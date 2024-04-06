import { writable } from 'svelte/store'

export const address = writable<string | null>(null)
