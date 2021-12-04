import test from 'japa'
import Department from 'App/Models/Department'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('departments Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Department cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var departments = Array()

    const departmentCreate = new Department()

    departmentCreate.name = string.generateRandom(32)
    departmentCreate.is_active = false


    await departmentCreate.save()

    if (departmentCreate.$isPersisted) {
      cruds.create = true

      departments = await Department.all()

      if(departments.length > 0){
        cruds.all = true
      }
    }

    const departmentFind = await Department.findOrFail(departmentCreate.id)

    if (departmentFind.id = departmentCreate.id) {
      cruds.find = true
    }

    await departmentFind.merge({
      name: departmentCreate.name,
      is_active: departmentCreate.is_active,
    }).save()

    if(departmentFind.$isPersisted){
      cruds.update = true

      departments = await Department.all()

      if(departments.length > 0){
        cruds.all = true
      }
    }

    await departmentFind.delete()

    departments = await Department.all()

    if(departments.length == 0){
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
