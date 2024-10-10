import vine from '@vinejs/vine'

/**
 * Validates the Animal's creation action
 */
export const AnimalValidator = vine.compile(
  vine.object({
    species: vine.string().trim().minLength(3),
    user_id: vine.number().positive(),
  })
)
