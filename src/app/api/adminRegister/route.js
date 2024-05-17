import connectToDb from "../../utils/db";
import Admin from "../../Models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDb();
  const body = await req.json();
  const { name, password, email, phone } = body;
  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }));
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();
    return new Response(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify({ message: "User not created" }));
  }
}
