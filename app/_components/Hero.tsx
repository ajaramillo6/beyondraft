import { 
  LoginLink, 
  LogoutLink, 
  RegisterLink
} from "@kinde-oss/kinde-auth-nextjs";

import { LogOut } from "lucide-react";
import { useAuth } from "../context_/AuthContext";
import Image from "next/image";

const Hero = () => {
  const { isAuthenticated } = useAuth() || {};

  return (
    <section className="dark:text-white dark:bg-neutral-950 bg-white">
      <div className="mx-auto max-w-screen-xl h-[calc(100vh-4rem)] px-4 py-32 lg:flex lg:items-center">
        <div className="flex flex-col gap-4 items-center justify-center mx-auto max-w-3xl text-center">
          <Image 
            src="/1.svg" 
            alt="logo" 
            height={200} 
            width={200}
            priority
          />
          {/* Title */}
          <h1 className="bg-gradient-to-r from-blue-500 via-blue-700 to-red-600 bg-clip-text 
          text-3xl font-extrabold text-transparent sm:text-5xl leading-normal p-2">
            Beyondraft
          </h1>


          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl text-gray-400 sm:text-xl/relaxed">
            All-in-one website projects organizer
          </p>

          {/* Call to Action */}
          {isAuthenticated ? (
            <LogoutLink>
              <span className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 dark:bg-slate-700 
              px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 
              dark:hover:bg-red-700">
                <LogOut className="h-4 w-4" />
                Logout
              </span>
            </LogoutLink>
          ) : (
            <div>
              <LoginLink postLoginRedirectURL="/dashboard">
                <span className="block rounded-md bg-blue-800 dark:bg-blue-800 
                w-80 mt-4 text-md sm:text-lg font-medium text-white transition hover:bg-blue-700 
              dark:hover:bg-blue-700 py-2 sm:py-2.5">
                  Login
                </span>
              </LoginLink>
              <RegisterLink>
                <span className="block md:hidden rounded-md bg-gray-800 dark:bg-gray-800 
                w-80 mt-4 text-md sm:text-lg font-medium text-white transition hover:bg-gray-700 
              dark:hover:bg-gray-700 py-2 sm:py-2.5">
                  Register
                </span>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
