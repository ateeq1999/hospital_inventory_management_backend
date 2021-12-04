import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'

export default class AdminsController {
	public async index ({ response }: HttpContextContract) {
		const admins = await Admin.all()

		return response.status(200).json(admins)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'admins.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateAdminValidator)

		const admin = await Admin.create(data)

		await admin.save() 

		return response.status(201).json(admin)
	}

	public async show ({ response, params }: HttpContextContract) {
		const admin = await Admin.findOrFail(params.id)

		return response.status(200).json(admin)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateAdminValidator)

		const admin = await Admin.findOrFail(params.id)

		await  admin.merge(data).save()
		
		await admin.save()

		return response.status(201).json(admin)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const admin = await Admin.findOrFail(params.id)

		await admin.delete()

		return response.status(203).json({
			msg: "Admin Deleted",
			seccess: true
		})
	}
}
