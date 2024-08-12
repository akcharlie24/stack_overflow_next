import { SignUp } from "@clerk/nextjs";

export default function Page() {
  // TODO: Check the signUp bug (possibly due to webhook/clerk issue/middleware)
  return <SignUp />;
}
