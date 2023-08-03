const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// set up port
const PORT = process.env.PORT || 3000;
app.use(express.json({limit: '50mb'}));
app.use(cors());

// add routes
const router = require('./routes/router.js');
app.use('/api', router);

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
