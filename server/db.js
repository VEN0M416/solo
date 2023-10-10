const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'root',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'achepodz'
});

module.exports = pool;