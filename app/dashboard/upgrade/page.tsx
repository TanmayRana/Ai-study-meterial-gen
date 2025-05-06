// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import React from "react";

// const page = () => {
//   const OnCheckoutClick = async () => {
//     const result = axios.post("/api/payment/checkout", {
//       priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
//     });
//     console.log("result in checkout", result);
//   };

//   return (
//     <div>
//       <h2 className="text-4xl font-medium text-gray-900">Plans</h2>
//       <p className="mt-2 text-sm text-gray-500">
//         Update your plan to generate unlimited courses for your exam.
//       </p>
//       <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
//           <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
//             <div className="text-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Free
//                 <span className="sr-only">Plan</span>
//               </h2>

//               <p className="mt-2 sm:mt-4">
//                 <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   {" "}
//                   0${" "}
//                 </strong>

//                 <span className="text-sm font-medium text-gray-700">
//                   /month
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-6 space-y-2">
//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> 5 Coruse Generate </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Limited Support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Email support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Help center access </span>
//               </li>
//             </ul>

//             <Button
//               //   href="#"
//               className="mt-8 block  border border-indigo-600 bg-white w-full   text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
//               variant={"outline"}
//               disabled
//             >
//               Current Plan
//             </Button>
//           </div>
//           <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
//             <div className="text-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Montly
//                 <span className="sr-only">Plan</span>
//               </h2>

//               <p className="mt-2 sm:mt-4">
//                 <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   {" "}
//                   9.99${" "}
//                 </strong>

//                 <span className="text-sm font-medium text-gray-700">
//                   /month
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-6 space-y-2">
//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700">
//                   {" "}
//                   Unlimited Courses Generate{" "}
//                 </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700">
//                   {" "}
//                   Unlimited Flashcard, Quiz{" "}
//                 </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Email support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Help center access </span>
//               </li>
//             </ul>

//             <Button
//               className="mt-8 block  border border-indigo-600 bg-white w-full   text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
//               variant={"outline"}
//               onClick={() => OnCheckoutClick()}
//             >
//               Get Started
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

// "use client";

// import { Button } from "@/components/ui/button";
// import { db } from "@/configs/db";
// import { USER_TABLE } from "@/configs/schema";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";

// const PaymentPage = () => {
//   const { user } = useUser();

//   const [userDetail, setuserDetail] = useState();

//   useEffect(() => {
//     GetUserDetail();
//   }, [user]);

//   const GetUserDetail = async () => {
//     const result = await db
//       .select()
//       .from(USER_TABLE)
//       .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

//     setuserDetail(result.data[0]);
//   };

//   const OnCheckoutClick = async () => {
//     try {
//       const response = await axios.post("/api/payment/checkout", {
//         priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
//       });

//       const { url } = response.data;
//       console.log("url in checkout", url);

//       if (url) {
//         window.location.href = url;
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       // Optionally show a toast or notification here
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-4xl font-medium text-gray-900">Plans</h2>
//       <p className="mt-2 text-sm text-gray-500">
//         Update your plan to generate unlimited courses for your exam.
//       </p>
//       <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
//           <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
//             <div className="text-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Free
//                 <span className="sr-only">Plan</span>
//               </h2>

//               <p className="mt-2 sm:mt-4">
//                 <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   {" "}
//                   0${" "}
//                 </strong>

//                 <span className="text-sm font-medium text-gray-700">
//                   /month
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-6 space-y-2">
//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> 5 Course Generate </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Limited Support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Email support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Help center access </span>
//               </li>
//             </ul>

//             <Button
//               className="mt-8 block border border-indigo-600 bg-white w-full text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
//               variant={"outline"}
//               disabled
//             >
//               Current Plan
//             </Button>
//           </div>
//           <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
//             <div className="text-center">
//               <h2 className="text-lg font-medium text-gray-900">
//                 Monthly
//                 <span className="sr-only">Plan</span>
//               </h2>

//               <p className="mt-2 sm:mt-4">
//                 <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                   {" "}
//                   9.99${" "}
//                 </strong>

//                 <span className="text-sm font-medium text-gray-700">
//                   /month
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-6 space-y-2">
//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700">
//                   {" "}
//                   Unlimited Courses Generate{" "}
//                 </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700">
//                   {" "}
//                   Unlimited Flashcard, Quiz{" "}
//                 </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Email support </span>
//               </li>

//               <li className="flex items-center gap-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-5 text-indigo-700 shadow-sm"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 12.75l6 6 9-13.5"
//                   />
//                 </svg>

//                 <span className="text-gray-700"> Help center access </span>
//               </li>
//             </ul>

//             {userDetail?.member == false ? (
//               <Button
//                 className="mt-8 block border border-indigo-600 bg-white w-full text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden cursor-pointer"
//                 variant={"outline"}
//                 onClick={() => OnCheckoutClick()}
//               >
//                 Get Started
//               </Button>
//             ) : (
//               <Button
//                 className="mt-8 block border border-indigo-600 bg-white w-full text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden cursor-pointer"
//                 variant={"outline"}
//                 onClick={() => OnCheckoutClick()}
//               >
//                 Manage Payment
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

// "use client";

// import { Button } from "@/components/ui/button";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// interface UserDetail {
//   id: string;
//   email: string;
//   isMember: boolean;
//   customerId: string;
//   // Add any other fields from your USER_TABLE here
// }

// const PaymentPage = () => {
//   const { user } = useUser();
//   const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user?.primaryEmailAddress?.emailAddress) {
//       fetchUserDetail();
//     }
//   }, [user]);

