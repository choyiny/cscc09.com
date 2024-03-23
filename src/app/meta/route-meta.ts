import { RouteMeta } from "@analogjs/router";
import { environment } from "../../environments/environment";

export function getMeta(params: { title: string; description: string }) {
  return [
    {
      property: "og:title",
      content: params.title,
    },
    {
      property: "og:description",
      content: params.description,
    },
    {
      property: "og:image",
      content: "https://cscc09.com/utsc-logo-dark.svg",
    },
    {
      property: "og:url",
      content: "https://cscc09.com",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:title",
      content: params.title,
    },
    {
      property: "twitter:description",
      content: params.description,
    },
    {
      property: "twitter:image",
      content: "https://cscc09.com/utsc-logo-dark.svg",
    },
  ];
}

export function getRouteMeta(
  params:
    | { partialTitle: string; description: string }
    | { title: string; description: string },
): RouteMeta {
  let title = "";
  if ("partialTitle" in params) {
    title = `${params.partialTitle} - ${environment.courseCode} ${environment.courseTitle}`;
  } else {
    title = params.title;
  }

  const meta = [
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: params.description,
    },
    {
      property: "og:image",
      content: "https://cscc09.com/utsc-logo-dark.svg",
    },
    {
      property: "og:url",
      content: "https://cscc09.com",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: params.description,
    },
    {
      property: "twitter:image",
      content: "https://cscc09.com/utsc-logo-dark.svg",
    },
  ];

  return {
    title,
    meta,
  };
}
