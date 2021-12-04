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

export default class Manager extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

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
  public static async hashPassword (manager: Manager) {
    if (manager.$dirty.password) {
      manager.password = await Hash.make(manager.password)
    }
  }

  @beforeCreate()
  public static generateUUID(manager: Manager) {
    UuidHook.generateUUID(manager)
  }

  @afterCreate()
  public static async newManagerCreated (manager: Manager) {
    console.log(manager)
  }
}
