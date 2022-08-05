export const s3Config = {
  bucketName: process.env.APP_BUCKET_NAME ?? "",
  region: process.env.APP_REGION ?? "",
  accessKeyId: process.env.APP_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.APP_SECRET_ACCESS_KEY ?? "",
  s3Url: process.env.APP_S3URL ?? "",
};
