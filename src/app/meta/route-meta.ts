import { RouteMeta } from "@analogjs/router";
import { environment } from "../../environments/environment";

const BASE_URL = "https://cscc09.com";
const DEFAULT_IMAGE = `${BASE_URL}/utsc-logo-dark.svg`;

function getDescription(description?: string) {
  const normalized = description?.trim();
  if (normalized) {
    return normalized;
  }

  return `Course website for ${environment.courseCode} ${environment.courseTitle} (${environment.semester}).`;
}

export function getMeta(params: {
  title: string;
  description?: string;
  url?: string;
}) {
  const description = getDescription(params.description);
  const url = params.url ?? BASE_URL;

  return [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: params.title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: DEFAULT_IMAGE,
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: params.title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: DEFAULT_IMAGE,
    },
  ];
}

export function getRouteMeta(
  params:
    | { partialTitle: string; description?: string; routePath?: string }
    | { title: string; description?: string; routePath?: string },
): RouteMeta {
  let title = "";
  if ("partialTitle" in params) {
    title = `${params.partialTitle} - ${environment.courseCode} ${environment.courseTitle}`;
  } else {
    title = params.title;
  }
  const description = getDescription(params.description);
  const url = `${BASE_URL}${params.routePath ?? ""}`;

  const meta = [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: DEFAULT_IMAGE,
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: DEFAULT_IMAGE,
    },
  ];

  return {
    title,
    meta,
  };
}
