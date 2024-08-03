import User from "../../../Model/User";
import connectDB from "../../lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  await connectDB();

  const { name, age } = req.body;

  const person = new User({
    name: name,
    age: age,
  });
  await person.save();
  console.log("inside api", name, age);
  res.status(200).json({ done: true });
}
