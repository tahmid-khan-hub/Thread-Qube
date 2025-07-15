import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";
import Animation from "../../hooks/Animation";


const MembershipCheckout = () => {
  useEffect(()=>{document.title = "ThreadQube | Membership"},[])
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
      <Animation><div data-aos="fade-up" className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center -mt-46">
          <img className="w-46 mx-auto" src="https://i.ibb.co/DHqDN3hn/image.png" alt="membershp" />
          <h2 className="text-2xl font-semibold text-orange-600">
            🎉 You're already a Gold Member!
          </h2>
          <p className="mt-1">Now you can post more than 5 posts.</p>
        </div>
      </div></Animation>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default MembershipCheckout;
