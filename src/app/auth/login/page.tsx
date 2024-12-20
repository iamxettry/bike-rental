import { loginImage, SignUpBg } from "@/assets";
import Layout from "@/components/global/Layout";
import Image from "next/image";
import React from "react";
import LoginPorvider from "@/Auth/components/LoginPorvider";
import VerifyOtpProvider from "@/Auth/components/VerifyOtpProvider";

type LoginPageProps = Promise<{
  [searchParams: string]: {
    verifyOtp?: boolean;
    forgotPassword?: boolean;
  };
}>;
const LoginPage = async (props: { searchParams: LoginPageProps }) => {
  const { verifyOtp, forgotPassword } = await props.searchParams;

  return (
    <div className="relative  mb-16">
      <div className=" h-screen w-full overflow-hidden">
        <Image src={SignUpBg} className="  w-full h-full object-cover" alt="" />
      </div>
      <div className=" w-full h-full absolute top-0">
        <Layout>
          {/* Register */}
          <div className="flex gap-4  w-fit md:max-w-3xl  mx-auto my-20  bg-pink-200 p-6 rounded-xl">
            <div className="flex-1 hidden md:flex   justify-center items-center border-r-2 border-orange-500">
              <Image
                src={loginImage}
                className="  w-full h-full object-cover mr-4"
                alt=""
              />
            </div>
            {verifyOtp ? (
              <div className="md:flex-1 ">
                <p className="text-center text-gray-800 text-2xl font-semibold">
                  {forgotPassword
                    ? "Forgot Password  OTP"
                    : " Login Verification OTP"}
                </p>
                <VerifyOtpProvider />
              </div>
            ) : (
              <div className="md:flex-1">
                <p className="text-center text-gray-800 text-2xl font-semibold">
                  Login to your account
                </p>
                <LoginPorvider />
              </div>
            )}
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default LoginPage;
