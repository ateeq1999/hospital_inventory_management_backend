import {cuid} from '@ioc:Adonis/Core/Helpers'

// import { v4 as uuidV4 } from 'uuid'

interface UuidHookContract<T> {
  generateUUID: (modelInstance: T) => void
}

interface LucidModel {
  id: string
}

const UuidHook: UuidHookContract<LucidModel> = {
  generateUUID: (modelInstance): void => {
    try {
      modelInstance.id = cuid()
    } catch (error) {
      console.log(error)
    }
  },
}

export default UuidHook