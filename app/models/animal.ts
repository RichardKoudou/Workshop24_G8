import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Animal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare species: string

  @column()
  declare user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // declare updatedAt: DateTime
}
