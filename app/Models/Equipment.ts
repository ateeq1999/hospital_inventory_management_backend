import { DateTime } from 'luxon'
import {
  column,
  beforeCreate,
  afterCreate,
  BaseModel,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'
import Order from './Order'

export default class Equipment extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public quantity: number

  @column({
    serialize(value: number) {
      return Boolean(value)
    },
  })
	public is_expire: Boolean

  @column.date()
  public expire_date: DateTime

  @column()
  public unit_id: string

  @column({
    serialize(value: number) {
      return Boolean(value)
    },
  })
	public is_active: Boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateUUID(equipment: Equipment) {
    UuidHook.generateUUID(equipment)
  }

  @afterCreate()
  public static async newEquipmentCreated (equipment: Equipment) {
    console.log(equipment)
  }

  @manyToMany(() => Order, {
    localKey: 'id',
    pivotForeignKey: 'equipment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'order_id',
    pivotTable: "order_equipments",
    pivotColumns: ['quantity'],
  })
  public orders: ManyToMany<typeof Order>
}
