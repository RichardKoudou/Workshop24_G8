import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import type { HasOne, BelongsTo } from '@adonisjs/lucid/types/relations'
import Advice from '#models/advice'
import User from '#models/user'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare user_id: number

  @column()
  declare advice_id: number | null

  @hasOne(() => Advice, {
    foreignKey: 'adviceId',
    localKey: 'id',
  })
  declare advice: HasOne<typeof Advice> | null

  @belongsTo(() => User, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
