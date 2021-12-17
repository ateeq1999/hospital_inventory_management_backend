import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class ManagerAuthController {
    public async login ({ request, auth }: HttpContextContract) {
        const data = await request.validate(UserLoginValidator)

        const token = await auth.use("doctor").attempt(data.phone, data.password)

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