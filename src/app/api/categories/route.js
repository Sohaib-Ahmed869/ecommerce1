import connectToDb from "../../utils/db";
import Category from "../../Models/Categories";

export async function GET(req) {
  await connectToDb();
  const categories = await Category.find();
  return new Response(JSON.stringify(categories));
}

export async function POST(req) {
  await connectToDb();
  const body = await req.json();
  const existingCategory = await Category.findOne ({ name: body.name });
  if(existingCategory) {
    return new Response(JSON.stringify({ status: 400 }));
  }
  const { name } = body;
  const status = "active";
  const category = new Category({
    name,
    status,
  });
  await category.save();
  return new Response(JSON.stringify({ status: 200 }));
}

export async function PUT(req) {
  await connectToDb();
  const body = await req.json();
  const { id, status } = body;
  await Category.findByIdAndUpdate(id, { status });
  return new Response(JSON.stringify({ status: 200 }));
}
