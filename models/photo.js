const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const photoSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

photoSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

photoSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3.eu-central-1.amazonaws.com/ga-w05d03/${this.image}`;
  });

photoSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

photoSchema.pre('remove', function removeImage(next) {
  if(this.image) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('Photo', photoSchema);
