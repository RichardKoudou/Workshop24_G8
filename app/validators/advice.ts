import vine from '@vinejs/vine'

/**
 * Validates the Advice's creation action
 */
export const AdviceValidator = vine.compile(
  vine.object({
    comment: vine.string().trim().minLength(3),
    doctorId: vine.number().positive(),
  })
)
