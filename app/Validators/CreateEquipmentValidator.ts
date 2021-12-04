import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEquipmentValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		name: schema.string({}),
		quantity: schema.number(),
		is_expire: schema.boolean(),
		expire_date: schema.date(),
		unit_id: schema.string({}),
		is_active: schema.boolean(),
	})

	public messages = {
		'name.required': 'name is required',
		'quantity.required': 'quantity is required',
		'is_expire': 'is_expire is required',
		'expire_date.required': 'expire_date is required',
		'unit_id.required': 'unit_id is required',
		'is_active': 'is_active is required',
	}
}
