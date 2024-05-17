import connectToDb from '../../utils/db';
import User from '../../Models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(req) {
    await connectToDb();
    const body=await req.json();
    const { password,email } = body;
    const existingUser = await User.findOne
    ({ email });
    if (!existingUser) {
        return new Response(JSON.stringify({ message: 'User not found' }))
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return new Response(JSON.stringify({ message: 'Invalid password' }))
    }
    const token = jwt.sign({ email: existingUser.email,in:existingUser._id }, 'secret');
    const name = existingUser.name;
    return new Response(JSON.stringify({ token,name }))

}


