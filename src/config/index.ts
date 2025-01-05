
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join((process.cwd(),".env"))});

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    SECRECT_KEY : process.env.JWT_SECRET_KEY,

    Email_IMAP_PORT : process.env.IMAP_PORT,
    Email_IMAP_HOST : process.env.IMAP_HOST,

    Email_SMTP_PORT : process.env.SMTP_PORT,
    Email_SMTP_HOST : process.env.SMTP_HOST,
    
    Email_EMAIL_USER : process.env.EMAIL_USER,
    Email_EMAIL_PASS : process.env.EMAIL_PASS,

    SERVER_END_POINT :  process.env.SERVER_END_POINT,
}

