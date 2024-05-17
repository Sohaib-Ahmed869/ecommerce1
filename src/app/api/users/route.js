import connectToDb from "../../utils/db";
import User from "../../Models/User";

export async function GET(req) {
  await connectToDb();
  const users = await User.find();
    return new Response(JSON.stringify(users));
}

export async function PUT(req) {
  await connectToDb();
  const body = await req.json();
  const { id, blocked } = body;
  await User.findByIdAndUpdate(id, { blocked });
  return new Response(JSON.stringify({ status: 200 }));
}
