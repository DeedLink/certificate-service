require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const certificateRoutes = require('./routes/certificateRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ service: 'certificate-service', status: 'ok' }));
app.use('/api/certificates', certificateRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB()
.then(() => {
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})
.catch((err) => {
console.error('Failed to start server:', err);
});
