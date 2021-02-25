import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Model = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
      },
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false,
      },
    ],
    sale: {
      type: Number,
      required: false,
    },
    cost: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  { timestamps: {} }
);

export default mongoose.model('Book', Model);
