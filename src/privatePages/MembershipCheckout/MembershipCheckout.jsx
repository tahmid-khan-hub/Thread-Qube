import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";
import Lottie from "lottie-react";
import AlreadyMemberLottie from "../../assets/lotties/AlreadyMember.json"

const MembershipCheckout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

  const { data: User = {}, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  if (User?.badge === "gold") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Lottie animationData={AlreadyMemberLottie} className="w-52 h-52" />
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold text-orange-600">
            🎉 You're already a Gold Member!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default MembershipCheckout;
