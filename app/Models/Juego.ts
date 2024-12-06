import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Juego extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public score: number

  @column()
  public lives: number

  @column()
  public round_time: number

  @column()
  public state: 'en_progreso' | 'completada' | 'abandonada'

  @column()
  public intentos_maximos: number

  @column()
  public palabra_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
