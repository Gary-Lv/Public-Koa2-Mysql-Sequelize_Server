module.exports = {
  // 数据库基本连接配置
  database: "smxhx_data",
  username: "root",
  password: "mysql123456",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00' //东八时区
};
