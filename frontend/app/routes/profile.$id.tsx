import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

export const loader = async ({ params }: { params: string }) => {
  return Response.json({ user: "1234" }, { status: 200 });
};

export default function Index() {
  const actionData = useLoaderData<{ user: string }>();

  return (
    <div>
      <h1 className="text-purple-600 italic border-2">Hello</h1>
      <p>{actionData.user}</p>
    </div>
  );
}
