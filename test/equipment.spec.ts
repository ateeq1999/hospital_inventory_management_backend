import test from 'japa'
import Equipment from 'App/Models/Equipment'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('equipment Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Equipment cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var equipment = Array()

    const equipmentCreate = new Equipment()

    equipmentCreate.name = string.generateRandom(32)
    equipmentCreate.quantity = Math.floor(Math.random() * (500 - 50) ) + 50;
    equipmentCreate.is_expire = false
    equipmentCreate.expire_date = DateTime.now()
    equipmentCreate.unit_id = string.generateRandom(32)
    equipmentCreate.is_active = false


    await equipmentCreate.save()

    if (equipmentCreate.$isPersisted) {
      cruds.create = true

      equipment = await Equipment.all()

      if(equipment.length > 0){
        cruds.all = true
      }
    }

    const equipmentFind = await Equipment.findOrFail(equipmentCreate.id)

    if (equipmentFind.id = equipmentCreate.id) {
      cruds.find = true
    }

    await equipmentFind.merge({
      name: equipmentCreate.name,
      quantity: equipmentCreate.quantity,
      is_expire: equipmentCreate.is_expire,
      expire_date: equipmentCreate.expire_date,
      unit_id: equipmentCreate.unit_id,
      is_active: equipmentCreate.is_active,
    }).save()

    if(equipmentFind.$isPersisted){
      cruds.update = true

      equipment = await Equipment.all()

      if(equipment.length > 0){
        cruds.all = true
      }
    }

    await equipmentFind.delete()

    equipment = await Equipment.all()

    if(equipment.length == 0){
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
