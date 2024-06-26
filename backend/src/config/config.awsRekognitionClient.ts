import { RekognitionClient } from '@aws-sdk/client-rekognition';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

const REGION = process.env.AWS_REGION;

export const rekognition = new RekognitionClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
