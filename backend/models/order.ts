import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  name: string;
  quantity: string;
  image: string;
  price: string;
}

interface IOrder extends Document {
  shippingInfo: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  orderItems: IOrderItem[];
  paymentInfo: {
    id: string;
    status: string;
    taxPaid: number;
    amountPaid: number;
  };
  orderStatus: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  shippingInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    taxPaid: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order as mongoose.Model<IOrder> ||
  mongoose.model<IOrder>("Order", orderSchema);
