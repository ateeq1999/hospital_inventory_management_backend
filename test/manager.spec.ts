import test from 'japa'
import Manager from 'App/Models/Manager'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('managers Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Manager cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var managers = Array()

    const managerCreate = new Manager()

    managerCreate.name = string.generateRandom(32)
    managerCreate.email = string.generateRandom(32)
    managerCreate.password = string.generateRandom(32)
    managerCreate.is_active = false


    await managerCreate.save()

    if (managerCreate.$isPersisted) {
      cruds.create = true

      managers = await Manager.all()

      if(managers.length > 0){
        cruds.all = true
      }
    }

    const managerFind = await Manager.findOrFail(managerCreate.id)

    if (managerFind.id = managerCreate.id) {
      cruds.find = true
    }

    await managerFind.merge({
      name: managerCreate.name,
      email: managerCreate.email,
      password: managerCreate.password,
      is_active: managerCreate.is_active,
    }).save()

    if(managerFind.$isPersisted){
      cruds.update = true

      managers = await Manager.all()

      if(managers.length > 0){
        cruds.all = true
      }
    }

    await managerFind.delete()

    managers = await Manager.all()

    if(managers.length == 0){
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
