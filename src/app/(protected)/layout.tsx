"use client";

import { Navigation } from "@/components/ui/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();

  function handleLogout() {
    toast({
      type: "info",
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
    router.push("/");
  }

  return (
    <>
      <Navigation variant="app" isAuthenticated={true} onLogout={handleLogout} />
      <main className="flex-1 pt-16">{children}</main>
    </>
  );
}
