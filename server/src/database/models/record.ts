import * as mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema.Types;
const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  categoryId: {
    type: ObjectId,
    required: true
  },
  userId: {
    type: ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Record', schema);
