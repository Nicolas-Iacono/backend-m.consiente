const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'dbmconsiente',
  process.env.DB_USER || 'dbmconsiente_user',
  process.env.DB_PASSWORD || 'IoDBzEDG27vbaT0eOuPI8ykqBFtkLF4H',
  {
    host: process.env.DB_HOST || 'dpg-cqkj9ml6l47c73860emg-a.ohio-postgres.render.com',
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, dialectOptions: {
      ssl: {
        require: true, // Esto es importante si tu base de datos requiere SSL
        rejectUnauthorized: false // Dependiendo de la configuración de SSL, podrías necesitar esto
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });

// Función para probar la conexión
const connDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión con base de datos exitosa');
  } catch (error) {
    console.log('Error de conexión con base de datos:', error);
  }
};

// Ejecutar la función de prueba de conexión
connDB();

// Exportar la instancia de Sequelize
module.exports = sequelize;
