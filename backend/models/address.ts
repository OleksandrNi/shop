import mongoose, { Document, Schema } from "mongoose";

interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Address as mongoose.Model<IAddress> ||
  mongoose.model<IAddress>("Address", addressSchema);
