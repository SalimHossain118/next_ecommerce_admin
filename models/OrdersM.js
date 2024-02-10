/** @format */

import { model, models, Schema, connection } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    phoneNo: String,
    email: String,
    street: String,
    city: String,
    pCode: String,
    conuntry: String,
    paid: Boolean,
  },
  { timestamps: true }
);

let OrderstModel;

try {
  // Check if the model already exists in the connection
  OrderstModel = connection.model("Orders");
} catch {
  // If the model doesn't exist, create it
  OrderstModel = model("Orders", OrderSchema);
}

export { OrderstModel };
