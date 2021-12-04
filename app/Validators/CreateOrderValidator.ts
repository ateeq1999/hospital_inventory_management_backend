import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		doctor_id: schema.string({}),
		department_id: schema.string({}),
		status: schema.string({}),
		equipments: schema.array().anyMembers(),
	})

	public messages = {
		'doctor_id.required': 'doctor_id is required',
		'department_id.required': 'department_id is required',
		'status.required': 'status is required',
		'equipments.required': 'equipments is required',
	}
}