//   const fetchUserDetail = async () => {
//     try {
//       const response = await axios.post("/api/user-detail", {
//         email: user?.primaryEmailAddress?.emailAddress,
//       });

//       setUserDetail(response.data.user);
//     } catch (error) {
//       console.error("Failed to fetch user detail:", error);
//     }
//   };
//   console.log("userDetail", userDetail);

//   const onPaymentMenager = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/payment/manage-payment", {
//         customerId: userDetail?.customerId,
//       });
//       console.log("response", response.data);

//       // const { url } = response.data;
//       // if (url) {
//       //   window.location.href = url;
//       // }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onCheckoutClick = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/payment/checkout", {
//         priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
//       });

//       const { url } = response.data;
//       if (url) {
//         window.location.href = url;
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isMember = userDetail?.isMember;

//   return (
//     <div>
//       <h2 className="text-4xl font-medium text-gray-900">Plans</h2>
//       <p className="mt-2 text-sm text-gray-500">
//         Update your plan to generate unlimited courses for your exam.
//       </p>

//       <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           {/* Free Plan */}
//           <PlanCard
//             title="Free"
//             price="0"
//             features={[
//               "5 Course Generate",
//               "Limited Support",
//               "Email support",
//               "Help center access",
//             ]}
//             buttonText="Current Plan"
//             disabled
//           />

//           {/* Monthly Plan */}
//           {isMember == true ? (
//             <PlanCard
//               title="Monthly"
//               price="9.99"
//               features={[
//                 "Unlimited Courses Generate",
//                 "Unlimited Flashcard, Quiz",
//                 "Email support",
//                 "Help center access",
//               ]}
//               buttonText={"Manage Payment"}
//               onClick={onPaymentMenager}
//               loading={loading}
//             />
//           ) : (
//             <PlanCard
//               title="Monthly"
//               price="9.99"
//               features={[
//                 "Unlimited Courses Generate",
//                 "Unlimited Flashcard, Quiz",
//                 "Email support",
//                 "Help center access",
//               ]}
//               buttonText={"Get Started"}
//               onClick={onC}
//               loading={loading}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

// interface PlanCardProps {
//   title: string;
//   price: string;
//   features: string[];
//   buttonText: string;
//   disabled?: boolean;
//   onClick?: () => void;
//   loading?: boolean;
// }

// const PlanCard: React.FC<PlanCardProps> = ({
//   title,
//   price,
//   features,
//   buttonText,
//   disabled = false,
//   onClick,
//   loading = false,
// }) => {
//   return (
//     <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
//       <div className="text-center">
//         <h2 className="text-lg font-medium text-gray-900">{title}</h2>
//         <p className="mt-2 sm:mt-4">
//           <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
//             ${price}
//           </strong>
//           <span className="text-sm font-medium text-gray-700">/month</span>
//         </p>
//       </div>

//       <ul className="mt-6 space-y-2">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center gap-1 text-gray-700">
//             <CheckIcon /> {feature}
//           </li>
//         ))}
//       </ul>

//       <Button
//         className="mt-8 w-full border border-indigo-600 bg-white text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600"
//         variant="outline"
//         disabled={disabled || loading}
//         onClick={onClick}
//       >
//         {loading ? "Loading..." : buttonText}
//       </Button>
//     </div>
//   );
// };

// const CheckIcon = () => (
//   <svg
//     className="size-5 text-indigo-700 shadow-sm"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth="1.5"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M4.5 12.75l6 6 9-13.5"
//     />
//   </svg>
// );

"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserDetail {
  id: string;
  email: string;
  isMember: boolean;
  customerId: string;
}

const PaymentPage = () => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchUserDetail();
    }
  }, [user]);

  const fetchUserDetail = async () => {
    try {
      const response = await axios.post("/api/user-detail", {
        email: user?.primaryEmailAddress?.emailAddress,
      });

      setUserDetail(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user detail:", error);
    }
  };

  const onManagePayment = async () => {
    if (!userDetail?.customerId) {
      console.error("Customer ID missing");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/payment/manage-payment", {
        customerId: userDetail.customerId,
      });
      console.log("response", response.data);

      const { url } = response.data;
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Manage Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onCheckoutClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/payment/checkout", {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
      });

      const { url } = response.data;
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isMember = userDetail?.isMember;

  return (
    <div>
      <h2 className="text-4xl font-medium text-gray-900">Plans</h2>
      <p className="mt-2 text-sm text-gray-500">
        Update your plan to generate unlimited courses for your exam.
      </p>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {/* Free Plan */}
          <PlanCard
            title="Free"
            price="0"
            features={[
              "5 Course Generate",
              "Limited Support",
              "Email support",
              "Help center access",
            ]}
            buttonText="Current Plan"
            disabled
          />

          {/* Monthly Plan */}
          <PlanCard
            title="Monthly"
            price="9.99"
            features={[
              "Unlimited Courses Generate",
              "Unlimited Flashcard, Quiz",
              "Email support",
              "Help center access",
            ]}
            buttonText={isMember ? "Manage Payment" : "Get Started"}
            onClick={isMember ? onManagePayment : onCheckoutClick}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

interface PlanCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  features,
  buttonText,
  disabled = false,
  onClick,
  loading = false,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ${price}
          </strong>
          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-1 text-gray-700">
            <CheckIcon /> {feature}
          </li>
        ))}
      </ul>

      <Button
        className="mt-8 w-full border border-indigo-600 bg-white text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600"
        variant="outline"
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? "Loading..." : buttonText}
      </Button>
    </div>
  );
};

const CheckIcon = () => (
  <svg
    className="size-5 text-indigo-700 shadow-sm"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);
