const Photo = require('../models/photo');

function indexRoute(req, res, next) {
  Photo
    .find()
    .populate('createdBy')
    .exec()
    .then((photos) => res.json(photos))
    .catch(next);
}

function createRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;

  Photo
    .create(req.body)
    .then((photo) => res.status(201).json(photo))
    .catch(next);
}

function showRoute(req, res, next) {
  Photo
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((photo) => {
      if(!photo) return res.notFound();

      res.json(photo);
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  Photo
    .findById(req.params.id)
    .exec()
    .then((photo) => {
      if(!photo) return res.notFound();

      return photo.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addCommentRoute(req, res, next) {
  req.body.createdBy = req.user;
  // being embedded, the comment will be attached to a photo
  Photo
    .findById(req.params.id)
    .exec()
    .then((photo) => {
      if(!photo) return res.notFound();

      const comment = photo.comments.create(req.body);
      photo.comments.push(comment);

      return photo.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Photo
    .findById(req.params.id)
    .exec()
    .then((photo) => {
      if(!photo) return res.notFound();

      const comment = photo.comments.id(req.params.commentId);
      comment.remove();

      return photo.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  delete: deleteRoute,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute
};
