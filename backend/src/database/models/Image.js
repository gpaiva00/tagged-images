import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  image: { type: Object, required: true },
  tags: [String],
  selected: { type: Boolean, default: false }
}, {
  timestamps: true,
});

export default mongoose.model('Images', ImageSchema);