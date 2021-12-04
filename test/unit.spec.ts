import test from 'japa'
import Unit from 'App/Models/Unit'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('units Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Unit cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var units = Array()

    const unitCreate = new Unit()

    unitCreate.name = string.generateRandom(32)
    unitCreate.is_active = false


    await unitCreate.save()

    if (unitCreate.$isPersisted) {
      cruds.create = true

      units = await Unit.all()

      if(units.length > 0){
        cruds.all = true
      }
    }

    const unitFind = await Unit.findOrFail(unitCreate.id)

    if (unitFind.id = unitCreate.id) {
      cruds.find = true
    }

    await unitFind.merge({
      name: unitCreate.name,
      is_active: unitCreate.is_active,
    }).save()

    if(unitFind.$isPersisted){
      cruds.update = true

      units = await Unit.all()

      if(units.length > 0){
        cruds.all = true
      }
    }

    await unitFind.delete()

    units = await Unit.all()

    if(units.length == 0){
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
