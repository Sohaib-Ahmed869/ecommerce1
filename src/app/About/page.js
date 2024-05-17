import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const About = () => {
  
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex flex-col justify-center items-center gap-4 w-full">

        <img src="/Logo.png" alt="About Us" className="rounded-md shadow-md w-full md:w-1/2" />
        <div className="rounded-md shadow-md p-8 text-black w-full md:w-1/2 space-y-8 bg-white">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>

          <div className="space-y-8 mb-6">
            <p>
              At TE ABC Ecommerce, we believe that each customer is unique and has different needs. We strive to provide a wide range of products to cater to every customer’s needs. Our platform is designed to make your shopping experience as seamless as possible. <br></br><br></br>
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <div className="space-y-8 mb-6">
            <p>
              Our mission is to provide a platform where customers can find the products they need at the best prices. We aim to create a seamless shopping experience that caters to every customer’s unique needs. <br></br><br></br>
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
          <div className="space-y-8">
            <p>
                At TE ABC Ecommerce, we are committed to providing the best products at the best prices. We believe in creating a seamless shopping experience that caters to every customer’s unique needs. Our platform is designed to make your shopping experience as easy as possible. <br></br><br></br>
                Customers can find a wide range of products on our platform, from electronics to clothing to home goods. We are constantly updating our inventory to provide the latest products to our customers. <br></br><br></br>
                Our team is dedicated to providing excellent customer service and ensuring that every customer has a positive shopping experience. We are always available to answer any questions and address any concerns that our customers may have. <br></br><br></br>
            </p>
          </div>

          <div className="container mx-auto px-4 py-8 bg-gray-100">
          <h3 className="text-3xl font-light mb-4 mt-10 text-center">
            Companies We Work With
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8 mt-4">
            <img
              src="/Adobe.png"
              alt="Adobe"
              className=" h-12 object-contain w-full mt-4 mb-4"
            />
            <img
              src="/EverNote.png"
              alt="EverNote"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/asana.png"
              alt="asana"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/amazon.png"
              alt="amazon"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/Google.png"
              alt="Google"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/microsoft.png"
              alt="microsoft"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/PayPal.png"
              alt="PayPal"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/shopify.png"
              alt="shopify"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/Spotify.png"
              alt="Spotify"
              className="w-full h-12 object-contain mt-4 mb-4"
            />
            <img
              src="/Uber.png"
              alt="Uber"
              className="w-full object-contain h-16 mt-4 mb-4"
            />
          </div>
        </div>

          <h2 className="text-2xl font-bold mb-4 mt-8">Contact Us</h2>
          <div className="flex flex-col space-y-2">
            <p>
              <span className="font-bold">Telephone:</span> (555) 555-5555
            </p>
            <p>
              <span className="font-bold">Email:</span> info@TEABC.com
            </p>
            <p>
              <span className="font-bold">Address:</span> 123 Main Street, Newtoon,
              CA 12345
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
