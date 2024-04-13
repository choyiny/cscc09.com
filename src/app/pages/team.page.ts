import { Component, Input } from "@angular/core";
import { environment } from "../../environments/environment";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Team",
  description: `Teaching Team for ${environment.courseCode} ${environment.courseTitle}`,
});

@Component({
  standalone: true,
  selector: "app-member",
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        text-align: center;
      }

      p {
        margin: 0 8px 0 0;
      }
    `,
  ],
  template: `
    <h3>{{ name }}</h3>
    <p>{{ title }}</p>
  `,
})
class MemberComponent {
  @Input() name = "";
  @Input() title = "";
}

@Component({
  standalone: true,
  styles: [
    `
      section {
        margin-bottom: 3em;
        .staff-type {
          font-size: 1.75rem;
        }
      }

      ul {
        list-style: none;
        display: flex;
        gap: 64px;
        flex-wrap: wrap;

        li {
          width: calc(35% - 64px);
        }

        @media (max-width: 768px) {
          li {
            width: 100%;
          }
        }
      }
    `,
  ],
  template: ` <div class="container">
    <header>
      <h1>Team</h1>
      <p>The team behind the course.</p>
    </header>
    @for (staffType of staff; track staffType) {
      @if (staffType.members.length) {
        <section>
          <h1 class="staff-type">{{ staffType.name }}</h1>
          <ul>
            @for (member of staffType.members; track member) {
              <li>
                <app-member
                  [name]="member.name"
                  [title]="member.title"
                ></app-member>
              </li>
            }
          </ul>
        </section>
      }
    }
  </div>`,
  imports: [MemberComponent],
})
export default class TeamPageComponent {
  staff = environment.staff;
}
