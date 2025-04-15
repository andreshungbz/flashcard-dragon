// connection.ts
// configuration of the PostgreSQL client and connection pool

import pg from 'pg';
import appconfig from '../settings.js';

// create the connection pool
const pool = new pg.Pool(appconfig.db);

// test the connection
pool.connect((err, _client, release) => {
  if (err) {
    return console.error(
      `${appconfig.abbreviation} Error Acquiring Database Client`,
      err.stack
    );
  }

  console.log(`${appconfig.abbreviation} Connected to PostgreSQL Database`);
  release();
});

// check for errors
pool.on('error', (err) => {
  console.error(
    `${appconfig.abbreviation} Unexpected Database Client Error`,
    err
  );
  process.exit(-1);
});

// use a function wrapper to make queries
export const query = async (
  text: string,
  params?: Array<string | number | null>
): Promise<pg.QueryResult<any>> => {
  return await pool.query({
    text,
    values: params,
  });
};

export default pool;
