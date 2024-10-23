import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import logoAssetUrl from "app/assets/grapple-logic-logo.svg"
import heroImageUrl from "app/assets/hero-image.jpeg"
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Grapple Logic" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-slate-900 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover bg-blend-overlay"
                src={heroImageUrl}
                alt="Grapple Logic"
              />
              <div className="absolute inset-0 bg-slate-800" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-purple-500 drop-shadow-md">
                  Grapple Logic
                </span>
              </h1>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/calendar"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-purple-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    View Training Calendar for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-purple-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-purple-500 px-4 py-3 font-medium text-white hover:bg-purple-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
