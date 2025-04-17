# 🐉 Flashcard Dragon

Flashcard Dragon is a personal, self-hosted flashcard creator service and study tool.

## Project Features

### Semester Project Requirements

- CRUD operations for flashcards
- Study interface with flip-style animations, set study progress, and flashcard navigation buttons
- Persistent flashcard storage using PostgreSQL

### Additionally Implemented Features

- CRUD operations for flashcard sets
- Flashcard shuffle
- Study a random flashcard set

## Running The Application

These instructions assume you use a UNIX-like operating system (Linux, macOS, etc.). If you are using Windows, you may need to adjust the commands accordingly.

### Prerequisites

- `git` command line tool
- Latest LTS version of [Node.js](https://nodejs.org/en)
- Locally running [PostgreSQL](https://www.postgresql.org/) server

  - `postgres` user with superuser privileges

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

> [!WARNING]
> These steps set up a database with predetermined names and credentials and insert example data.

> [!NOTE]
> Depending on your host-based configuration settings on PostgreSQL, you may be asked for a password. The default password for `fcd_user` is `swordfish`. The script also assumes a `postgres` user with superuser privileges is accessible. Users can change it in the `package.json` file with the CREATEROLE and CREATEDB attributes.

1. Run the following script:

```
npm run dbinitiate
```

### Start the Application

1. Run the development server with the following command:

```
npm run dev
```

2. Open the address printed in the terminal in the web browser. You can also navigate to `http://localhost:3000`.

## Tests

Simple tests using `vitest` exist to test certain form input data and the utility functions. The tests can be examined in the `tests` folder. To run the tests, run the following command while the server is running in another terminal window:

> [!NOTE]
> The form input tests will fail if the server is not running.

```
npm test
```

## Notes

- Some application settings can be changed in the `src/config/settings.ts` file.
- This is the semester final project web application for the CMPS2212 GUI Programming course at the University of Belize, completed in the 2024-2 semester.

## Attributions

Favicon dragon icon is copyright 2020 Twitter, Inc., and other contributors. The graphics are licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). No modifications were made to the original image.
