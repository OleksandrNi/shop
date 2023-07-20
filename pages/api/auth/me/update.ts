import nc from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authControllers";
import onError from "@/backend/middlewares/errors";
import upload from "@/backend/utils/multer";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");
console.log('uploadMiddleware',uploadMiddleware)

handler.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default handler;
