import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class ManagerAuthController {
    public async login ({ request, auth }: HttpContextContract) {
        const data = await request.validate(LoginValidator)

        const token = await auth.use("doctor").attempt(data.email, data.password)

        const doctor = await auth.use("doctor").user
            
        return {token: token.token, doctor}
        
    }

    public async logout ({ auth, response }: HttpContextContract) {
        
        await auth.use("doctor").logout()

        return response.json({
            msg: "you have loged out"
        })
    }

    public async me ({ auth, response }: HttpContextContract) {
        let doctor = await auth.use('doctor').user
        
        return response.status(200).json(doctor)
    }
}