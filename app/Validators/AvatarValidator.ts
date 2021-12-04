import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AvatarValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    avatar: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })

  public messages = {
    'avatar.file.extname': 'You can only upload cover_images',
    'avatar.file.size': 'avatar size must be under 2mb',
  }
}
