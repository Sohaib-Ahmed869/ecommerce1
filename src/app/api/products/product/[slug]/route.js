import connectToDb from '../../../../utils/db';
import Product from '@/app/Models/Product';

export async function GET(req,{params}) {
    await connectToDb();
    console.log(params);
    const productId = params.slug;
    const product = await Product.findById (productId);
    console.log(product);
    return new Response(JSON.stringify(product))
};
