import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class ManagerAuthController {
    public async login ({ request, auth }: HttpContextContract) {
        const data = await request.validate(LoginValidator)

        const token = await auth.use("manager").attempt(data.email, data.password)

        const manager = await auth.use("manager").user
            
        return {token: token.token, manager}
        
    }

    public async logout ({ auth, response }: HttpContextContract) {
        
        await auth.use("manager").logout()

        return response.json({
            msg: "you have loged out"
        })
    }

    public async me ({ auth, response }: HttpContextContract) {
        let manager = await auth.use('manager').user
        
        return response.status(200).json(manager)
    }
}