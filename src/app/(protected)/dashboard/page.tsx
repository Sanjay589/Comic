"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  MoreVertical,
  BookOpen,
  Clock,
  Pencil,
  Copy,
  Trash2,
  Download,
  FolderOpen,
  Sparkles,
  Filter,
  ArrowUpDown,
} from "lucide-react";

// Demo project data
const DEMO_PROJECTS = [
  {
    id: "demo-1",
    title: "The Robot Lab",
    synopsis: "A college student discovers a small robot in an abandoned laboratory and embarks on an unexpected adventure.",
    genre: "Sci-Fi",
    status: "completed" as const,
    style: "Manga",
    panels: 12,
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "demo-2",
    title: "Midnight Heroes",
    synopsis: "A group of teenagers discover they have superpowers that only work at night.",
    genre: "Superhero",
    status: "story_created" as const,
    style: "Superhero Comic",
    panels: 0,
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "demo-3",
    title: "Untitled Project",
    synopsis: "",
    genre: "Fantasy",
    status: "draft" as const,
    style: "Fantasy Illustration",
    panels: 0,
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

const statusMap: Record<string, { label: string; variant: "default" | "brand" | "accent" | "success" | "warning" | "danger" }> = {
  draft: { label: "Draft", variant: "default" },
  story_created: { label: "Story Created", variant: "brand" },
  characters_created: { label: "Characters Created", variant: "accent" },
  approved: { label: "Approved", variant: "success" },
  generating: { label: "Generating", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  failed: { label: "Failed", variant: "danger" },
};

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [projects, setProjects] = React.useState(DEMO_PROJECTS);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"updated" | "created" | "title">("updated");
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [now] = React.useState(() => Date.now());

  const filteredProjects = React.useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.synopsis.toLowerCase().includes(q) ||
          p.genre.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "updated") return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (sortBy === "created") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [projects, searchQuery, statusFilter, sortBy]);

  function handleDuplicate(id: string) {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    const copy = {
      ...project,
      id: `copy-${Date.now()}`,
      title: `${project.title} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects((prev) => [copy, ...prev]);
    toast({ type: "success", title: "Project duplicated" });
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget));
    setDeleteTarget(null);
    setIsDeleting(false);
    toast({ type: "success", title: "Project deleted" });
  }

  function getProjectRoute(project: { id: string; status: string }) {
    switch (project.status) {
      case "completed":
        return `/studio/${project.id}`;
      case "generating":
        return `/project/${project.id}/generation`;
      case "approved":
        return `/project/${project.id}/review`;
      case "characters_created":
        return `/project/${project.id}/characters`;
      case "story_created":
        return `/project/${project.id}/story`;
      default:
        return `/create?project=${project.id}`;
    }
  }

  function formatTime(dateStr: string, currentTimestamp: number) {
    const diff = currentTimestamp - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-100">Dashboard</h1>
          <p className="text-sm text-surface-400 mt-1">
            Welcome back! You have {projects.length} project{projects.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link href="/create">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            New Comic
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-500" />
          <input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-dark-border bg-dark-surface text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-lg border border-dark-border bg-dark-surface text-sm text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23737373%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.5rem_center] bg-no-repeat"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="story_created">Story Created</option>
              <option value="completed">Completed</option>
              <option value="generating">Generating</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-surface-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-10 pl-9 pr-8 rounded-lg border border-dark-border bg-dark-surface text-sm text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23737373%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.5rem_center] bg-no-repeat"
              aria-label="Sort by"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Created</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-dark-border bg-dark-surface">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-l-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-dark-card text-surface-100"
                  : "text-surface-500 hover:text-surface-300"
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-r-lg transition-colors ${
                viewMode === "list"
                  ? "bg-dark-card text-surface-100"
                  : "text-surface-500 hover:text-surface-300"
              }`}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="h-8 w-8 text-surface-500" />}
          title={searchQuery || statusFilter !== "all" ? "No matching projects" : "No projects yet"}
          description={
            searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Create your first comic project to get started."
          }
          action={
            !searchQuery && statusFilter === "all"
              ? {
                  label: "Create Your First Comic",
                  onClick: () => router.push("/create"),
                  variant: "primary",
                }
              : undefined
          }
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} hover>
              {/* Thumbnail placeholder */}
              <div className="h-40 bg-gradient-to-br from-dark-hover to-dark-surface rounded-t-xl flex items-center justify-center border-b border-dark-border">
                <BookOpen className="h-10 w-10 text-surface-600" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-surface-100 truncate flex-1">
                    {project.title}
                  </h3>
                  <DropdownMenu
                    trigger={
                      <button className="p-1 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors" aria-label="Project actions">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    }
                  >
                    <DropdownItem
                      icon={<Pencil className="h-4 w-4" />}
                      onClick={() => router.push(getProjectRoute(project))}
                    >
                      Open
                    </DropdownItem>
                    <DropdownItem
                      icon={<Copy className="h-4 w-4" />}
                      onClick={() => handleDuplicate(project.id)}
                    >
                      Duplicate
                    </DropdownItem>
                    <DropdownItem
                      icon={<Download className="h-4 w-4" />}
                      onClick={() => toast({ type: "info", title: "Export coming soon" })}
                    >
                      Export
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem
                      destructive
                      icon={<Trash2 className="h-4 w-4" />}
                      onClick={() => setDeleteTarget(project.id)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </div>

                {project.synopsis && (
                  <p className="text-xs text-surface-400 line-clamp-2 mb-3">
                    {project.synopsis}
                  </p>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={statusMap[project.status]?.variant}>
                    {statusMap[project.status]?.label}
                  </Badge>
                  <Badge variant="outline">{project.genre}</Badge>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-surface-500">
                  <Clock className="h-3 w-3" />
                  {formatTime(project.updated_at, now)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-xl border border-dark-border bg-dark-card p-4 hover:bg-dark-hover transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-dark-hover flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-surface-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-surface-100 truncate">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={statusMap[project.status]?.variant}>
                    {statusMap[project.status]?.label}
                  </Badge>
                  <span className="text-xs text-surface-500">
                    {project.genre} • {formatTime(project.updated_at, now)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push(getProjectRoute(project))}
                >
                  Open
                </Button>
                <DropdownMenu
                  trigger={
                    <button className="p-2 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors" aria-label="Project actions">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  }
                >
                  <DropdownItem
                    icon={<Copy className="h-4 w-4" />}
                    onClick={() => handleDuplicate(project.id)}
                  >
                    Duplicate
                  </DropdownItem>
                  <DropdownItem
                    icon={<Download className="h-4 w-4" />}
                    onClick={() => toast({ type: "info", title: "Export coming soon" })}
                  >
                    Export
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem
                    destructive
                    icon={<Trash2 className="h-4 w-4" />}
                    onClick={() => setDeleteTarget(project.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Project"
        description="This action cannot be undone. All scenes, characters, panels, and exports associated with this project will be permanently deleted."
        confirmLabel="Delete Project"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
