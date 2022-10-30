import multer from 'multer';
import { NextApiRequest } from 'next';

export type SuccessfulResponse<T> = { data: T; error?: never; statusCode?: number };
export type UnsuccessfulResponse<E> = { data?: never; error: E; statusCode?: number };
export type ApiResponse<T, E = unknown> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;
export type ResponseData = ApiResponse<string[], string>;
export interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}


export const outputFolderName = './public/uploads';

export const upload = multer({
  storage: multer.diskStorage({
    destination: outputFolderName,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

