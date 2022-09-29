import mongoose, { Schema, Types } from "mongoose";

enum Type {
  debit = "debit",
  credit = "credit",
}

enum Purpose {
  deposit = "deposit",
  transfer = "transfer",
  reversal = "reversal",
}

interface Transaction {
  transactionType: Type;
  account_id: Types.ObjectId;
  purpose: Purpose;
  amount: number;
  balance_before: number;
  balance_after: number;
  metadata: object;
  reference: string;
}

const TransactionSchema: Schema = new Schema<Transaction>(
  {
    transactionType: { type: String, required: true },
    account_id: { type: Schema.Types.ObjectId, ref: "Account" },
    purpose: { type: String, required: true },
    amount: { type: Number, required: true },
    balance_before: { type: Number, required: true },
    balance_after: { type: Number, required: true },
    metadata: { Object, required: true },
    reference: { type: String, required: true },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;
