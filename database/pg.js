import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgres://zguqvjye:k9rmp_Yfvsmtn9rWCt4JlDX-F7tL7RkV@snuffleupagus.db.elephantsql.com/zguqvjye",
});

export default pool;
