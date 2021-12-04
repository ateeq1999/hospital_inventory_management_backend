import test from 'japa'
import Order from 'App/Models/Order'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'


test.group('orders Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Order cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var orders = Array()

    const orderCreate = new Order()

    orderCreate.doctor_id = string.generateRandom(32)
    orderCreate.department_id = string.generateRandom(32)
    orderCreate.status = string.generateRandom(32)


    await orderCreate.save()

    if (orderCreate.$isPersisted) {
      cruds.create = true

      orders = await Order.all()

      if(orders.length > 0){
        cruds.all = true
      }
    }

    const orderFind = await Order.findOrFail(orderCreate.id)

    if (orderFind.id = orderCreate.id) {
      cruds.find = true
    }

    await orderFind.merge({
      doctor_id: orderCreate.doctor_id,
      department_id: orderCreate.department_id,
      status: orderCreate.status,
    }).save()

    if(orderFind.$isPersisted){
      cruds.update = true

      orders = await Order.all()

      if(orders.length > 0){
        cruds.all = true
      }
    }

    await orderFind.delete()

    orders = await Order.all()

    if(orders.length == 0){
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
