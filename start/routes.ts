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

Route.group(() => {

    // ADMIN AUTH ROUTES
    Route.post("/admin/login", 'AuthController.login')
    Route.post("/admin/register", 'AuthController.register')
    
    // DOCTOR AUTH ROUTES
    Route.post("/doctor/login", 'DoctorAuthController.login')
    Route.post("/doctor/register", 'DoctorAuthController.register')
    
    // MANAGER AUTH ROUTES
    Route.post("/manager/login", 'ManagerAuthController.login')
    Route.post("/manager/register", 'ManagerAuthController.register')
    
    // STAFF AUTH ROUTES
    Route.post("/staff/login", 'StaffAuthController.login')
    Route.post("/staff/register", 'StaffAuthController.register')
    
}).prefix('api/auth')

Route.group(() => {
    // Admins Routes
    Route.resource('admins', 'AdminsController').apiOnly()
    
    // units Routes
    Route.resource('units', 'UnitsController').apiOnly()
    
    // equipment Routes
    Route.resource('equipments', 'EquipmentController').apiOnly()
    
    // managers Routes
    Route.resource('managers', 'ManagersController').apiOnly()
    
    // staff Routes
    Route.resource('staff', 'StaffController').apiOnly()
    
    // departments Routes
    Route.resource('departments', 'DepartmentsController').apiOnly()
    
    // doctors Routes
    Route.resource('doctors', 'DoctorsController').apiOnly()
    
    // orders Routes
    Route.resource('orders', 'OrdersController').apiOnly()
}).prefix('api').middleware('auth:api,doctor,manager,staff')

Route.on('*').render('app')
