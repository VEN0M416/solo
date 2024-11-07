const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'aks301202',
    host: 'localhost',
    port: 5432,
    database: 'achepodz'
});

module.exports = pool;