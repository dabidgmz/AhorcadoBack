import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'juegos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('score')
      table.integer('lives')
      table.integer('round_time')
      table.enum('state', ['en_progreso', 'completada', 'abandonada']).defaultTo('en_progreso');
      table.integer('intentos_maximos').notNullable().defaultTo(6);
      table.integer('palabra_id').unsigned().references('id').inTable('palabras').onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
