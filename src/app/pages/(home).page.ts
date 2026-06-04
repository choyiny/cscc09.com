import { MarkdownComponent, injectContent } from "@analogjs/content";
import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ThemeService } from "../services/theme.service";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";
import { environment } from "../../environments/environment";
import type { Instructor } from "../interfaces/instructor";
import { FileAttributes } from "../interfaces/file-attributes";

export const routeMeta: RouteMeta = getRouteMeta({
  title: environment.fullTitle,
  description: environment.description,
  routePath: "/",
});

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe],
  styles: [
    `
      .hero {
        padding: 3rem 0 2.5rem;
        border-bottom: 1px solid var(--border);
        margin-bottom: 2.5rem;
      }

      .hero-top {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .logo {
        width: 56px;
        height: auto;
        opacity: 0.9;
        flex-shrink: 0;
      }

      .hero-title h1 {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 0.25rem;
      }

      .course-code-display {
        font-family: var(--mono);
        color: var(--accent);
      }

      .hero-subtitle {
        font-size: 0.875rem;
        color: var(--text-muted);
        font-family: var(--mono);
        letter-spacing: 0.02em;
      }

      .hero-description {
        color: var(--text-muted);
        font-size: 0.9375rem;
        line-height: 1.7;
        margin: 0 0 1.25rem;
      }

      .hero-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
        font-size: 0.875rem;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--text-muted);
      }

      .meta-label {
        font-family: var(--mono);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
      }

      .meta-value {
        color: var(--text);
      }

      .meta-value a {
        color: var(--text);
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .meta-value a:hover {
        color: var(--accent);
      }

      @media (max-width: 600px) {
        .hero-top {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .hero-title h1 {
          font-size: 1.5rem;
        }
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="hero">
        <div class="hero-top">
          <img
            width="56"
            height="29"
            class="logo noprint"
            [src]="
              themeService.isDark() ? 'utsc-logo.svg' : 'utsc-logo-dark.svg'
            "
            alt="UTSC Logo"
          />
          <div class="hero-title">
            <h1>
              <span class="course-code-display">{{ courseCode }}</span> —
              {{ courseTitle }}
            </h1>
            <div class="hero-subtitle">
              {{ semester }} &middot; University of Toronto Scarborough
            </div>
          </div>
        </div>

        <p class="hero-description">{{ description }}</p>

        <div class="hero-meta">
          <div class="meta-item">
            <span class="meta-label">Instructor</span>
            <span class="meta-value">
              @for (
                instructor of instructors;
                track instructor;
                let last = $last
              ) {
                <a target="_blank" [href]="instructor.website">{{
                  instructor.name
                }}</a>
                @if (!last) {
                  <span>, </span>
                }
              }
            </span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Semester</span>
            <span class="meta-value">{{ semester }}</span>
          </div>
        </div>
      </div>

      @if (post$ | async; as post) {
        <analog-markdown [content]="post.content"></analog-markdown>
      }
    </div>
  `,
})
export default class HomePage {
  readonly themeService = inject(ThemeService);
  courseCode = environment.courseCode;
  courseTitle = environment.courseTitle;
  semester = environment.semester;
  description = environment.description;
  instructors: Instructor[] = environment.staff.find(
    (staffType) => staffType.name === "Instructors",
  )?.members as Instructor[];
  post$ = injectContent<FileAttributes>({ customFilename: "syllabus" });
}
