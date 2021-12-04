import { DateTime } from 'luxon'
import {
  column,
  beforeCreate,
  afterCreate,
  BaseModel,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'
import Doctor from './Doctor'
import Order from './Order'

export default class Department extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

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
  public static generateUUID(department: Department) {
    UuidHook.generateUUID(department)
  }

  @afterCreate()
  public static async newDepartmentCreated (department: Department) {
    console.log(department)
  }

  @hasMany(() => Doctor)
  public doctors: HasMany<typeof Doctor>

  @hasMany(() => Order)
  public orders: HasMany<typeof Order>
}
