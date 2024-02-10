/** @format */
import { mongooseConnect } from "@/lib/mongoose";
import { OrderstModel } from "@/models/OrdersM";

export default async function handler(req, res) {
  await mongooseConnect();
  res.json(await OrderstModel.find().sort({ createdAt: -1 }));
}
