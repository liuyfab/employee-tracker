use employees;

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 180000, 1), 
    ('Salesperson', 80000, 1),
    ('Project Manager', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 140000, 3),
    ('Accountant', 110000, 3),
    ('Customer Service', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Abby', 'Brown', 1, Null),
    ('Mike', 'Chan', 2, 1),
    ('Abby', 'Lew', 3, Null),
    ('Kevin', 'Lee', 4, 3),
    ('Max', 'Davis', 5, Null),
    ('Malia', 'White', 6, 5),
    ('Kiki', 'Lourd', 7, 1);
 
