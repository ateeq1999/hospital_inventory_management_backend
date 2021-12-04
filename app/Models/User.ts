import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public phone: string

  @column()
  public ssn: string

  @column()
  public name: string

  @column({
    serialize: (value?: String) => {
      return value ? `http://localhost:3333/uploads/users/${value}` : null
    }
  })
  public avatar: String

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateUUID(user: User) {
    UuidHook.generateUUID(user)
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
