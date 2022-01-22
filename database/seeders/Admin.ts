import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'

export default class AdminSeeder extends BaseSeeder {
  public async run () {
    const admin = await Admin.create({
      email: 'admin@amdin.com',
      password: 'password'
    })

    await admin.save()
  }
}
