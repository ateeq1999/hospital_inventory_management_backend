import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Equipment from 'App/Models/Equipment'
import Order from 'App/Models/Order'
import CreateOrderValidator from 'App/Validators/CreateOrderValidator'

export default class OrdersController {
	public async index ({ response }: HttpContextContract) {
		const orders = await Order.query()
		.preload('department').preload('doctor').preload('equipments')

		return response.status(200).json(orders)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'orders.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(CreateOrderValidator)

		const order = await Order.create(
			{
				department_id: data.department_id,
				doctor_id: data.doctor_id,
				status: data.status
			}
		)

		if(data.equipments.length > 0){
			data.equipments.forEach(async (item) => {
				const equipment = await Equipment.findOrFail(item.id)
		
				await equipment.merge({
					quantity: equipment.quantity - item.quantity
				}).save()
		
				await order.related('equipments').attach({
					[equipment.id]: {
						quantity: equipment.quantity,
					}
				})
			})
		}

		await order.save()

		await order.related("equipments").query().pivotColumns(["quantity"])

		await order.load('doctor')
		
		await order.load('department')

		return response.status(201).json(order)
	}

	public async show ({ response, params }: HttpContextContract) {
		const order = await Order.findOrFail(params.id)

		return response.status(200).json(order)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(CreateOrderValidator)

		const order = await Order.findOrFail(params.id)

		await order.merge(
			{
				department_id: data.department_id,
				doctor_id: data.doctor_id,
				status: data.status
			}
		).save()

		if(data.equipments.length > 0){
			data.equipments.forEach(async (item) => {
				const equipment = await Equipment.findOrFail(item.id)
		
				await equipment.merge({
					quantity: equipment.quantity - item.quantity
				}).save()
		
				await order.related('equipments').attach({
					[equipment.id]: {
						quantity: equipment.quantity,
					}
				})
			})
		}

		await order.save()

		await order.related("equipments").query().pivotColumns(["quantity"])

		await order.load('doctor')
		
		await order.load('department')

		return response.status(201).json(order)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const order = await Order.findOrFail(params.id)

		await order.delete()

		return response.status(203).json({
			msg: "Order Deleted",
			seccess: true
		})
	}
}
