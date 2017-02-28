import pgSession from 'connect-pg-simple';
import pg from 'pg';
import session from 'express-session';
import config from '../config.json';

pg.defaults.ssl = true;
const pgSessionInstance = pgSession(session);

export default () => {
  return session({
    store: new pgSessionInstance({
      pg,
      conString: config.dbUrl,
      tableName: 'session'
    }),
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    ssl: true,
    native: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true
      //, secure: true // only when on HTTPS
    }
  });
}
