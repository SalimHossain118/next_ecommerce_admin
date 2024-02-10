/** @format */
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
const bucketName = "ecommerce1181";
await mongooseConnect();
// await isAdminRequest(req, res);

export default async function UploadController(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SCREET_ACCESS_KEY,
    },
  });
  const links = [];
  for (const file of Object.values(files)) {
    for (const singleFile of file) {
      const exisitingFileName = singleFile.originalFilename.split(".").pop();
      const newFileName = Date.now() + "." + exisitingFileName;
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName, // 'Key' should be used instead of 'key'
          Body: fs.readFileSync(singleFile.path),
          ACL: "public-read",
          ContentType: mime.lookup(singleFile.path),
        })
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
      links.push(link);
      console.log("File Link:", link);
    }
  }

  return res.json({ links });
} // UploadController=> end

export const config = {
  api: { bodyParser: false },
};
