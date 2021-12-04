import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'

export default class Admin extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateUUID(admin: Admin) {
    UuidHook.generateUUID(admin)
  }

  @beforeSave()
  public static async hashPassword (admin: Admin) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password)
    }
  }
}
