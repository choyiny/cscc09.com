import { MarkdownComponent, injectContent } from "@analogjs/content";
import { Component } from "@angular/core";
import { FileAttributes } from "../interfaces/file-attributes";
import { AsyncPipe } from "@angular/common";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Accessing the Digital Ocean VM",
  description:
    "How to access your Digital Ocean VM for Assignment 4 and the project using an SSH key.",
  routePath: "/vm-access",
});

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe],
  template: `
    <div class="container">
      @if (post$ | async; as post) {
        <analog-markdown [content]="post.content"></analog-markdown>
      }
    </div>
  `,
})
export default class VmAccessPage {
  post$ = injectContent<FileAttributes>({ customFilename: "vm-access" });
}
