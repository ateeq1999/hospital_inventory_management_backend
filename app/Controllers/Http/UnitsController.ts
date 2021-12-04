import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Unit from 'App/Models/Unit'
import CreateUnitValidator from 'App/Validators/CreateUnitValidator'

export default class UnitsController {
	public async index ({ response }: HttpContextContract) {
		const units = await Unit.all()

		return response.status(200).json(units)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'units.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateUnitValidator)

		const unit = await Unit.create(data)


		await unit.save()

		return response.status(201).json(unit)
	}

	public async show ({ response, params }: HttpContextContract) {
		const unit = await Unit.findOrFail(params.id)

		return response.status(200).json(unit)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateUnitValidator)

		const unit = await Unit.findOrFail(params.id)

		await  unit.merge(data).save()
		

		await unit.save()

		return response.status(201).json(unit)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const unit = await Unit.findOrFail(params.id)


		await unit.delete()

		return response.status(203).json({
			msg: "Unit Deleted",
			seccess: true
		})
	}
}
