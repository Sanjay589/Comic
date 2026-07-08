"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Search, FolderOpen, Plus } from "lucide-react";

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-surface-100">All Projects</h1>
        <Link href="/create">
          <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            New Comic
          </Button>
        </Link>
      </div>

      <EmptyState
        icon={<FolderOpen className="h-8 w-8 text-surface-500" />}
        title="No projects yet"
        description="Create your first comic project to get started. Your projects will appear here."
        action={{
          label: "Create Your First Comic",
          onClick: () => router.push("/create"),
        }}
      />
    </div>
  );
}
