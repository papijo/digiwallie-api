import mongoose, { Schema } from "mongoose";

interface PaymentProcessor {
  name: string;
  charge: number;
}

const PaymentProcessorSchema: Schema = new Schema<PaymentProcessor>(
  {
    name: { type: String, required: true },
    charge: { type: Number, required: true },
  },

  { timestamps: true }
);

const PaymentProcessorModel = mongoose.model(
  "PaymentProcessor",
  PaymentProcessorSchema
);

export default PaymentProcessorModel;
