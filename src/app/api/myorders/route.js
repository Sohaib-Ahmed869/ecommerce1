import connectToDb from "../../utils/db";
import Order from "../../Models/Order";
const jwt = require("jsonwebtoken");


export async function POST (req) {
    await connectToDb();
    const body = await req.json();
    const {token} = body;
    const decoded = jwt.verify(token, "secret");
    const user_id = decoded.in;
    const orders = await Order.find({ user_id });
    return new Response(JSON.stringify(orders));
}

export async function PUT (req) {
    await connectToDb();
    const body = await req.json();
    const { id, status } = body;
    await Order.findByIdAndUpdate(id, { status });
    return new Response(JSON.stringify({ status: 200 }));
}

