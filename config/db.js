let MYSQL_CONF;

if (process.env.NODE_ENV === 'development') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'guard',
    port: 3306,
  };
} else {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'guard',
    password: 'FDwPJnETHtcNawYx',
    database: 'guard',
    port: 3306,
  };
}

module.exports = MYSQL_CONF;
