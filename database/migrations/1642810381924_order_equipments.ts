import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrdereEuipments extends BaseSchema {
  protected tableName = 'order_equipments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('equipment_id').notNullable()
      table.string('order_id').notNullable()
      table.integer("quantity")
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
