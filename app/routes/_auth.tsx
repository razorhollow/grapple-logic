import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import NavBar from "~/components/NavBar";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  return json({});
}

export default function AuthLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}