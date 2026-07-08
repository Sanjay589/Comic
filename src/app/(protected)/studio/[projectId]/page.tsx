"use client";

import * as React from "react";
import { use } from "react";
import ComicStudio from "@/components/editor/ComicStudio";

export default function StudioPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  return <ComicStudio projectId={projectId} />;
}
