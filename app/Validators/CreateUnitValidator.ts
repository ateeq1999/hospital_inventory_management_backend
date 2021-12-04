import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUnitValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		name: schema.string({}),
		is_active: schema.boolean(),
	})

	public messages = {
		'name.required': 'name is required',
		'is_active': 'is_active is required',
	}
}
