import {
  ContentFile,
  MarkdownComponent,
  injectContent,
} from "@analogjs/content";
import { Component, inject } from "@angular/core";
import { LectureAttributes } from "../interfaces/file-attributes";
import { AsyncPipe, NgIf } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";
import { getMeta } from "../meta/route-meta";
import { SafePipe } from "../pipes/safe.pipe";

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, SafePipe],
  styles: [
    `
      .container {
        margin-top: 3em;
      }

      h1 {
        font-size: 30px;
      }
    `,
  ],
  template: `
    <div class="container">
      <ng-container *ngIf="lecture">
        <h1>
          Week {{ lecture.attributes.week }}: {{ lecture.attributes.title }}
        </h1>
        <p>{{ lecture.attributes.description }}</p>
        <analog-markdown [content]="lecture.content"></analog-markdown>
        <a
          *ngIf="lecture.attributes.googleSlidesUrl"
          [href]="lecture.attributes.googleSlidesUrl"
          target="_blank"
          >Lecture Slides</a
        >
        <iframe
          *ngIf="lecture.attributes.googleSlidesUrl"
          [src]="lecture.attributes.googleSlidesUrl + 'embed' | safe"
          frameborder="0"
          width="100%"
          height="500"
          allowfullscreen="true"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        >
        </iframe>
      </ng-container>
    </div>
  `,
  providers: [Meta],
})
export default class LectureComponent {
  meta = inject(Meta);
  title = inject(Title);
  lecture: ContentFile<LectureAttributes | Record<string, never>> | undefined =
    undefined;

  constructor() {
    injectContent<LectureAttributes>({
      param: "lectureId",
      subdirectory: "lectures",
    }).subscribe((lecture) => {
      this.setLecture(lecture);
    });
  }

  setLecture(lecture: ContentFile<LectureAttributes | Record<string, never>>) {
    this.lecture = lecture;
    this.title.setTitle(
      `Week ${lecture.attributes.week}: ${lecture.attributes.title}`,
    );
    const meta = getMeta({
      title: `Week ${lecture.attributes.week}: ${lecture.attributes.title}`,
      description: lecture.attributes.description,
    });
    meta.forEach((tag) => this.meta.updateTag(tag));
  }
}
