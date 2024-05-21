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
});

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-coursework-item",
  styles: [
    `
      .work-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2em 0;
        border-bottom: 1px solid rgba(226, 232, 240, 0.16);
        text-decoration: none;
      }

      .work-item:hover {
        background-color: rgba(226, 232, 240, 0.16);
        cursor: pointer;
      }

      .work-item.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .work-details {
        flex: 8;
        padding: 0 1em;
      }

      .work-title {
        font-size: 1.5em;
      }

      .work-date {
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
    @if (work) {
      <a
        [routerLink]="isReleased() ? '/work/' + work.slug : null"
        class="work-item"
        [class]="{ disabled: !isReleased() }"
      >
        <div class="work-details">
          <div class="work-title">{{ work.attributes.title }}</div>
          @if (isReleased()) {
            <div class="work-date">
              Due on {{ getDateString(work.attributes.dueDate) }}
            </div>
          }
          @if (!isReleased()) {
            <div class="work-date">Coming Soon</div>
          }
        </div>
      </a>
    }
  `,
})
class CourseworkItemComponent {
  @Input() work: ContentFile<CourseworkAttributes> | undefined = undefined;

  getDateString(date: Date) {
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  isReleased() {
    if (!this.work) {
      return false;
    }
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
  styles: [
    `
      .container {
        margin: 3em 0;
      }

      h1 {
        font-size: 30px;
        text-align: center;
        margin-bottom: 2em;
      }
    `,
  ],
  template: `
    <div class="container">
      <h1>Coursework</h1>
      @for (coursework of courseworkList; track coursework) {
        <app-coursework-item [work]="coursework"></app-coursework-item>
      }
    </div>
  `,
})
export default class WorkPage {
  readonly courseworkList = injectContentFiles<CourseworkAttributes>(
    (contentFile) => {
      const isCoursework = contentFile.filename.includes(
        "/src/content/coursework",
      );
      return isCoursework;
    },
  ).sort((a, b) => {
    const aDate = new Date(a.attributes.dueDate);
    const bDate = new Date(b.attributes.dueDate);
    // if attributes.pin is true, sort it to the top
    if (a.attributes.pin && !b.attributes.pin) {
      return -1;
    } else if (!a.attributes.pin && b.attributes.pin) {
      return 1;
    }
    return aDate.getTime() - bDate.getTime();
  });
}
