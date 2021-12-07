import { DateTime } from 'luxon'
import {
  column,
  beforeCreate,
  afterCreate,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'
import Equipment from './Equipment'

export default class Unit extends BaseModel {
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
  public static generateUUID(unit: Unit) {
    UuidHook.generateUUID(unit)
  }

  @afterCreate()
  public static async newUnitCreated (unit: Unit) {
    console.log(unit)
  }

  @hasMany(() => Equipment, {
    localKey: 'id',
    foreignKey: 'unit_id',
  })
  public equipments: HasMany<typeof Equipment>
}
