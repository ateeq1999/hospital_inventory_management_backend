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

  public async createHasManyRelationForBelongsTo(data, filePath){
    fs.appendFileSync(filePath, data, 'utf8')
  }

  public async addRoute(data, filePath){
    fs.appendFileSync(filePath, data, 'utf8')
  }

  public async createModel({ modelName, singleResourceName, feilds, hasCover, resourceName, belongsToImport, hasManyImport, manyToManyImport }){
    this.generator
    .addFile(modelName, {
      // Do not pluralize when controller name matches one of the following
      formIgnoreList: ['User', 'Admin']
    })
    .appRoot(this.application.appRoot)
    .destinationDir('app/Models')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/model.txt'))
    .apply({ modelName, singleResourceName, feilds, hasCover, resourceName, belongsToImport, hasManyImport, manyToManyImport })
  }

  public async createValidator({ filename: crudValidatorName, feilds }){
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
  }

  public async createController({ modelName, controllerName, singleResourceName, resourceName, hasCover }){
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
  }

  public async createMigration({ feilds, resourceName, hasCover, crudMigrationName }) {
    this.logger.action(`Creating ${crudMigrationName} file`)

    this.generator
    .addFile(crudMigrationName)
    .appRoot(this.application.appRoot)
    .destinationDir('database/migrations')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/migration.txt'))
    .apply({ feilds, resourceName, hasCover })
  }

  public async createUnitTest({ feilds, singleResourceName, modelName, resourceName, hasCover, crudTestFileName }) {
    this.logger.action(`Creating ${crudTestFileName} file`)

    this.generator
    .addFile(crudTestFileName, {
      extname: '.spec.ts'
    })
    .appRoot(this.application.appRoot)
    .destinationDir('./test')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/test.model.txt'))
    .apply({ feilds, singleResourceName, modelName, resourceName, hasCover })
  }

  public async CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName }) {
    this.logger.action(`Creating ${uiName} file`)

    switch (uiName) {
      case 'Create':
        this.generator
        .addFile(uiName, {
          extname: '.vue'
        })
        .appRoot(this.application.appRoot)
        .destinationDir(`./resources/js/views/${resourceName}`)
        .useMustache()
        .stub(join(__dirname, '../templates/crud/views/create.txt'))
        .apply({ feilds, singleResourceName, modelName, resourceName })
        break;
      case 'Edit':
        this.generator
        .addFile(uiName, {
          extname: '.vue'
        })
        .appRoot(this.application.appRoot)
        .destinationDir(`./resources/js/views/${resourceName}`)
        .useMustache()
        .stub(join(__dirname, '../templates/crud/views/edit.txt'))
        .apply({ feilds, singleResourceName, modelName, resourceName })
        break;
      case 'Index':
        this.generator
        .addFile(uiName, {
          extname: '.vue'
        })
        .appRoot(this.application.appRoot)
        .destinationDir(`./resources/js/views/${resourceName}`)
        .useMustache()
        .stub(join(__dirname, '../templates/crud/views/index.txt'))
        .apply({ feilds, singleResourceName, modelName, resourceName })
        break;
      case 'Show':
        this.generator
        .addFile(uiName, {
          extname: '.vue'
        })
        .appRoot(this.application.appRoot)
        .destinationDir(`./resources/js/views/${resourceName}`)
        .useMustache()
        .stub(join(__dirname, '../templates/crud/views/show.txt'))
        .apply({ feilds, singleResourceName, modelName, resourceName })
        break;
    
      default:
        this.logger.error(`Invalide ${uiName} file name`)
        break;
    }

  }

  public async run() {
    let belongsToModels = Array()
    let belongsToImport = false
    let hasManyImport = false
    let manyToManyImport = false

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
        {
          name: 'Image',
          message: 'Creates a Image feild ',
        },
        {
          name: 'BelongsTo',
          message: 'Creates a BelongsTo Relationship ',
        },
      ])

      if(safeEqual(field.feildType, "string")){
        field.isString = true
        field.isNumber = false
        field.isDate = false
        field.isBool = false
        field.isImage = false
        field.BelongsTo = false
      }else{
        if(safeEqual(field.feildType, "number")){
          field.isNumber = true
          field.isString = false
          field.isDate = false
          field.isBool = false
          field.isImage = false
          field.BelongsTo = false
        }else{
          if(safeEqual(field.feildType, "DateTime")){
            field.isDate = true
            field.isString = false
            field.isNumber = false
            field.isBool = false
            field.isImage = false
            field.BelongsTo = false
          }else{
            if(safeEqual(field.feildType, "Boolean")){
              field.isBool = true
              field.isImage = false
              field.BelongsTo = false
              field.isDate = false
              field.isString = false
              field.isNumber = false
            }else{
              if(safeEqual(field.feildType, "Image")){
                field.isImage = true
                field.isBool = false
                field.BelongsTo = false
                field.isDate = false
                field.isString = false
                field.isNumber = false
              }else{
                if(safeEqual(field.feildType, "BelongsTo")){
                  field.BelongsTo = true
                  field.BelongsToModelName = await this.prompt.ask('Enter the BelongsTo Model Name')
                  field.BelongsToRelationName = string.singularize(field.BelongsToModelName).toLocaleLowerCase()
                  field.hasManyTableName = string.pluralize(field.BelongsToModelName).toLocaleLowerCase()
                  field.BelongsToModelAttribute = await this.prompt.ask('Enter the BelongsTo Model Attribute That Will Be Displayed')
                  belongsToModels.push({
                    BelongsToModelAttribute: field.BelongsToModelAttribute,
                    BelongsToRelationName: field.BelongsToRelationName,
                    modelName: field.BelongsToModelName,
                    hasmanyRelationName: string.pluralize(field.BelongsToModelName).toLocaleLowerCase(),
                    getter: string.pluralize(field.BelongsToModelName).toLocaleUpperCase()
                  })
                  belongsToImport = true
                  field.isBool = false
                  field.isImage = false
                  field.isDate = false
                  field.isString = false
                  field.isNumber = false
                }else{
                  field.isDate = false
                  field.isBool = false
                  field.isImage = false
                  field.BelongsTo = false
                  field.isString = false
                  field.isNumber = false
                }
              }
            }
          }
        }
      }

      feilds.push(field)
    }

    const hasCover = this.hasImage
    
    // Create The Model File
    this.createModel({ modelName, singleResourceName, feilds, hasCover, resourceName, belongsToImport, hasManyImport, manyToManyImport })

    // Create The CreateValidator File
    this.createValidator({ filename: crudValidatorName, feilds })
    
    // Create The Controller File
    this.createController({ modelName, controllerName, singleResourceName, resourceName, hasCover })
    
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

    // Create Migration File
    this.createMigration({ feilds, resourceName, hasCover, crudMigrationName })
    
    // Create Test File
    this.createUnitTest({ feilds, singleResourceName, modelName, resourceName, hasCover, crudTestFileName })
  
    await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Index' })
    await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Create' })
    await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Edit' })
    await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Show' })

    await this.logger.action("Creating front routes")

    this.generator
    .addFile(resourceName, {
      extname: '.js'
    })
    .appRoot(this.application.appRoot)
    .destinationDir(`./resources/js/router/routes`)
    .useMustache()
    .stub(join(__dirname, '../templates/crud/routes.txt'))
    .apply({ resourceName })

    await this.logger.action("Creating front store Modules")

    this.generator
    .addFile(singleResourceName, {
      extname: '.js'
    })
    .appRoot(this.application.appRoot)
    .destinationDir(`./resources/js/store/modules`)
    .useMustache()
    .stub(join(__dirname, '../templates/crud/store-module.txt'))
    .apply({ resourceName, singleResourceName })
    
    await this.generator.run()

    // for (let index = 0; index < belongsToModels.length; index++) {
    //   let hasManyModelPath = join(__dirname, `../app/Models/${belongsToModels[index].modelName}.ts`)

    //   let hasManySetup = `\n
    //   // @hasMany(() => ${modelName})
    //   // public ${resourceName}: HasMany<typeof ${modelName}>`
      
    //   await this.createHasManyRelationForBelongsTo(hasManySetup, hasManyModelPath)

    //   this.logger.action(`UnComment \n${hasManySetup}\n and Import Decoraters For hasMany Relationship\n in File`).succeeded(hasManyModelPath)
    // }

    const routesFilePath = join(__dirname, '../start/routes.ts')
    
    const newRoute = `\n// ${resourceName} Routes\nRoute.resource('${resourceName}', '${controllerName}').apiOnly()\n`
    
    this.logger.action(`Adding ${resourceName} routes to routes.ts file`).succeeded(routesFilePath)

    await this.addRoute(newRoute, routesFilePath)

  }
}
