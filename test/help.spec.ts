import test from 'japa'
import Help from 'App/Models/Help'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'

test.group('helps Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Help cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var helps = Array()

    const helpCreate = new Help()

    helpCreate.text = string.generateRandom(32)
    helpCreate.userId = string.generateRandom(32)


    await helpCreate.save()

    if (helpCreate.$isPersisted) {
      cruds.create = true

      helps = await Help.all()

      if(helps.length > 0){
        cruds.all = true
      }
    }

    const helpFind = await Help.findOrFail(helpCreate.id)

    if (helpFind.id = helpCreate.id) {
      cruds.find = true
    }

    await helpFind.merge({
      text: helpCreate.text,
      userId: helpCreate.userId,
    }).save()

    if(helpFind.$isPersisted){
      cruds.update = true

      helps = await Help.all()

      if(helps.length > 0){
        cruds.all = true
      }
    }

    await helpFind.delete()

    helps = await Help.all()

    if(helps.length == 0){
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
