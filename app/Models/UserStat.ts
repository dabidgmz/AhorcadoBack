import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserStat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public total_score: number

  @column()
  public total_games: number

  @column()
  public highest_score: number

  @column.dateTime({ autoCreate: true })
  public last_played: DateTime

}
