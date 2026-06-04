import { Component, Input } from "@angular/core";
import { environment } from "../../environments/environment";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";
import { Instructor } from "../interfaces/instructor";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Team",
  description: `Teaching Team for ${environment.courseCode} ${environment.courseTitle}`,
  routePath: "/team",
});

@Component({
  standalone: true,
  selector: "app-member",
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }

      .member-name {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--text);
        margin-bottom: 0.2rem;
      }

      .member-title {
        font-size: 0.8125rem;
        color: var(--text-muted);
      }

      a.member-name {
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      a.member-name:hover {
        color: var(--accent);
      }
    `,
  ],
  template: `
    @if (website) {
      <a class="member-name" [href]="website" target="_blank">{{ name }}</a>
    } @else {
      <span class="member-name">{{ name }}</span>
    }
    @if (title) {
      <span class="member-title">{{ title }}</span>
    }
  `,
})
export class MemberComponent {
  @Input() name = "";
  @Input() title?: string;
  @Input() website?: string;
}

@Component({
  standalone: true,
  imports: [MemberComponent],
  styles: [
    `
      .team-section {
        margin-bottom: 2.5rem;
      }

      .section-label {
        font-family: var(--mono);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-muted);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border);
      }

      .members-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
      }

      .member-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1rem 1.125rem;
      }
    `,
  ],
  template: `
    <div class="container">
      <header>
        <h1>Team</h1>
        <p>The people behind the course</p>
      </header>

      @for (staffType of staff; track staffType.name) {
        @if (staffType.members.length) {
          <div class="team-section">
            <div class="section-label">{{ staffType.name }}</div>
            <ul class="members-grid">
              @for (member of staffType.members; track member.name) {
                <li class="member-card">
                  <app-member
                    [name]="member.name"
                    [title]="member.title"
                    [website]="member.website"
                  ></app-member>
                </li>
              }
            </ul>
          </div>
        }
      }
    </div>
  `,
})
export default class TeamPageComponent {
  staff = environment.staff as { name: string; members: Instructor[] }[];
}
