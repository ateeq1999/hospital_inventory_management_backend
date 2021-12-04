import test from 'japa'
import Doctor from 'App/Models/Doctor'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('doctors Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Doctor cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var doctors = Array()

    const doctorCreate = new Doctor()

    doctorCreate.department_id = string.generateRandom(32)
    doctorCreate.name = string.generateRandom(32)
    doctorCreate.phone = string.generateRandom(32)
    doctorCreate.password = string.generateRandom(32)
    doctorCreate.is_active = false


    await doctorCreate.save()

    if (doctorCreate.$isPersisted) {
      cruds.create = true

      doctors = await Doctor.all()

      if(doctors.length > 0){
        cruds.all = true
      }
    }

    const doctorFind = await Doctor.findOrFail(doctorCreate.id)

    if (doctorFind.id = doctorCreate.id) {
      cruds.find = true
    }

    await doctorFind.merge({
      department_id: doctorCreate.department_id,
      name: doctorCreate.name,
      phone: doctorCreate.phone,
      password: doctorCreate.password,
      is_active: doctorCreate.is_active,
    }).save()

    if(doctorFind.$isPersisted){
      cruds.update = true

      doctors = await Doctor.all()

      if(doctors.length > 0){
        cruds.all = true
      }
    }

    await doctorFind.delete()

    doctors = await Doctor.all()

    if(doctors.length == 0){
      cruds.delete = true
    }

    assert.deepEqual(cruds, {
      all: true,
      create: true,
      find: true,
      update: true,
      delete: true,
    })
  })
})
