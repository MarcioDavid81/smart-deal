import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-primary">
        <div className="min-h-screen  w-full flex bg-[url(/bg-signin.webp)] bg-center bg-no-repeat bg-cover rounded-lg">
          <main className="flex-1 py-4 px-4 md:px-8 text-gray-800">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="mb-4">Faça Login ou cadastre-se</h1>
              <SignIn />
            </div>
          </main>
        </div>
      </div>
  )
}