import test from 'japa'
import Report from 'App/Models/Report'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'

test.group('reports Model', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  
  test('ensure Report cruds work fine', async (assert) => {
    var cruds = {
      all: false,
      create: false,
      find: false,
      update: false,
      delete: false,
    }

    var reports = Array()

    const reportCreate = new Report()

    reportCreate.note = string.generateRandom(32)
    reportCreate.is_normal = false
    reportCreate.latitude = string.generateRandom(32)
    reportCreate.longitude = string.generateRandom(32)
    reportCreate.status = string.generateRandom(32)

    reportCreate.cover_image = "create.png"

    await reportCreate.save()

    if (reportCreate.$isPersisted) {
      cruds.create = true

      reports = await Report.all()

      if(reports.length > 0){
        cruds.all = true
      }
    }

    const reportFind = await Report.findOrFail(reportCreate.id)

    if (reportFind.id = reportCreate.id) {
      cruds.find = true
    }

    await reportFind.merge({
      note: reportCreate.note,
      is_normal: reportCreate.is_normal,
      latitude: reportCreate.latitude,
      longitude: reportCreate.longitude,
      status: reportCreate.status,
      cover_image: "updated.png",
    }).save()

    if(reportFind.$isPersisted){
      cruds.update = true

      reports = await Report.all()

      if(reports.length > 0){
        cruds.all = true
      }
    }

    await reportFind.delete()

    reports = await Report.all()

    if(reports.length == 0){
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
