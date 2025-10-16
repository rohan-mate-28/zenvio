import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  client: mongoose.Types.ObjectId;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  price: number;
  maintenanceAmount:number;
  status: "pending" | "in-progress" | "completed";
  startDate: Date;
  endDate?: Date;
  isMaintenanceActive: boolean;
}

const projectSchema = new Schema<IProject>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    liveUrl: String,
    githubUrl: String,
    price: {
      type: Number,
      required: true,
    },
     maintenanceAmount: {
      type: Number,
       
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
