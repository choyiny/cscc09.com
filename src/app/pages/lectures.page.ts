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
  routePath: "/lectures",
});

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-lecture-item",
  styles: [
    `
      a.lecture-item {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        padding: 1.25rem 1rem;
        border-radius: var(--radius);
        text-decoration: none;
        color: inherit;
        border: 1px solid transparent;
        transition:
          background 0.15s,
          border-color 0.15s;
        margin-bottom: 0.25rem;
      }

      a.lecture-item:hover {
        background: var(--surface);
        border-color: var(--border);
        text-decoration: none;
      }

      .week-badge {
        flex-shrink: 0;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        font-family: var(--mono);
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-muted);
        margin-top: 0.1rem;
      }

      .lecture-item:hover .week-badge {
        border-color: var(--accent);
        color: var(--accent);
      }

      .lecture-body {
        flex: 1;
        min-width: 0;
      }

      .lecture-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text);
        margin-bottom: 0.3rem;
        line-height: 1.4;
      }

      .lecture-date {
        display: inline-block;
        font-family: var(--mono);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        margin-bottom: 0.4rem;
      }

      .lecture-description {
        font-size: 0.875rem;
        color: var(--text-muted);
        line-height: 1.5;
      }
    `,
  ],
  template: `
    @if (lecture) {
      <a [routerLink]="'/lectures/' + slug" class="lecture-item">
        <div class="week-badge">{{ lecture.week }}</div>
        <div class="lecture-body">
          <div class="lecture-title">{{ lecture.title }}</div>
          <div class="lecture-date">
            Week of {{ getDateString(lecture.date) }}
          </div>
          <div class="lecture-description">{{ lecture.description }}</div>
        </div>
      </a>
    }
  `,
})
export class LectureItemComponent {
  @Input() lecture?: LectureAttributes;
  @Input() slug?: string;

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
  template: `
    <div class="container">
      <header>
        <h1>Schedule</h1>
        <p>Lecture schedule and topics for the semester</p>
      </header>
      <div>
        @for (lecture of lectures; track lecture) {
          <app-lecture-item
            [slug]="lecture.slug"
            [lecture]="lecture.attributes"
          ></app-lecture-item>
        }
      </div>
    </div>
  `,
})
export default class SchedulePage {
  readonly lectures = injectContentFiles<LectureAttributes>((contentFile) =>
    contentFile.filename.includes("src/content/lectures/"),
  ).sort((a, b) => a.attributes.week - b.attributes.week);
}
