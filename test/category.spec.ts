import test from 'japa'
import Category from 'App/Models/Category'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'

test.group('categories Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Category cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var categories = Array()

    const categoryCreate = new Category()

    categoryCreate.name = string.generateRandom(32)
    categoryCreate.is_active = false

    categoryCreate.cover_image = "create.png"

    await categoryCreate.save()

    if (categoryCreate.$isPersisted) {
      cruds.create = true

      categories = await Category.all()

      if(categories.length > 0){
        cruds.all = true
      }
    }

    const categoryFind = await Category.findOrFail(categoryCreate.id)

    if (categoryFind.id = categoryCreate.id) {
      cruds.find = true
    }

    await categoryFind.merge({
      name: categoryCreate.name,
      is_active: categoryCreate.is_active,
      cover_image: "updated.png",
    }).save()

    if(categoryFind.$isPersisted){
      cruds.update = true

      categories = await Category.all()

      if(categories.length > 0){
        cruds.all = true
      }
    }

    await categoryFind.delete()

    categories = await Category.all()

    if(categories.length == 0){
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
