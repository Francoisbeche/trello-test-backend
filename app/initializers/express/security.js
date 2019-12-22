import cors from 'cors';
import rateLimit from 'express-rate-limit';

class Security {
  static setSecurity(app) {
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });

    app.use(
      cors({
        origin: [
          'http://localhost:8081',
          'http://localhost:8081/*',
          'localhost:*/*',
          'http://localhost:3000',
          'http://localhost:3000/*',
          'http://localhost:3001',
          'http://localhost:3001/*'
        ]
      })
    );

    //app.set(helmet());

    app.enable('trust proxy');

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: global.env.request_restrictions.request_limit // limit each IP to 100 requests per windowMs
    });

    app.use(limiter);
  }
}

export default Security;
