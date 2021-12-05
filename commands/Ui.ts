import { join } from 'path'
import { string, safeEqual } from '@ioc:Adonis/Core/Helpers'
import { 
  BaseCommand,
} from '@adonisjs/core/build/standalone'

export default class Ui extends BaseCommand {
  public static commandName = 'ui'

  public static settings = {
    loadApp: true
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

    const name = await this.prompt.ask('Enter The Crud Resource Name')

    const modelName = string.capitalCase(name)

    const resourceName = string.pluralize(name)

    const singleResourceName = string.singularize(modelName).toLocaleLowerCase()

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

    // await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Index' })
    // await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Create' })
    // await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Edit' })
    await this.CreateViews({ feilds, singleResourceName, modelName, resourceName, uiName: 'Show' })
    
    await this.generator.run()

  }
}
