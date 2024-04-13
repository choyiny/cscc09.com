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
        color: transparent;
        background-image: linear-gradient(to right, #b4cded, #4299e1);
        background-clip: text;
        -webkit-background-clip: text;
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
        @for (instructor of instructors; track instructor; let last = $last) {
          <a target="_blank" [href]="instructor.website">{{
            instructor.name
          }}</a>
          @if (!last) {
            <span>, </span>
          }
        }
      </p>
    </div>
    @if (post$ | async; as post) {
      <analog-markdown [content]="post.content"></analog-markdown>
    }`,
})
export default class HomePage {
  courseCode = environment.courseCode;
  courseTitle = environment.courseTitle;
  description = environment.description;
  instructors = environment.staff.find(
    (staffType) => staffType.name === "Instructors",
  )?.members;
  post$ = injectContent<PostAttributes>({ customFilename: "syllabus" });
}
