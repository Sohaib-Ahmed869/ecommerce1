import connectToDb from "../../../utils/db";
import Product from "../../../Models/Product";
import User from "../../../Models/User";
import { authToken } from "../../../utils/auth";
import { v4 as uuidv4 } from "uuid";
import * as admin from "firebase-admin";
import servicesAccount from "../../../service_keys_firebase.json";
import { firestore } from "firebase-admin";

let appInitializedPromise = null;

// Function to initialize Firebase app and return a promise
function initializeFirebaseApp() {
  if (!admin.apps.length) {
    appInitializedPromise = new Promise((resolve, reject) => {
      admin.initializeApp({
        credential: admin.credential.cert(servicesAccount),
        storageBucket: "gs://ecommerce-8c377.appspot.com",
      });
      firestore().settings({ ignoreUndefinedProperties: true });
      console.log("Firebase Admin initialized");

      resolve();
    });
  }
  return appInitializedPromise;
}

export async function POST(req) {
  // Ensure that the Firebase app is initialized before proceeding
  await initializeFirebaseApp();

  await connectToDb();
  const body = await req.formData();

  const name = body.get("name");
  const price = body.get("price");
  const description = body.get("description");
  const status = body.get("status");
  const category = body.get("category");
  const token = body.get("token");
  const image = body.get("image");

  const bucket = admin.storage().bucket();

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    // Upload the image to Firebase Storage
    const fileUpload = bucket.file(name);

    const uuid = uuidv4();
    await fileUpload.save(buffer, {
      metadata: {
        contentType: image.type,
        firebaseStorageTokens: uuid,
      },
    });

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${name}`;



    const product = new Product({
      name,
      price,
      description,
      status,
      category,
      image: imageUrl,
      token: uuid,
    });

    await product.save();

    return new Response(JSON.stringify({ message: "Product created" }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(req) {
  await connectToDb();
  const products = await Product.find();
  return new Response(JSON.stringify(products));
}

export async function PUT(req) {
  await connectToDb();
  const body = await req.json();
  const { id, name, price, description, status, category } = body;

  await Product.findByIdAndUpdate(id, {
    name,
    price,
    description,
    status,
    category,
  });

  return new Response(JSON.stringify({ status: 200 }));
}


