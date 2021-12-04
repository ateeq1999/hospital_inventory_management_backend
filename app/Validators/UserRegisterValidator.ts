import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserRegisterValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		name: schema.string({}),
		phone: schema.string({}, [
			rules.unique({ table: 'users', column: 'phone' })
		]),
		ssn: schema.string({}, [
			rules.unique({ table: 'users', column: 'ssn' })
		]),
		password: schema.string({}),
	})

	public messages = {
		'ssn.required': 'ssn is required',
		'name.required': 'name is required',
		'phone.required': 'phone is required',
		'password': 'password is required',
	}
}
