import { join } from 'path'
import { string, safeEqual } from '@ioc:Adonis/Core/Helpers'
import { 
  BaseCommand,
  flags
} from '@adonisjs/core/build/standalone'
import fs from 'fs'

export default class Crud extends BaseCommand {
  public static commandName = 'crud'

  public static settings = {
    loadApp: true
  }

  @flags.boolean({ alias: 'i', description: 'The Crud Have Atribute named cover_image' })
  public hasImage: boolean

  public async addRoute(data, filePath){
    fs.appendFileSync(filePath, data, 'utf8')
  }

  public async run() {
    const name = await this.prompt.ask('Enter The Crud Resource Name')

    const modelName = string.capitalCase(name)

    const resourceName = string.pluralize(name)

    const controllerName = string.pascalCase(`${resourceName}Controller`)

    const singleResourceName = string.singularize(modelName).toLocaleLowerCase()

    const crudTestFileName = `${singleResourceName}.spec`

    const crudValidatorName = `Create${modelName}Validator`

    const crudMigrationName = `${Date.now()}_${resourceName}`

    let feilds = Array()

    const resourceFeilds = await this.prompt.enum('please Enter Resource feilds', {
      hint: 'Accepts comma separated values',
    })

    for (let index = 0; index < resourceFeilds.length; index++) {
      let field = Object()
      field.feildName = resourceFeilds[index]
      field.feildType = await this.prompt.choice(`Please select field type for ${resourceFeilds[index]}`, [
        {
          name: 'string',
          message: 'Creates a String feild ',
        },
        {
          name: 'number',
          message: 'Creates a Number feild ',
        },
        {
          name: 'DateTime',
          message: 'Creates a DateTime feild ',
        },
        {
          name: 'Boolean',
          message: 'Creates a Boolean feild ',
        },
      ])

      if(safeEqual(field.feildType, "string")){
        field.isString = true
        field.isNumber = false
        field.isDate = false
        field.isBool = false
      }else{
        if(safeEqual(field.feildType, "number")){
          field.isNumber = true
          field.isString = false
          field.isDate = false
          field.isBool = false
        }else{
          if(safeEqual(field.feildType, "DateTime")){
            field.isDate = true
            field.isString = false
            field.isNumber = false
            field.isBool = false
          }else{
            if(safeEqual(field.feildType, "Boolean")){
              field.isBool = true
              field.isDate = false
              field.isString = false
              field.isNumber = false
            }else{
              field.isDate = false
              field.isBool = false
              field.isString = false
              field.isNumber = false
            }
          }
        }
      }

      feilds.push(field)
    }

    const hasCover = this.hasImage
    
    // Create The Model File
    this.generator
    .addFile(modelName, {
      // Do not pluralize when controller name matches one of the following
      formIgnoreList: ['User', 'Admin']
    })
    .appRoot(this.application.appRoot)
    .destinationDir('app/Models')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/model.txt'))
    .apply({ modelName, singleResourceName, feilds, hasCover, resourceName })

    // Create The CreateValidator File
    this.generator
    .addFile(crudValidatorName,   {
      // Do not pluralize when controller name matches one of the following
      formIgnoreList: ['User', 'Admin']
    })
    .appRoot(this.application.appRoot)
    .destinationDir('app/Validators')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/validator.txt'))
    .apply({ filename: crudValidatorName, feilds })

    
    // Create The Controller File
    this.generator
    .addFile(controllerName,   {
      // force filename to be plural
      form: 'plural',
      
      // re-format the name to "camelCase"
      pattern: 'pascalcase',
      
      // add "Controller" suffix, when not already defined
      suffix: 'Controller',
      
      // Do not pluralize when controller name matches one of the following
      formIgnoreList: ['Home', 'Auth', 'Login']
    })
    .appRoot(this.application.appRoot)
    .destinationDir('app/Controllers/Http')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/api-controller.txt'))
    .apply({ modelName, controllerName, singleResourceName, resourceName, hasCover })
    
    // Create The CreateValidator File
    if(hasCover){
      this.generator
      .addFile(`CoverImageValidator`)
      .appRoot(this.application.appRoot)
      .destinationDir('app/Validators')
      .useMustache()
      .stub(join(__dirname, '../templates/crud/cover-validator.txt'))
      .apply({filename: "CoverImageValidator"})
    }

    this.logger.action(`Creating ${crudMigrationName} file`)

    // Create Migration File
    this.generator
    .addFile(crudMigrationName)
    .appRoot(this.application.appRoot)
    .destinationDir('database/migrations')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/migration.txt'))
    .apply({ feilds, resourceName, hasCover })

    this.logger.action(`Creating ${crudTestFileName} file`)
    
    // Create Test File
    this.generator
    .addFile(crudTestFileName, {
      extname: '.spec.ts'
    })
    .appRoot(this.application.appRoot)
    .destinationDir('./test')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/test.model.txt'))
    .apply({ feilds, singleResourceName, modelName, resourceName, hasCover })
  
    await this.generator.run()

    const routesFilePath = join(__dirname, '../start/routes.ts')

    const newRoute = `\n// ${resourceName} Routes\nRoute.resource('${resourceName}', '${controllerName}').apiOnly()\n`

    this.logger.action(`Adding ${resourceName} routes to routes.ts file`).succeeded(routesFilePath)

    this.addRoute(newRoute, routesFilePath)
  }
}
