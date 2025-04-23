![Flashcard Dragon Header](assets/header.png)

# 🐉 Flashcard Dragon

Flashcard Dragon is a personal, self-hosted flashcard creator and study tool. The web application uses Node.js, Express.js, TypeScript, and PostgreSQL.

## Project Features

### Semester Project Requirements

- CRUD operations for flashcards
- Study interface with flip-style animations, set study progress, and flashcard navigation buttons
- Persistent flashcard storage using PostgreSQL

### Additionally Implemented Features

- CRUD operations for flashcard sets
- Flashcard shuffle
- Study a random flashcard set

## Additional Resources

- [Google Slides Presentation](https://docs.google.com/presentation/d/1PDnU__wb4es-s9-fmoOAFeSx_LbUgAsjoR2lq4ACaLU/edit?usp=sharing)

## Running The Application

> [!NOTE]
> These instructions assume you use a UNIX-like operating system (Linux, macOS, etc.). If you are using Windows, you may need to adjust the commands accordingly.

### Prerequisites

- `git` command line tool
- Latest LTS version of [Node.js](https://nodejs.org/en)
- Locally running [PostgreSQL](https://www.postgresql.org/) server

  - `postgres` user with superuser privileges
  - `postgres` default database

### Initial Setup

1. Clone the repository.

```
git clone https://github.com/andreshungbz/flashcard-dragon.git
```

2. Change the directory to the project folder.

```
cd flashcard-dragon
```

3. Create a copy of `.env.example` with the name `.env`.

> [!WARNING]
> This step uses the default provided credentials and settings and is provided for development and testing purposes only.

```
cp .env.example .env
```

4. Install the Node.js dependencies.

```
npm install
```

### Database Setup

> [!NOTE]
> These steps set up a database with predetermined names and credentials and insert example data. The scripts executed can be examined in the `package.json` file and the `src/config/database/scripts` folder.

> [!IMPORTANT]
> Depending on your host-based configuration settings on PostgreSQL, you may be asked for a password. The default password for `fcd_user` is `swordfish`. The script also assumes the default `postgres` database is available.

<details>
  <summary>Script Method (quicker but may require changing PostgreSQL setting)</summary>

> [!IMPORTANT]
> The scripts will only work if your PostgreSQL host-based authentication configuration setting is set to `md5` or `scram-sha-256`.

### Update PostgreSQL HBA Configuration

1. Log in to `psql` as the `postgres` superuser and run the following command to find the location of your PostgreSQL host-based authentication configuration file.

```
SHOW hba_file;
```

2. Return to your terminal and open the file in the `nano` text editor.

```
sudo nano {YOUR_HBA_FILE_LOCATION}
```

3. For the `local` unix socket connections row as well as any rows concerning `postgres`, change the `METHOD` to `md5` or `scram-sha-256` (better). It should look like this:

```
# Database administrative login by Unix domain socket
local   all             postgres                                scram-sha-256

# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     scram-sha-256
```

4. Save the file, then restart the PostgreSQL server daemon:

```
sudo systemctl restart postgresql
```

5. In the terminal, run the following command to execute the database scripts:

```
npm run dbinitiate
```

</details>

<details>
  <summary>Manual Method</summary>

> [!IMPORTANT]
> Make sure you're in the project root directory.

1. Log in to `psql` as the `postgres` superuser and paste the following in the `psql` prompt.

```
\i ./src/config/database/scripts/setup.sql
```

2. Connect in the new database.

```
\c flashcard_dragon postgres
```

3. Create the tables and example data.

```
\i .src/config/database/scripts/tables.sql
```

</details>

### Start the Application

1. Run the development server with the following command:

```
npm run dev
```

2. Open the address printed in the terminal in the web browser. You can also navigate to `http://localhost:3000`.

## Tests

Simple tests using `vitest` exist to verify certain responses from specific form input data and utility functions. The tests can be examined in the `tests` folder. To run the tests, run the following command while the server is running in another terminal window:

> [!NOTE]
> The form input tests will fail if the server is not running.

```
npm test
```

## Notes

- Some application settings can be changed in the `src/config/settings.ts` file.
- This is the semester final project web application for the CMPS2212 GUI Programming course at the University of Belize, completed in the 2024-2 semester.

## License & Attributions

- Favicon dragon icon is copyright 2020 Twitter, Inc., and other contributors. The graphics are licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). No modifications were made to the original image.
- The source code for this project is licensed under the [MIT License](LICENSE).
- All other graphics are © 2025 Andres Hung and licensed under the [CC-BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).
