import { injectContentFiles } from "@analogjs/content";
import { Component, Input } from "@angular/core";
import { LectureAttributes } from "../interfaces/file-attributes";

import { RouterLink } from "@angular/router";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";
import { environment } from "../../environments/environment";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Schedule",
  description: `Lecture Schedule for ${environment.courseCode} ${environment.courseTitle}`,
});

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-lecture-item",
  styles: [
    `
      .lecture-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2em 0;
        border-bottom: 1px solid rgba(226, 232, 240, 0.16);
        text-decoration: none;
      }

      .lecture-item:hover {
        background-color: rgba(226, 232, 240, 0.16);
        cursor: pointer;
      }

      .lecture-number {
        font-size: 2em;
        font-weight: bold;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .lecture-details {
        flex: 8;
        padding: 0 1em;
      }

      .lecture-title {
        font-size: 1.5em;
      }

      .lecture-date {
        font-size: 13px;
        background-color: rgba(226, 232, 240, 0.16);
        color: white;
        padding: 5px 10px;
        border-radius: 3em;
        display: inline-block;
        margin: 0.5em 0;
      }
    `,
  ],
  template: `
    @if (lecture) {
      <a [routerLink]="'/lectures/' + lecture.slug" class="lecture-item">
        <div class="lecture-number">
          <span>{{ lecture.attributes.week }}</span>
        </div>
        <div class="lecture-details">
          <div class="lecture-title">{{ lecture.attributes.title }}</div>
          <div class="lecture-date">
            Week of {{ getDateString(lecture.attributes.date) }}
          </div>
          <div class="lecture-description">
            {{ lecture.attributes.description }}
          </div>
        </div>
      </a>
    }
  `,
})
class LectureItemComponent {
  @Input() lecture: LectureAttributes | undefined = undefined;

  getDateString(date: Date) {
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
}

@Component({
  standalone: true,
  imports: [LectureItemComponent],
  styles: [
    `
      .lecture-container {
        margin-bottom: 1em;
      }
    `,
  ],
  template: `
    <div class="container">
      <header>
        <h1>Schedule</h1>
      </header>
      <div class="lecture-container">
        @for (lecture of lectures; track lecture) {
          <app-lecture-item [lecture]="lecture"></app-lecture-item>
        }
      </div>
    </div>
  `,
})
export default class SchedulePage {
  readonly lectures = injectContentFiles<LectureAttributes>((contentFile) =>
    contentFile.filename.includes("/src/content/lectures/"),
  ).sort((a, b) => a.attributes.week - b.attributes.week);
}
