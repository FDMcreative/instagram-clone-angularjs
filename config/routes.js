const router = require('express').Router();
const photos = require('../controllers/photos');
const auth = require('../controllers/auth');
const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');

router.route('/photos')
  .get(photos.index)
  .post(secureRoute, imageUpload, photos.create);

router.route('/photos/:id')
  .get(photos.show)
  .delete(secureRoute, photos.delete);

router.route('/photos/:id/comments')
  .post(secureRoute, photos.addComment);

router.route('/photos/:id/comments/:commentId')
  .delete(secureRoute, photos.deleteComment);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
