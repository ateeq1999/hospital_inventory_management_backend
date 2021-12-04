import test from 'japa'
import Staff from 'App/Models/Staff'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('staff Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Staff cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var staff = Array()

    const staffCreate = new Staff()

    staffCreate.name = string.generateRandom(32)
    staffCreate.phone = string.generateRandom(32)
    staffCreate.password = string.generateRandom(32)
    staffCreate.is_active = false


    await staffCreate.save()

    if (staffCreate.$isPersisted) {
      cruds.create = true

      staff = await Staff.all()

      if(staff.length > 0){
        cruds.all = true
      }
    }

    const staffFind = await Staff.findOrFail(staffCreate.id)

    if (staffFind.id = staffCreate.id) {
      cruds.find = true
    }

    await staffFind.merge({
      name: staffCreate.name,
      phone: staffCreate.phone,
      password: staffCreate.password,
      is_active: staffCreate.is_active,
    }).save()

    if(staffFind.$isPersisted){
      cruds.update = true

      staff = await Staff.all()

      if(staff.length > 0){
        cruds.all = true
      }
    }

    await staffFind.delete()

    staff = await Staff.all()

    if(staff.length == 0){
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
