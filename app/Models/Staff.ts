import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeCreate,
  afterCreate,
  BaseModel,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'

export default class Staff extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

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

  @beforeSave()
  public static async hashPassword (staff: Staff) {
    if (staff.$dirty.password) {
      staff.password = await Hash.make(staff.password)
    }
  }

  @beforeCreate()
  public static generateUUID(staff: Staff) {
    UuidHook.generateUUID(staff)
  }

  @afterCreate()
  public static async newStaffCreated (staff: Staff) {
    console.log(staff)
  }
}
