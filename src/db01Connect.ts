import * as Sequelize from "sequelize";

// see http://docs.sequelizejs.com/manual/installation/getting-started

// mysql> CREATE DATABASE IF NOT EXISTS db01Connect DEFAULT CHARACTER SET utf8;
// mysql> GRANT ALL ON db01Connect.* to nodesample@localhost IDENTIFIED BY 'thepassword';
// mysql> FLUSH PRIVILEGES;

const sequelize = new Sequelize( "db01Connect" , "nodesample", "thepassword", {
    host: "localhost",
    dialect: "mysql",   // 'mysql'|'sqlite'|'postgres'|'mssql'
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
});


sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });