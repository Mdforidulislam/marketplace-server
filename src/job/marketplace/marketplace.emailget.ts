
import cron from 'node-cron';
import axios from 'axios';
import logger from '../../utils/logger/logger';
import config from '../../config';


export const scheduleGetEmailJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      // Make an HTTP request to the route
      const response = await axios.post(`${config.SERVER_END_POINT}/api/v1/get-email`, {});

      logger.info('Cron job executed successfully:', response.data);
    } catch (error) {
      logger.error('Error in /get-email cron job:', (error as any).message);
    }
  });
};
