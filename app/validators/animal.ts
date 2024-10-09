import vine from '@vinejs/vine'

/**
 * Validates the Animal's creation action
 */
export const AnimalValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    species: vine.string().trim().minLength(3),
    symptoms: vine.string().trim().minLength(3),
    status: vine.string().trim().minLength(3),
  })
)
