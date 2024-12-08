import { DateTime } from 'luxon'
import { BaseModel, column ,BelongsTo,belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Palabra from 'App/Models/Palabra';
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

  @belongsTo(() => Palabra, {
    foreignKey: 'palabra_id', 
  })

  public palabra: BelongsTo<typeof Palabra>;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
