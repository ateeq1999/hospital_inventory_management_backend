import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff'
import CreateStaffValidator from 'App/Validators/CreateStaffValidator'

export default class StaffController {
	public async index ({ response }: HttpContextContract) {
		const staff = await Staff.all()

		return response.status(200).json(staff)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'staff.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateStaffValidator)

		const staff = await Staff.create(data)


		await staff.save()

		return response.status(201).json(staff)
	}

	public async show ({ response, params }: HttpContextContract) {
		const staff = await Staff.findOrFail(params.id)

		return response.status(200).json(staff)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateStaffValidator)

		const staff = await Staff.findOrFail(params.id)

		await  staff.merge(data).save()
		

		await staff.save()

		return response.status(201).json(staff)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const staff = await Staff.findOrFail(params.id)


		await staff.delete()

		return response.status(203).json({
			msg: "Staff Deleted",
			seccess: true
		})
	}
}
