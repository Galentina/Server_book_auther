import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Model = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    book: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
      },
    ],
    bookSale: [
      {
        type: Number,
        required: false,
      },
    ],
    status: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  { timestamps: {} }
);

export default mongoose.model('Order', Model);
