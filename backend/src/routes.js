import express from 'express';
import ImageController from '@controllers/Image';
import UploadController from '@controllers/Upload';
import TagController from '@controllers/Tag';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello' });
});

// images
routes.get('/images', ImageController.index);
routes.post('/images', ImageController.create);
routes.post('/images/upload', UploadController.upload);
routes.put('/images/:id', ImageController.update);
routes.delete('/images/:id', ImageController.delete);

// tags
routes.get('/tags', TagController.index);
routes.post('/tags', TagController.create);
routes.delete('/tags/:id', TagController.delete);

export default routes;