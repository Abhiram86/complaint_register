import mongoose from "mongoose";

interface Complaint {
  title: string;
  description: string;
  category: "Product" | "Service" | "Support" | "Security" | "Other";
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Resolved";
  user: mongoose.Types.ObjectId;
  dateSubmitted: Date;
}

const complaintSchema = new mongoose.Schema<Complaint>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Product", "Service", "Support", "Security", "Other"],
    required: true,
  },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    required: true,
    default: "Pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateSubmitted: { type: Date, required: true, default: Date.now },
});

export const Complaint =
  mongoose.models.Complaint ||
  mongoose.model("Complaint", complaintSchema, "complaints");
