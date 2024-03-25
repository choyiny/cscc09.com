import { MarkdownComponent, injectContent } from "@analogjs/content";
import { Component } from "@angular/core";
import { PostAttributes } from "../interfaces/file-attributes";
import { AsyncPipe } from "@angular/common";
import { environment } from "../../environments/environment";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";

export const routeMeta: RouteMeta = getRouteMeta({
  title: environment.fullTitle,
  description: environment.description,
});

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe],
  styles: [
    `
      .container {
        margin-top: 3em;
      }

      .hero {
        text-align: center;
      }

      h1 {
        font-size: 30px;
      }

      p {
        color: #718096;
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="hero">
        <h1>Resources</h1>
        <p>
          Interesting resources that might be useful to you in web development.
          Feel free to make a PR to add to this list!
        </p>
      </div>
      @if (post$ | async; as post) {
        <analog-markdown [content]="post.content"></analog-markdown>
      }
    </div>
  `,
})
export default class ExtraResourcesPage {
  post$ = injectContent<PostAttributes>({ customFilename: "resources" });
}
