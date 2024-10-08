import vine from '@vinejs/vine'


export const userValidator = vine.compile(
    vine.object({
        email: vine
        .string()
        .email()
        .unique(async (query, field) => {
            const user = await query.from('users').where('email', field).first()
            return !user
        }),
        password: vine.string().minLength(6).maxLength(32),
        first_name: vine.string().minLength(2).maxLength(32)
            .unique(async (query, field) => {
            const user = await query.from('users').where('first_name', field).first()
            return !user
        }),
        last_name : vine.string().minLength(6).maxLength(32)
            .unique(async (query, field) => {
            const user = await query.from('users').where('last_name', field).first()
            return !user
        }),
        role : vine.enum(
            ['veterinarian', 'client']
        )
        
    })
)