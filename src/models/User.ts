import mongoose, { Schema, Types } from "mongoose";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar?: string;
  accounts: Types.Array<string>;
}

const UserSchema: Schema = new Schema<User>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    accounts: { type: [], required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
