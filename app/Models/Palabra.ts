import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Palabra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public palabra: string
  
  @column()
  public descripcion: string

  @column()
  public categoria_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
