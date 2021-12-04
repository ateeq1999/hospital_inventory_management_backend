import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import LoginValidator from 'App/Validators/LoginValidator'
import Cache from 'App/Services/Cache'
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'

export default class AuthController {
    public async login ({ request, auth }: HttpContextContract) {
        const data = await request.validate(LoginValidator)

        const token = await auth.use("api").attempt(data.email, data.password)

        const admin = await auth.use("api").user
            
        return {token: token.token, admin}
        
    }

    public async register ({ request, auth }: HttpContextContract) {
        const data = await request.validate(CreateAdminValidator)

        const admin = await Admin.create(data)

        await admin.save()

        const token = await auth.use("api").attempt(data.email, data.password)

        return {
            admin, token
        }
        
    }

    public async logout ({ auth, response }: HttpContextContract) {
        
        await auth.use("api").logout()

        return response.json({
            msg: "you have loged out"
        })
    }

    public async me ({ auth, response }: HttpContextContract) {
        let admin = await Cache.get(`_auth_${await auth.use('api').user?.id}`)

        if (admin) {
            return response.status(200).json(admin)
        } else {
            let admin = await auth.use('api').user
            
            await Cache.save(`_auth_${await auth.use('api').user?.id}`, admin, 2)
            
            return response.status(200).json(admin)
        }
    }
}