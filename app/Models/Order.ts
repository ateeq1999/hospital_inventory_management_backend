import { DateTime } from 'luxon'
import {
  column,
  beforeCreate,
  afterCreate,
  BaseModel,
  ManyToMany,
  manyToMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'
import Equipment from './Equipment'
import Doctor from './Doctor'
import Department from './Department'

export default class Order extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public doctor_id: string

  @column()
  public department_id: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateUUID(order: Order) {
    UuidHook.generateUUID(order)
  }

  @afterCreate()
  public static async newOrderCreated (order: Order) {
    console.log(order)
  }

  @manyToMany(() => Equipment, {
    localKey: 'id',
    pivotForeignKey: 'order_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'equipment_id',
    pivotTable: "order_equipments",
    pivotColumns: ['quantity'],
  })
  public equipments: ManyToMany<typeof Equipment>

  @belongsTo(() => Doctor, {
    foreignKey: "doctor_id",
    localKey: "id",
  })
  public doctor: BelongsTo<typeof Doctor>

  @belongsTo(() => Department, {
    foreignKey: "department_id",
    localKey: "id",
  })
  public department: BelongsTo<typeof Department>
}
