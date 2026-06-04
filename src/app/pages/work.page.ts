import { Component, Input } from "@angular/core";
import { CourseworkAttributes } from "../interfaces/file-attributes";
import { ContentFile, injectContentFiles } from "@analogjs/content";

import { RouterLink } from "@angular/router";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";
import { environment } from "../../environments/environment";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Coursework",
  description: `Coursework for ${environment.courseCode} ${environment.courseTitle}`,
  routePath: "/work",
});

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-coursework-item",
  styles: [
    `
      a.work-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1rem;
        border-radius: var(--radius);
        text-decoration: none;
        color: inherit;
        border: 1px solid transparent;
        transition:
          background 0.15s,
          border-color 0.15s;
        margin-bottom: 0.25rem;
      }

      a.work-item:hover:not(.disabled) {
        background: var(--surface);
        border-color: var(--border);
        text-decoration: none;
      }

      a.work-item.disabled {
        cursor: default;
        opacity: 0.45;
        pointer-events: none;
      }

      .work-left {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        min-width: 0;
      }

      .work-indicator {
        flex-shrink: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--border);
        transition: background 0.15s;
      }

      a.work-item:not(.disabled) .work-indicator {
        background: var(--success);
      }

      .work-title {
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .work-right {
        flex-shrink: 0;
      }

      .work-due {
        font-family: var(--mono);
        font-size: 0.7rem;
        letter-spacing: 0.04em;
        color: var(--text-muted);
        white-space: nowrap;
      }

      .work-coming-soon {
        font-family: var(--mono);
        font-size: 0.7rem;
        letter-spacing: 0.04em;
        color: var(--text-muted);
      }

      @media (max-width: 500px) {
        a.work-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
        }
      }
    `,
  ],
  template: `
    @if (work) {
      <a
        [routerLink]="isReleased() ? '/work/' + work.slug : null"
        class="work-item"
        [class.disabled]="!isReleased()"
      >
        <div class="work-left">
          <span class="work-indicator"></span>
          <span class="work-title">{{ work.attributes.title }}</span>
        </div>
        <div class="work-right">
          @if (isReleased()) {
            <span class="work-due"
              >Due {{ getDateString(work.attributes.dueDate) }}</span
            >
          } @else {
            <span class="work-coming-soon">Coming soon</span>
          }
        </div>
      </a>
    }
  `,
})
export class CourseworkItemComponent {
  @Input() work: ContentFile<CourseworkAttributes> | undefined = undefined;

  getDateString(date: Date) {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  isReleased() {
    if (!this.work) return false;
    const date = new Date(this.work.attributes.releaseDate);
    if (date) {
      return date.getTime() <= Date.now();
    }
    return false;
  }
}

@Component({
  standalone: true,
  imports: [CourseworkItemComponent],
  template: `
    <div class="container">
      <header>
        <h1>Coursework</h1>
        <p>Assignments, labs, and project deliverables</p>
      </header>
      <div>
        @for (coursework of courseworkList; track coursework) {
          <app-coursework-item [work]="coursework"></app-coursework-item>
        }
      </div>
    </div>
  `,
})
export default class WorkPage {
  readonly courseworkList = injectContentFiles<CourseworkAttributes>(
    (contentFile) => {
      return contentFile.filename.includes("src/content/coursework");
    },
  ).sort((a, b) => {
    if (a.attributes.pin && !b.attributes.pin) return -1;
    if (!a.attributes.pin && b.attributes.pin) return 1;
    const aDate = new Date(a.attributes.dueDate);
    const bDate = new Date(b.attributes.dueDate);
    return aDate.getTime() - bDate.getTime();
  });
}
