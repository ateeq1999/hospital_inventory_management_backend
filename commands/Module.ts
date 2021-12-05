import { join } from 'path'
import { string } from '@ioc:Adonis/Core/Helpers'
import { 
  BaseCommand,
} from '@adonisjs/core/build/standalone'

export default class Module extends BaseCommand {
  public static commandName = 'module'

  public static settings = {
    loadApp: true
  }

  public async createUis({ feilds, singleResourceName, modelName, resourceName, uiName }) {
    this.logger.action(`Creating ${uiName} file`)

    this.generator
    .addFile(uiName, {
      extname: '.vue'
    })
    .appRoot(this.application.appRoot)
    .destinationDir('./resources')
    .useMustache()
    .stub(join(__dirname, '../templates/crud/create.txt'))
    .apply({ feilds, singleResourceName, modelName, resourceName })
  }

  public async run() {
    const name = await this.prompt.ask('Enter The Module Resource Name')

    const modelName = string.capitalCase(name)

    const resourceName = string.pluralize(name)

    const resourceNameCapital = string.pluralize(name).toLocaleUpperCase()

    const singleResourceName = string.singularize(modelName).toLocaleLowerCase()

    const singleResourceNameCapital = string.singularize(modelName).toLocaleUpperCase()

    // Create The Module File
    this.generator
      .addFile(`${name}`, {
        extname: '.js'
      })
      .appRoot(this.application.resourcesPath())
      .destinationDir('js/store/modules')
      .useMustache()
      .stub(join(__dirname, '../templates/crud/store-module.txt'))
      .apply({ singleResourceName, singleResourceNameCapital, resourceName, resourceNameCapital })

    this.logger.action(`Creating ${name} module`)

    let feilds = [
      {
        feildName: 'title',
        feildType: 'string',
        isString: true,
        isDate: false,
        isNumber: false,
        isBool: false,
      }
    ]

    await this.createUis({ feilds, singleResourceName, modelName, resourceName, uiName: 'Create' })

    await this.generator.run()
  }
}
