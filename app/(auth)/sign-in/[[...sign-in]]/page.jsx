import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center h-screen size-full max-sm:px-6">
      <SignIn />
    </main>
  );
};

export default SignInPage;
