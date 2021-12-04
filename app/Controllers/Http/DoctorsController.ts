import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doctor from 'App/Models/Doctor'
import CreateDoctorValidator from 'App/Validators/CreateDoctorValidator'

export default class DoctorsController {
	public async index ({ response }: HttpContextContract) {
		const doctors = await Doctor.all()

		return response.status(200).json(doctors)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'doctors.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateDoctorValidator)

		const doctor = await Doctor.create(data)


		await doctor.save()

		return response.status(201).json(doctor)
	}

	public async show ({ response, params }: HttpContextContract) {
		const doctor = await Doctor.findOrFail(params.id)

		return response.status(200).json(doctor)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateDoctorValidator)

		const doctor = await Doctor.findOrFail(params.id)

		await  doctor.merge(data).save()
		

		await doctor.save()

		return response.status(201).json(doctor)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const doctor = await Doctor.findOrFail(params.id)


		await doctor.delete()

		return response.status(203).json({
			msg: "Doctor Deleted",
			seccess: true
		})
	}
}
