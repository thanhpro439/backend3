import express from 'express';
import { createStorageEngine, createUploader, imageUpload } from '../controllers/uploadController.js';


const uploadRouters = express.Router();

const storage = createStorageEngine('./upload/image')
const upload = createUploader(storage)

// uploadRouters.use('/images', express.static('upload/images'));
uploadRouters.post('/', upload.single('product'), imageUpload )


export default uploadRouters