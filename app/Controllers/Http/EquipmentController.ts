import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Equipment from 'App/Models/Equipment'
import CreateEquipmentValidator from 'App/Validators/CreateEquipmentValidator'

export default class EquipmentController {
	public async index ({ response }: HttpContextContract) {
		const equipment = await Equipment.all()

		return response.status(200).json(equipment)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'equipment.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateEquipmentValidator)

		const equipment = await Equipment.create(data)

		await equipment.save()

		return response.status(201).json(equipment)
	}

	public async show ({ response, params }: HttpContextContract) {
		const equipment = await Equipment.findOrFail(params.id)

		return response.status(200).json(equipment)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateEquipmentValidator)

		const equipment = await Equipment.findOrFail(params.id)

		await  equipment.merge(data).save()
		

		await equipment.save()

		return response.status(201).json(equipment)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const equipment = await Equipment.findOrFail(params.id)


		await equipment.delete()

		return response.status(203).json({
			msg: "Equipment Deleted",
			seccess: true
		})
	}
}
