"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Footer = () => {
  const faqData = [
    {
      question: "How can I place an order?",
      answer:
        "You can place an order by clicking on the 'Order Now' button and filling out the required details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by clicking on the 'Track Order' button and entering your order number.",
    },
    {
      question: "How can I cancel my order?",
      answer:
        "You can cancel your order by contacting our customer service team within 24 hours of placing the order.",
    },
  ];

  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);

  return (
    <footer
      className="bg-dark-800 text-white text-center py-4"
      style={{ backgroundImage: "linear-gradient(to right, #000000, #333333)" }}
    >
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center gap-4 w-full">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <div className="rounded-md shadow-md p-8 text-white w-full md:w-1/2 space-y-8 bg-gray-900">
          <div className="space-y-8 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Q: {faqData[0].question}</h2>
              <button onClick={() => setFaq1(!faq1)}>
                {faq1 ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
            {faq1 && <p>{faqData[0].answer}</p>}
          </div>

          <div className="space-y-8 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Q: {faqData[1].question}</h2>
              <button onClick={() => setFaq2(!faq2)}>
                {faq2 ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
            {faq2 && <p>{faqData[1].answer}</p>}
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Q: {faqData[2].question}</h2>
              <button onClick={() => setFaq3(!faq3)}>
                {faq3 ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
            {faq3 && <p>{faqData[2].answer}</p>}
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center gap-4 w-full">
          <p className="text-md">te.abc@gmail.com</p>
          <p className="text-md">123-456-7890</p>
        </div>
        Copyright &copy; {new Date().getFullYear()} TE ABC
      </div>
    </footer>
  );
};

export default Footer;
