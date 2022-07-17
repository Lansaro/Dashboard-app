const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}), express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/JSON.routes')(app);
require('./routes/graph.routes')(app);

app.listen(8000, () => console.log('The server is all fired up on port 8000'));