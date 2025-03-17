import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

console.log('Loading environment variables...');

const appConfig = process.env;

class Database {

  static dbInstance = new Sequelize({
    "host": appConfig.MYSQL_HOST,
    "database": appConfig.MYSQL_DB,
    "username": appConfig.MYSQL_USER,
    "password": appConfig.MYSQL_PASS,
    "dialect": "mysql",
    //logging: true,
    logging: (sql, queryObject) => {
  
    },
    "pool": {
      "max": parseInt(appConfig.MYSQL_POOL_MAX || 10),
      "min": parseInt(appConfig.MYSQL_POOL_MIN || 0),
      "acquire": parseInt(appConfig.MYSQL_POOL_ACQUIRE || 3600),
      "idle": parseInt(appConfig.MYSQL_POOL_IDLE || 1000)
    }
  
  });

  
  static async connect() {

    try {


    console.log('Connecting to the database...');

       Database.dbInstance.authenticate({ logging: false }).then(() => {
        console.log('Connection has been established successfully.');
      }).catch(err => {
        console.error('Unable to connect to the database:', err);
      })

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    
  }
  
  static getInstance()
  {
    return Database.dbInstance;
  }
}

export default Database;
