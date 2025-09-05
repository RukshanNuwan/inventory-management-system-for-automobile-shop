import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center h-screen size-full max-sm:px-6">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
