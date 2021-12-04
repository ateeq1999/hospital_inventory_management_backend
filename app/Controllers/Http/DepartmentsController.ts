import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import CreateDepartmentValidator from 'App/Validators/CreateDepartmentValidator'

export default class DepartmentsController {
	public async index ({ response }: HttpContextContract) {
		const departments = await Department.all()

		return response.status(200).json(departments)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'departments.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateDepartmentValidator)

		const department = await Department.create(data)


		await department.save()

		return response.status(201).json(department)
	}

	public async show ({ response, params }: HttpContextContract) {
		const department = await Department.findOrFail(params.id)

		return response.status(200).json(department)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateDepartmentValidator)

		const department = await Department.findOrFail(params.id)

		await  department.merge(data).save()
		

		await department.save()

		return response.status(201).json(department)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const department = await Department.findOrFail(params.id)


		await department.delete()

		return response.status(203).json({
			msg: "Department Deleted",
			seccess: true
		})
	}
}
