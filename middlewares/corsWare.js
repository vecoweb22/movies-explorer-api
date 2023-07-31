const allowedCorsOrigins = [
  'https://api.vecowebmovies.nomoreparties.sbs',
  'http://api.vecowebmovies.nomoreparties.sbs',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3000',
];

const corsOptions = {
  credentials: true,
  origin: allowedCorsOrigins,
  optionsSuccessStatus: 200,
  exposedHeaders: ['set-cookie'],
};

const corsWare = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const allowedMethod = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethod);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    if (allowedCorsOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    return res.end();
  }

  return next();
};

module.exports = {
  corsOptions,
  corsWare,
};
