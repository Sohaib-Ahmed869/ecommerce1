import connectToDb from "../../utils/db";
import User from "../../Models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDb();
  const body = await req.json();
  const { name, password, email, address } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }));
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      addresses: [address],
    });
    await user.save();
    return new Response(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify({ message: "User not created" }));
  }
}
