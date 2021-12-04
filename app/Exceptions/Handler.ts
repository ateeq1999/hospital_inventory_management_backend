import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor () {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    // return ctx.response.send(error);
    if (error.code === 'E_INVALID_AUTH_UID') {
      return ctx.response.status(400).send({msg: error.responseText, guard: error.guard})
    }
    if (error.code === 'E_INVALID_AUTH_PASSWORD') {
      return ctx.response.status(400).send({msg: error.responseText, guard: error.guard})
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send(error.messages)
    }

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return ctx.response.status(500).send({error, code: error.code, msg: "ER_NO_REFERENCED_ROW_2"})
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({error, code: error.code, msg: "row not found in database"})
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(404).send(error)
    }

    if (error.code === 'E_UNAUTHORIZED') {
      return ctx.response.status(404).send({error, code: "E_UNAUTHORIZED", msg: "You are not authorized"})
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(404).send({
        guard: error.guard, 
        code: "E_UNAUTHORIZED_ACCESS",
        msg: "Unauthorized access"
      })
    }

    // DB ERRORS
    if (error.code === 'ER_DUP_ENTRY') {
      if(error.sqlMessage){
        return ctx.response.status(500).send({
          // error, 
          code: error.code,
          sqlState: error.sqlState,
          msg: error.sqlMessage,
        })
      }
    }

    return super.handle(error, ctx)
  }
}
