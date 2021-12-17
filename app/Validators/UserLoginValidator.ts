import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserLoginValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		phone: schema.string({}),
		password: schema.string({}),
	})

	public messages = {
		'phone.required': 'phone is required',
		'password': 'password is required',
	}
}
