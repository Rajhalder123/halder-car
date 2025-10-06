import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ConfirmPurchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carName, price } = location.state || {};

  useEffect(() => {
    // ✅ Save confirmation to MongoDB (optional but recommended if not saved already)
    const saveConfirmation = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carName,
            price,
            confirmedAt: new Date(),
          }),
        });

        if (!response.ok) throw new Error("Failed to save confirmation");
      } catch (err) {
        console.error("❌ Confirmation not saved:", err);
      }
    };

    if (carName && price) {
      saveConfirmation();
    }
  }, [carName, price]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-green-100">
        <CheckCircle2 className="mx-auto text-green-600 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Purchase Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for choosing <span className="font-semibold text-gray-800">{carName}</span>.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Total Price: <span className="font-semibold text-green-600">₹{price}</span>
        </p>

        <button
          onClick={handleGoHome}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-300"
        >
          Go to Home
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmPurchase;
