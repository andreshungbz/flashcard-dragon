-- setup.sql

-- Script that creates a PostgreSQL database and user for the project.
-- This script is meant to be run with the psql PostgreSQL client.
-- The user running the script must have the CREATEROLE and CREATEDB attributes.
-- https://www.postgresql.org/docs/17/sql-createrole.html

\echo '\n\033[1;31m[PSQL] Dropping Database\033[0m'
DROP DATABASE IF EXISTS flashcard_dragon;
DROP USER IF EXISTS fcd_user;

\echo '\033[1;34m[PSQL] Creating Database\033[0m'
CREATE USER fcd_user WITH CREATEDB PASSWORD 'swordfish';
GRANT fcd_user TO CURRENT_USER;
CREATE DATABASE flashcard_dragon OWNER fcd_user;
