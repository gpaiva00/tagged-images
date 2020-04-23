const express = require('express');
const ImageController = require('./controllers/Image');
const PresentationController = require('./controllers/Presentation');
const UploadController = require('./controllers/Upload');
const TagController = require('./controllers/Tag');

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

// presnetation
routes.post('/presentation', PresentationController.create);
routes.get('/download/:fileName', PresentationController.download);

// tags
routes.get('/tags', TagController.index);
routes.post('/tags', TagController.create);
routes.delete('/tags/:id', TagController.delete);

module.exports =  routes;