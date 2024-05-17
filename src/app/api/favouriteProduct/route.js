import connectToDb from "../../utils/db";
import User from "../../Models/User";
import Product from "../../Models/Product";
import jwt from "jsonwebtoken";

export async function GET(req) {
    await connectToDb();
    const token = req.headers.get("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    const userId = decoded.in;
    const user = await User.findById(userId);
    //return the user's favourite products array
    console.log(user.favourite_products);
    return new Response(JSON.stringify(user.favourite_products));
}

export async function POST(req) {
    await connectToDb();
    const token = req.headers.get("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    const userId = decoded.in;
    const user = await User.findById(userId);
    const body = await req.json();
    const { productId } = body;
    console.log('Id',productId);
    //check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        return new Response(JSON.stringify({ status: 404, message: "Product not found" }));
    }
    //check if the product is already in the user's favourite products array
    if (user.favourite_products.includes(productId)) {
        return new Response(JSON.stringify({ status: 400, message: "Product already in favourites" }));
    }
    //add the product to the user's favourite products array
    user.favourite_products.push(productId);
    await user.save();
    return new Response(JSON.stringify({ status: 200 }));
}

export async function DELETE(req) {
    await connectToDb();
    const token = req.headers.get("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    const userId = decoded.in;
    const user = await User.findById(userId);
    const body = await req.json();
    const { productId } = body;
    //check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        return new Response(JSON.stringify({ status: 404, message: "Product not found" }));
    }
    //check if the product is in the user's favourite products array
    if (!user.favourite_products.includes(productId)) {
        return new Response(JSON.stringify({ status: 400, message: "Product not in favourites" }));
    }
    //remove the product from the user's favourite products array
    user.favourite_products = user.favourite_products.filter((id) => id !== productId);
    await user.save();

    return new Response(JSON.stringify({ status: 200 }));

}

