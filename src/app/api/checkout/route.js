import connectToDb from "../../utils/db";
import Order from "../../Models/Order";
const jwt = require("jsonwebtoken");


export async function GET(req) {
    await connectToDb();
    const orders = await Order.find();
    return new Response(JSON.stringify(orders));
    }

export async function POST(req) {
    await connectToDb();
    const body = await req.json();
    const {cart, total, status, payment_method, address, token } = body;
    //get user_id from token
    console.log(token);
    const decoded = jwt.verify(token, "secret");
    const user_id = decoded.in;

    


    const order = new Order({
        user_id: user_id,
        order: cart,
        total,
        status,
        payment_method,
        address,
    });
    await order.save();
    return new Response(JSON.stringify({ status: 200 }));
}

export async function PUT(req) {
    await connectToDb();
    const body = await req.json();
    const { id, status } = body;
    await Order .findByIdAndUpdate (id, { status });
    return new Response(JSON.stringify({ status: 200 }));
}
