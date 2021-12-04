import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Manager from 'App/Models/Manager'
import CreateManagerValidator from 'App/Validators/CreateManagerValidator'

export default class ManagersController {
	public async index ({ response }: HttpContextContract) {
		const managers = await Manager.all()

		return response.status(200).json(managers)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'managers.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateManagerValidator)

		const manager = await Manager.create(data)


		await manager.save()

		return response.status(201).json(manager)
	}

	public async show ({ response, params }: HttpContextContract) {
		const manager = await Manager.findOrFail(params.id)

		return response.status(200).json(manager)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateManagerValidator)

		const manager = await Manager.findOrFail(params.id)

		await  manager.merge(data).save()
		

		await manager.save()

		return response.status(201).json(manager)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const manager = await Manager.findOrFail(params.id)


		await manager.delete()

		return response.status(203).json({
			msg: "Manager Deleted",
			seccess: true
		})
	}
}
