/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'web',
  guards: {
    web: {
      driver: 'session',

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Admin'),
      },
    },
    api: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'admin_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Admin'),
      },
    },
    manager: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'manager_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Manager'),
      },
    },
    staff: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'staff_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['phone'],
        model: () => import('App/Models/Staff'),
      },
    },
    doctor: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'doctor_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['phone'],
        model: () => import('App/Models/Doctor'),
      },
    },
    basic: {
      driver: 'basic',
      realm: 'Login',

      provider: {
        driver: 'lucid',

        identifierKey: 'id',

        uids: ['email'],

        model: () => import('App/Models/Admin'),
      },
    },
  },
}

export default authConfig
