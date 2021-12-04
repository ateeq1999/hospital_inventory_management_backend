import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAdminValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		email: schema.string({}, [
			rules.unique({ table: 'admins', column: 'email' })
		]),
		password: schema.string({}),
	})

	public messages = {
		'email.required': 'email is required',
		'password': 'password is required',
	}
}
