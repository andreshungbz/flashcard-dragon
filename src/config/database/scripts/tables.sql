-- tables.sql

-- Script that creates the necessary database table(s) and inserts example data.
-- This script is meant to be run after setup.sql and assumes the database and user exists.

\echo '\033[1;34m[PSQL] Creating Tables\033[0m'

CREATE TABLE set (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE card (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    set_id UUID REFERENCES set(id) ON DELETE CASCADE,
    sequence SERIAL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

\echo '\033[1;34m[PSQL] Inserting Example Data\033[0m'

DO $$
DECLARE
    it_cc_id UUID;
BEGIN
    -- insert example set(s)

    INSERT INTO set (name, description)
    VALUES ('IT Course Codes', 'Professional Core Courses for University of Belize AINT program.')
    RETURNING id INTO it_cc_id;

    -- insert cards associated with the captured set id

    INSERT INTO card (set_id, question, answer)
    VALUES
        (it_cc_id, 'CMPS1134', 'Fundamentals of Computing'),
        (it_cc_id, 'CMPS1131', 'Principles of Programming 1'),
        (it_cc_id, 'CMPS1232', 'Principles of Programming 2'),
        (it_cc_id, 'CMPS1211', 'Hardware Fundamentals'),
        (it_cc_id, 'CMPS1171', 'Introduction to Databases'),
        (it_cc_id, 'CMPS2131', 'Data Structures & Algorithms'),
        (it_cc_id, 'CMPS2111', 'Systems Analysis & Design'),
        (it_cc_id, 'CMPS2151', 'Web Development'),
        (it_cc_id, 'CMPS1191', 'Networking Fundamentals'),
        (it_cc_id, 'CMPS2212', 'GUI Programming'),
        (it_cc_id, 'CMPS2232', 'Object Oriented Systems Development'),
        (it_cc_id, 'CMPS2242', 'Systems Programming & Computer Organization'),
        (it_cc_id, 'CMPS2992', 'Project');
END $$;