import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import membershipLottie from "../../assets/lotties/membership.json";

const PaymentForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", {
        email: user.email,
        amount: 500,
      })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [axiosSecure, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      await axiosSecure.patch(`/users/badge/${user.email}`, {
        badge: "gold",
      });
      Swal.fire("Success", "Membership upgraded to Gold!", "success").then(
        () => {
          navigate("/");
        }
      );
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen mt-32">
      <div className="flex flex-col items-center mb-6">
        <Lottie animationData={membershipLottie} className="w-40 h-40" />
        <h2 className="text-2xl font-semibold text-center mt-4">
          Become a Gold Member
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 py-11 px-7 rounded-xl shadow-md w-full max-w-md mx-auto border border-gray-600"
      >
        <CardElement className="p-2 border border-gray-600 rounded" />
        <button
          className="btn mt-4 bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white w-full"
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay & Become a Member"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
