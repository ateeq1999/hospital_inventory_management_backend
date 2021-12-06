import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EquipmentsSchema extends BaseSchema {
  protected tableName = 'equipment'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index().unique().notNullable()
      table.string('name').notNullable()
      table.integer('quantity').notNullable()
      table.boolean('is_expire').defaultTo(0)
      table.timestamp('expire_date').nullable()
      table.string('unit_id').notNullable()
      table.boolean('is_active').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
