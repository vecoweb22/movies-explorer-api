const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { corsOptions } = require('./middlewares/corsWare');
const { limiter } = require('./middlewares/rateLimit');

const app = express();
const { routers } = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const defaultError = require('./middlewares/defaultError');

const { PORT, DB_URI } = require('./utils/config');

mongoose.connect(DB_URI, { useNewUrlParser: true });
app.use(cors(corsOptions));
app.listen(PORT, () => { });
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(routers);

app.use(errorLogger);
app.use(defaultError);
app.use(errors({ message: 'Ошибка валидации' }));
