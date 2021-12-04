import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CoverImageValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    cover_image: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })

  public messages = {
    'cover_image.file.extname': 'You can only upload cover_images',
    'cover_image.file.size': 'cover_image size must be under 2mb',
  }
}
