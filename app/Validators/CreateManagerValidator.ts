import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateManagerValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		name: schema.string({}),
		email: schema.string({}),
		password: schema.string({}),
		is_active: schema.boolean(),
	})

	public messages = {
		'name.required': 'name is required',
		'email.required': 'email is required',
		'password.required': 'password is required',
		'is_active': 'is_active is required',
	}
}
