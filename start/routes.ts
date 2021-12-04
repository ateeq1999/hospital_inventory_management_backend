/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// ADMIN AUTH ROUTES
Route.post("/api/admin/login", 'AuthController.login')
Route.post("/api/admin/register", 'AuthController.register')

// USER AUTH ROUTES
Route.post("/api/login", 'UserAuthController.login')
Route.post("/api/register", 'UserAuthController.register')

Route.group(() => {
    // Admins Routes
    Route.resource('admins', 'AdminsController').apiOnly()
}).prefix('api').middleware('auth:api')

Route.group(() => {
    // Users Routes
    Route.resource('users', 'UsersController').apiOnly()
}).prefix('api').middleware('auth:api,user')
    
Route.on('*').render('app')
