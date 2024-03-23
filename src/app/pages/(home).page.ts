import { MarkdownComponent, injectContent } from "@analogjs/content";
import { Component } from "@angular/core";
import { PostAttributes } from "../interfaces/file-attributes";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { environment } from "../../environments/environment";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";

export const routeMeta: RouteMeta = getRouteMeta({
  title: environment.fullTitle,
  description: environment.description,
});

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, NgFor],
  styles: [
    `
      .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom: 3em;
      }

      .logo {
        width: 300px;
      }

      .description {
        color: #718096;
      }

      h1 {
        font-size: 2em;
        line-height: 1.2;
      }

      .code {
        color: #4299e1;
      }
    `,
  ],
  template: `<div class="hero">
      <img
        width="300"
        height="154"
        class="logo noprint"
        src="utsc-logo.svg"
        alt="UTSC Logo"
      />
      <h1>
        <span class="code">{{ courseCode }}</span> - {{ courseTitle }}
      </h1>
      <p class="description">{{ description }}</p>
      <p>
        Instructors:
        <ng-container *ngFor="let instructor of instructors; let last = last">
          <a target="_blank" [href]="instructor.website">{{
            instructor.name
          }}</a
          ><span *ngIf="!last">, </span>
        </ng-container>
      </p>
    </div>
    <ng-container *ngIf="post$ | async as post">
      <analog-markdown [content]="post.content"></analog-markdown>
    </ng-container> `,
})
export default class HomePage {
  courseCode = environment.courseCode;
  courseTitle = environment.courseTitle;
  description = environment.description;
  instructors = environment.instructors;
  post$ = injectContent<PostAttributes>({ customFilename: "syllabus" });
}
