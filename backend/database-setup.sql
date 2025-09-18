-- Database and Schema Setup for Hospital Appointment Management System
-- This script only creates the database and schemas. JPA will handle table creation.

-- Create the main database
CREATE DATABASE managing_medical_appointments;

-- Connect to the database
\c managing_medical_appointments;

-- Create schemas
CREATE SCHEMA IF NOT EXISTS patients_schema;
CREATE SCHEMA IF NOT EXISTS doctors_schema;
CREATE SCHEMA IF NOT EXISTS appointments_schema;
CREATE SCHEMA IF NOT EXISTS parameterization_schema;
CREATE SCHEMA IF NOT EXISTS security_schema;

-- Grant permissions to postgres user
GRANT ALL PRIVILEGES ON DATABASE managing_medical_appointments TO postgres;
GRANT ALL ON SCHEMA patients_schema TO postgres;
GRANT ALL ON SCHEMA doctors_schema TO postgres;
GRANT ALL ON SCHEMA appointments_schema TO postgres;
GRANT ALL ON SCHEMA parameterization_schema TO postgres;
GRANT ALL ON SCHEMA security_schema TO postgres;

-- Create user with password 3427 if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
      CREATE ROLE postgres LOGIN PASSWORD '3427';
   END IF;
END
$$;

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON DATABASE managing_medical_appointments TO postgres;