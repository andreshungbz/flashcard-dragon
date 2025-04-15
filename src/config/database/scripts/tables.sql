-- tables.sql

-- Script that creates the necessary database table(s) and inserts example data.
-- This script is meant to be run after setup.sql and assumes the database and user exists.

\echo '\033[1;34m[PSQL] Creating Tables\033[0m'

CREATE TABLE set (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
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

-- AINT Course Codes

DO $$
DECLARE
    aint_cc_id UUID;
BEGIN
    
    INSERT INTO set (name, description)
    VALUES ('AINT Course Codes', 'Professional Core Courses for the University of Belize AINT program.')
    RETURNING id INTO aint_cc_id;

    INSERT INTO card (set_id, question, answer)
    VALUES
        (aint_cc_id, 'CMPS1134', 'Fundamentals of Computing'),
        (aint_cc_id, 'CMPS1131', 'Principles of Programming 1'),
        (aint_cc_id, 'CMPS1232', 'Principles of Programming 2'),
        (aint_cc_id, 'CMPS1211', 'Hardware Fundamentals'),
        (aint_cc_id, 'CMPS1171', 'Introduction to Databases'),
        (aint_cc_id, 'CMPS2131', 'Data Structures & Algorithms'),
        (aint_cc_id, 'CMPS2111', 'Systems Analysis & Design'),
        (aint_cc_id, 'CMPS2151', 'Web Development'),
        (aint_cc_id, 'CMPS1191', 'Networking Fundamentals'),
        (aint_cc_id, 'CMPS2212', 'GUI Programming'),
        (aint_cc_id, 'CMPS2232', 'Object Oriented Systems Development'),
        (aint_cc_id, 'CMPS2242', 'Systems Programming & Computer Organization'),
        (aint_cc_id, 'CMPS2992', 'Project');
END $$;

-- BINT Course Codes

DO $$
DECLARE
    bint_cc_id UUID;
BEGIN

    INSERT INTO set (name, description)
    VALUES ('BINT Course Codes', 'Professional Core Courses for the University of Belize AINT program.')
    RETURNING id INTO bint_cc_id;

    INSERT INTO card (set_id, question, answer)
    VALUES
        (bint_cc_id, 'CMPS3111', 'Programming Languages'),
        (bint_cc_id, 'CMPS3141', 'Human Computer Interface'),
        (bint_cc_id, 'CMPS3151', 'Telecommunications'),
        (bint_cc_id, 'CMPS3171', 'Network Design'),
        (bint_cc_id, 'CMPS3162', 'Advanced Databases'),
        (bint_cc_id, 'CMPS4131', 'Software Engineering'),
        (bint_cc_id, 'CMPS3252', 'Algorithms'),
        (bint_cc_id, 'CMPS4991', 'Senior Seminar in Information Technology'),
        (bint_cc_id, 'CMPS4232', 'Systems Administration'),
        (bint_cc_id, 'CMPS4191', 'Advanced Web Technologies'),
        (bint_cc_id, 'CMPS4181', 'Mobile Application Development'),
        (bint_cc_id, 'CMPS4171', 'Routing & Switching'),
        (bint_cc_id, 'CMPS4252', 'Digital Logic & Design'),
        (bint_cc_id, 'CMPS4251', 'Computer & Network Security'),
        (bint_cc_id, 'CMPS4081', 'Practical Electronics'),
        (bint_cc_id, 'CMPS4992', 'Professional Practice');

END $$;

-- American School Mascots

DO $$
DECLARE
    school_mascots_id UUID;
BEGIN

    INSERT INTO set (name, description)
    VALUES ('American School Mascots', 'Animal mascots for American schools.')
    RETURNING id INTO school_mascots_id;

    INSERT INTO card (set_id, question, answer)
    VALUES
        (school_mascots_id, 'Alabama', 'Elephant'),
        (school_mascots_id, 'Georgia', 'Bulldog'),
        (school_mascots_id, 'LSU', 'Tiger'),
        (school_mascots_id, 'Texas', 'Longhorn (Steer)'),
        (school_mascots_id, 'Florida', 'Alligator'),
        (school_mascots_id, 'Penn State', 'Nittany Lion'),
        (school_mascots_id, 'Auburn', 'Tiger'),
        (school_mascots_id, 'Tennessee', 'Bluetick Coonhound'),
        (school_mascots_id, 'Miami (FL)', 'Ibis (Water Bird)'),
        (school_mascots_id, 'Oregon', 'Duck'),
        (school_mascots_id, 'Clemson', 'Tiger'),
        (school_mascots_id, 'Texas A&M', 'Collie'),
        (school_mascots_id, 'Washington', 'Husky'),
        (school_mascots_id, 'Winsconsin', 'Badger'),
        (school_mascots_id, 'Arkansas', 'Razorback (Wild Boar)'),
        (school_mascots_id, 'Iowa', 'Hawk'),
        (school_mascots_id, 'North Carolina', 'Ram'),
        (school_mascots_id, 'Missouri', 'Tiger'),
        (school_mascots_id, 'South Carolina', 'Gamecock (Fighting Rooster)'),
        (school_mascots_id, 'UCLA', 'Bear'),
        (school_mascots_id, 'TCU', 'Horned Frog'),
        (school_mascots_id, 'Louisville', 'Cardinal (Bird)'),
        (school_mascots_id, 'Washington State', 'Cougar'),
        (school_mascots_id, 'Mississippi State', 'Bulldog'),
        (school_mascots_id, 'Kansas State', 'Wildcat'),
        (school_mascots_id, 'Minnesota', 'Gopher'),
        (school_mascots_id, 'Colorado', 'Buffalo'),
        (school_mascots_id, 'NC State', 'Wolf');

END $$;