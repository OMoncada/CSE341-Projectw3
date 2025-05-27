const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const swagger = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('🎉 Bienvenido a la API de Productos y Marcas');
});

// Documentación Swagger
swagger(app);

// Rutas API
app.use('/products', require('./routes/product'));
app.use('/brands', require('./routes/brand')); // ⬅️ nueva ruta agregada

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB con Mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB con Mongoose');
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
  });
