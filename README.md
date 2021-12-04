## Unit
- id
- name
- is_active
## Equipment
- id
- name
- quantity
- is_expire
- expire_date
- unit_id
- is_active
## Manager
- id
- name
- phone
- email
- password
- is_active
## Staff
- id
- name
- phone
- password
- is_active
## Department
- id
- name
- is_active
## Doctor
- id
- department_id
- name
- phone
- password
- is_active
## Order
- doctor_id
- department_id
- items [
    {
        equipment_id,
        quantity,
    }
]
- status ['ON_PROGRESS', 'CANCLE', 'SUCCESS', 'CREATED']

## Relationships
- units have many equipments
- equipment belongsTo one unit
- doctor belongsTo one department
- department have many doctors
- department have many orders
- doctor have many orders
- order belongsTo one department
- order and equipment manytomany