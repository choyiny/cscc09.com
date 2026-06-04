import {
  ContentFile,
  MarkdownComponent,
  injectContent,
} from "@analogjs/content";
import { Component, effect, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { CourseworkAttributes } from "../interfaces/file-attributes";
import { DatePipe } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";
import { getMeta } from "../meta/route-meta";
import { RouterLink } from "@angular/router";
import { environment } from "../../environments/environment";

@Component({
  standalone: true,
  imports: [MarkdownComponent, DatePipe, RouterLink],
  styles: [
    `
      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.8125rem;
        color: var(--text-muted);
        text-decoration: none;
        margin-bottom: 1.75rem;
        transition: color 0.15s;
      }

      .back-link:hover {
        color: var(--accent);
        text-decoration: none;
      }

      .work-header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border);
      }

      .work-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .work-description {
        color: var(--text-muted);
        font-size: 0.9375rem;
        margin: 0 0 0.875rem;
      }

      .work-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      }

      .due-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-family: var(--mono);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--warning);
        background: rgba(210, 153, 34, 0.1);
        border: 1px solid rgba(210, 153, 34, 0.25);
        border-radius: 4px;
        padding: 0.25rem 0.6rem;
      }
    `,
  ],
  template: `
    <div class="container">
      @if (handout(); as handout) {
        <a routerLink="/work" class="back-link"> <span>←</span> Coursework </a>

        <div class="work-header">
          <h1 class="work-title">{{ handout.attributes.title }}</h1>
          @if (handout.attributes.description) {
            <p class="work-description">{{ handout.attributes.description }}</p>
          }
          <div class="work-meta">
            @if (handout.attributes.dueDate) {
              <span class="due-badge">
                Due
                {{ handout.attributes.dueDate | date: "MMM d, y 'at' h:mm a" }}
              </span>
            }
          </div>
        </div>

        <analog-markdown [content]="handout.content"></analog-markdown>
      }
    </div>
  `,
})
export default class CourseworkComponent {
  meta = inject(Meta);
  title = inject(Title);

  readonly handout = toSignal(
    injectContent<CourseworkAttributes>({
      param: "slug",
      subdirectory: "coursework",
    }),
  );

  constructor() {
    effect(() => {
      const handout = this.handout() as ContentFile<CourseworkAttributes>;
      if (handout?.attributes?.title) {
        const title = `${handout.attributes.title} - ${environment.courseCode} ${environment.courseTitle}`;
        const description =
          handout.attributes.description?.trim() ||
          `Coursework details, instructions, and deadlines for ${handout.attributes.title} in ${environment.courseCode} ${environment.courseTitle}.`;

        this.title.setTitle(title);
        getMeta({
          title,
          description,
          url: `https://cscc09.com/work/${handout.slug}`,
        }).forEach((metaTag) => this.meta.updateTag(metaTag));
      }
    });
  }
}
