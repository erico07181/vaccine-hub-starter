\echo 'Delete and recreate db?';
\prompt 'Return for yes or control-C to cancel > ' answer;

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

\i vaccine-hub-schema.sql