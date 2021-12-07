## Unit
[x] id
[x] name
[x] is_active
## Equipment
[x] id, name, quantity, is_expire, expire_date, unit_id, is_active
## Manager
[x] id, name, phone,  email, password, is_active
## Staff
[x] id
[x] name, phone, password, is_active
## Department
[x] id, name, is_active
## Doctor
[x] id, department_id, name, phone, password, is_active
## Order
[x] doctor_id, department_id, items [
    {
        equipment_id,
        quantity,
    }
]
[x] status ['ON_PROGRESS', 'CANCLE', 'SUCCESS', 'CREATED']

## Relationships
[x] units have many equipments
[x] equipment belongsTo one unit
[x] doctor belongsTo one department
[x] department have many doctors
[x] department have many orders
[x] doctor have many orders
[x] order belongsTo one department
[x] order and equipment manytomany