/** @format */

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 p-2 font-bold flex justify-between">
        <h2> Hello {session?.user?.name} </h2>
        <div>
          <img
            src={session?.user?.image}
            alt=""
            className=" w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </Layout>
  );
}
