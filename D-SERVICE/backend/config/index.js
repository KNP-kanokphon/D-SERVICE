module.exports = {
  dbDev: {
    HOST: "192.168.31.24",
    USER: "kitti",
    PASSWORD: "password",
    DB: "osd_dservice",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    PORT: 3306,
  },
  jwtConfig: {
    secretKey: "osd",
    timeExpired: 6000, //seconds
  },
  Local: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "osd_dservice",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    PORT: 3306,
  }
};
