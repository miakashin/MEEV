'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApplicantDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated" && session.user.userType !== "applicant") {
      router.push("/dashboard/client");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const user = session?.user || { name: "Applicant User", email: "applicant@example.com" };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Applicant Dashboard</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}!</h2>
          <p className="text-gray-700 mb-4">Email: {user.email}</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition">Sign Out</button>
        </div>
        <div className="text-gray-600 text-center">
          <p>This is your private dashboard as an applicant. More features coming soon!</p>
        </div>
      </div>
    </div>
  );
} 