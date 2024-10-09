import vine from '@vinejs/vine'

export const postValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(6).maxLength(32),
    description: vine.string().minLength(6),
    user_id: vine.number().positive(),
    advice_id: vine.number().positive().nullable().optional(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(6).maxLength(32).optional(),
    description: vine.string().minLength(6).optional(),
    user_id: vine.number().positive().optional(),
    advice_id: vine.number().positive().nullable().optional(),
  })
)
