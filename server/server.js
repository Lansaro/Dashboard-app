require('dotenv').config();

const
    express = require('express'),
    cookieParser = require('cookie-parser'),
    app = express(),
    cors = require('cors');

require('./config/mongoose.config')(process.env.DB_NAME);

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json({limit: '50mb'}), express.urlencoded({ extended: true }));

require('./routes/user.routes')(app);
require('./routes/JSON.routes')(app);
require('./routes/graph.routes')(app);

app.listen(process.env.DB_PORT, () => console.log(`The server is running on ${process.env.DB_PORT}`));