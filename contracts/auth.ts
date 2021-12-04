/**
 * Contract source: https://git.io/JOdz5
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import Admin from 'App/Models/Admin'
import Manager from 'App/Models/Manager';
import Staff from 'App/Models/Staff';
import Doctor from 'App/Models/Doctor';

declare module '@ioc:Adonis/Addons/Auth' {
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  |
  | The providers are used to fetch Doctors. The Auth module comes pre-bundled
  | with two providers that are `Lucid` and `Database`. Both uses database
  | to fetch doctor details.
  |
  | You can also create and register your own custom providers.
  |
  */
  interface ProvidersList {
    /*
    |--------------------------------------------------------------------------
    | Doctor Provider
    |--------------------------------------------------------------------------
    |
    | The following provider uses Lucid models as a driver for fetching doctor
    | details from the database for authentication.
    |
    | You can create multiple providers using the same underlying driver with
    | different Lucid models.
    |
    */
    doctor: {
      implementation: LucidProviderContract<typeof Doctor>,
      config: LucidProviderConfig<typeof Doctor>,
    },
    admin: {
      implementation: LucidProviderContract<typeof Admin>,
      config: LucidProviderConfig<typeof Admin>,
    },
    manager: {
      implementation: LucidProviderContract<typeof Manager>,
      config: LucidProviderConfig<typeof Manager>,
    },
    staff: {
      implementation: LucidProviderContract<typeof Staff>,
      config: LucidProviderConfig<typeof Staff>,
    },
  }

  /*
  |--------------------------------------------------------------------------
  | Guards
  |--------------------------------------------------------------------------
  |
  | The guards are used for authenticating Doctors using different drivers.
  | The auth module comes with 3 different guards.
  |
  | - SessionGuardContract
  | - BasicAuthGuardContract
  | - OATGuardContract ( Opaque access token )
  |
  | Every guard needs a provider for looking up Doctors from the database.
  |
  */
  interface GuardsList {
    /*
    |--------------------------------------------------------------------------
    | Web Guard
    |--------------------------------------------------------------------------
    |
    | The web guard uses sessions for maintaining doctor login state. It uses
    | the `doctor` provider for fetching doctor details.
    |
    */
    web: {
      implementation: SessionGuardContract<'admin', 'web'>,
      config: SessionGuardConfig<'admin'>,
    },
    /*
    |--------------------------------------------------------------------------
    | OAT Guard
    |--------------------------------------------------------------------------
    |
    | OAT, stands for (Opaque access tokens) guard uses database backed tokens
    | to authenticate requests.
    |
    */
    api: {
      implementation: OATGuardContract<'admin', 'api'>,
      config: OATGuardConfig<'admin'>,
    },
    doctor: {
      implementation: OATGuardContract<'doctor', 'api'>,
      config: OATGuardConfig<'doctor'>,
    },
    manager: {
      implementation: OATGuardContract<'manager', 'api'>,
      config: OATGuardConfig<'manager'>,
    },
    staff: {
      implementation: OATGuardContract<'staff', 'api'>,
      config: OATGuardConfig<'staff'>,
    },
    /*
    |--------------------------------------------------------------------------
    | Basic Auth Guard
    |--------------------------------------------------------------------------
    |
    | The basic guard uses basic auth for maintaining doctor login state. It uses
    | the `doctor` provider for fetching doctor details.
    |
    */
    basic: {
      implementation: BasicAuthGuardContract<'admin', 'basic'>,
      config: BasicAuthGuardConfig<'admin'>,
    },
  }
}
