const dev = process.env.NODE_ENV !== 'production';

export const hostURL = dev ? 'http://localhost:2930' : 'https://www.reformedalloy.com';

export const bucketName = 'reformed-alloy';
export const bucketRegion = 'us-east-1';