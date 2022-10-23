import mongoose, { Date, Schema, Types } from "mongoose";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar?: string;
  accounts: Types.Array<string>;
  isAdmin: boolean;
  isStaff: boolean;
  isUser: boolean;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenDateTime: Date;
  passwordResetToken: string;
  passwordResetTokenExpiryDate: Date;
  loginCountCollection: Types.Array<Date>;
}

const UserSchema: Schema = new Schema<User>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    accounts: { type: [], required: true },
    isUser: { type: Boolean, default: true, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isStaff: { type: Boolean, default: false, required: true },
    isVerified: { type: Boolean, default: false, required: true },
    verificationToken: { type: String },
    verificationTokenDateTime: { type: Date },
    passwordResetToken: { type: String },
    passwordResetTokenExpiryDate: { type: Date },
    loginCountCollection: { type: [] },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
