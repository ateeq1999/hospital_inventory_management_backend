import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import UserRegisterValidator from 'App/Validators/UserRegisterValidator'
import AvatarValidator from 'App/Validators/AvatarValidator'
import UserUpdateValidator from 'App/Validators/UserUpdateValidator'

export default class UsersController {
	public async index ({ response }: HttpContextContract) {
		const users = await User.all()

		return response.status(200).json(users)
	}

	public async create ({ response }: HttpContextContract) {
		return response.json({msg: 'users.create'})
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = await request.validate(UserRegisterValidator)

		const user = await User.create(data)

		if(request.file('avatar')){
			const validatedImage = await request.validate(AvatarValidator)

			const imageName = `${new Date().getTime()}.${validatedImage.avatar.extname}`

			user.avatar = imageName

			await validatedImage.avatar.move(Application.tmpPath('uploads/users'), {
				name: `${imageName}`,
			})
		}

		await user.save()

		return response.status(201).json(user)
	}

	public async show ({ response, params }: HttpContextContract) {
		const user = await User.findOrFail(params.id)

		return response.status(200).json(user)
	}

	public async edit ({}: HttpContextContract) {
	}

	public async update ({ params, request, response }: HttpContextContract) {
		const data = await request.validate(UserUpdateValidator)

		const user = await User.findOrFail(params.id)

		await user.merge(data).save()
		
		if(request.file('avatar')){
		
			const validatedImage = await request.validate(AvatarValidator)

			const imageName = `${new Date().getTime()}.${validatedImage.avatar.extname}`

			const oldImagePath = Application.tmpPath('uploads/users/')  + user.avatar

			user.avatar = imageName

			await validatedImage.avatar.move(Application.tmpPath('uploads/users'), {
				name: `${imageName}`,
			})

			if(fs.existsSync(oldImagePath)){
				// delete the image from the files
				fs.unlinkSync(oldImagePath);
			}
		}

		await user.save()

		return response.status(201).json(user)
	}

	public async destroy ({ params, response }: HttpContextContract) {
		const user = await User.findOrFail(params.id)

		const image = Application.tmpPath('uploads/users/') + user.avatar

		if(fs.existsSync(image)){
			// delete a file
			fs.unlinkSync(image);
		}

		await user.delete()

		return response.status(203).json({
			msg: "User Deleted",
			seccess: true
		})
	}
}
