import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		email: schema.string({}),
		password: schema.string({}),
	})

	public messages = {
		'email.required': 'email is required',
		'password': 'password is required',
	}
}
