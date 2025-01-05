
import nodemailer, { TransportOptions } from "nodemailer";
import { connect } from 'imap-simple';
import { simpleParser } from 'mailparser';
import { v4 as uuidv4 } from 'uuid';
import { setValue} from "node-global-storage";
import config from "../../config/index";


interface EmailInfo {
    send_email: string;
    receive_email: string;
    subject: string;
    text: string;
}

export const emailSendToUser = async (emailInfo : EmailInfo)=>{
    try{

             const conversationId = uuidv4();
              setValue('emailInfo', {
              send_email:   emailInfo.send_email,
              receive_email:   emailInfo.receive_email,
              transactionId: conversationId,
              });

              const transporter = nodemailer.createTransport({
                host: config.Email_SMTP_HOST ,
                port: config.Email_SMTP_PORT,
                secure: true,
                 auth: {
                     user: config.Email_EMAIL_USER,
                     pass: config.Email_EMAIL_PASS
               }
             }as TransportOptions)
         
         
             const info = await transporter.sendMail({
              from: config.Email_EMAIL_USER,
              to: emailInfo.receive_email,
              subject: emailInfo.subject,
              text: `${emailInfo.text}\n\n[Conversation ID: ${conversationId}]`,
              html: `${emailInfo.text}<br><br><small>[Conversation ID: ${conversationId}]</small>`,
              });
        
        return true;

    }catch(error){
        console.error(error);
        return error ;
    }
}




export const getEmailFromUser = async () => {
  try {
    // IMAP configuration
    const imapConfig = {
      imap: {
        user: config.Email_EMAIL_USER || "",
        password: config.Email_EMAIL_PASS || "",
        host: config.Email_IMAP_HOST || "",
        port: Number(config.Email_IMAP_PORT) || 0,
        tls: true,
        authTimeout: 3000,
      },
    };

    // Establish connection
    const connection: any = await connect(imapConfig);
    await connection.openBox('INBOX');

    // Search for unread emails
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: '', markSeen: true };
    const messages = await connection.search(searchCriteria, fetchOptions);

    // Process each message
    for (const message of messages) {
      const parsed = await simpleParser(message.parts[0].body);

      // Extract relevant data
      const messageId = parsed.headers.get('message-id');
      const inReplyTo = parsed.headers.get('in-reply-to');
      const references = parsed.headers.get('references');
      const conversationIdMatch = parsed.text?.match(/\[Conversation ID: (.+?)\]/);
      const conversationId = conversationIdMatch ? conversationIdMatch[1] : undefined;

      const from = parsed.from?.text || 'Unknown Sender';
      const subject = parsed.subject || 'No Subject';
      const body = parsed.text || 'No Body';

      // Validate extracted data
      if (conversationId && messageId && inReplyTo && references) {
        // Return the valid email data
        connection.end();
        return {
          conversaction_id: conversationId,
          senderEmail: from,
          subject: subject,
          body: body,
        };
      }
    }

    // No valid emails found
    connection.end();
    return false;
  } catch (error) {
    console.error('Error fetching emails:', error);
    return false; // Return false if an error occurs
  }
};
