import mongoose, { Schema, Types } from "mongoose";

interface Account {
  accountNumber: string;
  owner: Types.ObjectId;
  balance: number;
}

const AccountSchema: Schema = new Schema<Account>(
  {
    accountNumber: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

const AccountModel = mongoose.model("Account", AccountSchema);

export default AccountModel;
