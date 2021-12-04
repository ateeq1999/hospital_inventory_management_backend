import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		name: schema.string({}),
		phone: schema.string({}),
		ssn: schema.string({}),
		password: schema.string({}),
	})

	public messages = {
		'ssn.required': 'ssn is required',
		'name.required': 'name is required',
		'phone.required': 'phone is required',
		'password': 'password is required',
	}
}
