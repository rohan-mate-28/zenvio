import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: number;
  role: "admin" | "client";
  googleId?: string;
  comparePassword: (clientPassword: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Number is required"],
    },
    password: {
      type: String,
      required: function (this: IUser): boolean {
        return !this.googleId;
      },
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  clientPassword: string
): Promise<boolean> {
  return await bcrypt.compare(clientPassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
