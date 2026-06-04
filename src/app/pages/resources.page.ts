import { MarkdownComponent, injectContent } from "@analogjs/content";
import { Component } from "@angular/core";
import { FileAttributes } from "../interfaces/file-attributes";
import { AsyncPipe } from "@angular/common";
import { environment } from "../../environments/environment";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Resources",
  description: `Learning resources, reference links, and tools for ${environment.courseCode} ${environment.courseTitle}.`,
  routePath: "/resources",
});

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe],
  template: `
    <div class="container">
      <header>
        <h1>Resources</h1>
        <p>
          Curated web development links. Feel free to open a PR to add to this
          list.
        </p>
      </header>
      @if (post$ | async; as post) {
        <analog-markdown [content]="post.content"></analog-markdown>
      }
    </div>
  `,
})
export default class ExtraResourcesPage {
  post$ = injectContent<FileAttributes>({ customFilename: "resources" });
}
