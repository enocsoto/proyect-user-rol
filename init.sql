SELECT 'CREATE DATABASE RolesUsers'
WHERE NOT EXISTS (SELECT FROM RolesUsers WHERE datname = 'RolesUsers')\gexec