// models/customer.model.ts
import mongoose, { Document, Schema } from "mongoose";

interface Measure {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
  has_confirmed: boolean;
  image_url: string;
}

interface Customer extends Document {
  customer_code: string;
  measures: Measure[];
}

const measureSchema = new Schema<Measure>({
  measure_uuid: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
  has_confirmed: { type: Boolean, required: true },
  image_url: { type: String, required: true },
});

const customerSchema = new Schema<Customer>({
  customer_code: { type: String, required: true, unique: true },
  measures: [measureSchema],
});

const CustomerModel = mongoose.model<Customer>("Customer", customerSchema);

export default CustomerModel;
