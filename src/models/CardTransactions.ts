import mongoose, { Schema } from "mongoose";

interface CardTransaction {
  externalReference: string;
}

const CardTransactionSchema: Schema = new Schema<CardTransaction>(
  { externalReference: { type: String, required: true } },
  { timestamps: true }
);

const CardTransactionModel = mongoose.model(
  "CardTransaction",
  CardTransactionSchema
);

export default CardTransactionModel;
