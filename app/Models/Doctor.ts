import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeCreate,
  afterCreate,
  BaseModel,
  belongsTo,
  BelongsTo,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import UuidHook from './hooks/UuidHook'
import Department from './Department'

export default class Doctor extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public department_id: string

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

  @beforeCreate()
  public static generateUUID(doctor: Doctor) {
    UuidHook.generateUUID(doctor)
  }

  @beforeSave()
  public static async hashPassword (doctor: Doctor) {
    if (doctor.$dirty.password) {
      doctor.password = await Hash.make(doctor.password)
    }
  }

  @afterCreate()
  public static async newDoctorCreated (doctor: Doctor) {
    console.log(doctor)
  }

  @belongsTo(() => Department, {
    foreignKey: "department_id",
    localKey: "id",
  })
  public department: BelongsTo<typeof Department>
}
