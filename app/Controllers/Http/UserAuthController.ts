import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserLoginValidator from 'App/Validators/UserLoginValidator'
import UserRegisterValidator from 'App/Validators/UserRegisterValidator'
import Cache from 'App/Services/Cache'

export default class UserAuthController {
    public async login ({ request, auth }: HttpContextContract) {
        const data = await request.validate(UserLoginValidator)

        const token = await auth.use("user").attempt(data.ssn, data.password)

        const user = await auth.use("user").user
            
        return {token: token.token, user}
        
    }

    public async register ({ request, auth }: HttpContextContract) {
        const data = await request.validate(UserRegisterValidator)

        const user = await User.create(data)

        await user.save()

        const token = await auth.use("user").attempt(data.ssn, data.password)

        return {
            user, token
        }
        
    }

    public async logout ({ auth, response }: HttpContextContract) {
        
        await auth.use("user").logout()

        return response.json({
            msg: "you have loged out"
        })
    }

    public async me ({ auth, response }: HttpContextContract) {
        let user = await Cache.get(`_auth_${await auth.use('user').user?.id}`)

        if (user) {
            return response.status(200).json(user)
        } else {
            let user = await auth.use('user').user
            
            await Cache.save(`_auth_${await auth.use('user').user?.id}`, user, 2)
            
            return response.status(200).json(user)
        }
    }
}