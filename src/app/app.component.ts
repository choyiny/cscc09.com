import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav class="noprint">
      <div class="burger">
        <button (click)="collapse.classList.toggle('hidden')">
          <div class="burger-line"></div>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
        </button>
      </div>

      <ul class="links">
        <li>
          <span class="course">{{ courseCode }}</span> {{ semester }}
        </li>

        @for (item of navItems; track item) {
          <li>
            @if (item.path.startsWith("http")) {
              <a class="nav-link" href="{{ item.path }}" target="_blank">{{
                item.name
              }}</a>
            } @else {
              <a class="nav-link" [routerLink]="item.path">{{ item.name }}</a>
            }
          </li>
        }
      </ul>
    </nav>

    <div>
      <div class="collapse hidden" #collapse>
        <ul class="links">
          @for (item of navItems; track item) {
            <li>
              <a class="nav-link" [routerLink]="item.path">{{ item.name }}</a>
            </li>
          }
        </ul>
      </div>
    </div>

    <main>
      <router-outlet />
    </main>

    <footer class="noprint">
      <div class="footer-line">
        <p>
          © 2025 Cho Yin Yong. Made with
          <a href="https://analogjs.org">Analog</a>.
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .burger {
        display: flex;
        justify-content: center;

        @media screen and (min-width: 48em) {
          display: none;
          flex: auto;
        }

        button {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          transition-property: box-shadow;
          transition-duration: 150ms;
          transition-timing-function: cubic-bezier(0, 0, 0.4, 1);
          align-self: center;
          margin: 8px;
          padding: 8px;
          cursor: pointer;

          &:focus {
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
          }
        }
      }

      .burger-line {
        width: 30px;
        height: 3px;
        background-color: #e2e8f0;
      }

      footer {
        padding: 10px;
        background-color: rgb(23, 25, 35);
        display: flex;
        justify-content: center;
        margin-top: auto;
      }

      .course {
        color: var(--blue);
        font-weight: var(--bold);
      }

      main {
        width: 85%;
        margin: 0 auto;
      }

      nav {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #171923;

        ul li:not(:first-child) {
          @media screen and (max-width: 767px) {
            display: none !important;
          }
        }
      }

      .collapse {
        opacity: 1;
        height: 100%;
        max-height: 260px;
        transition:
          max-height 0.3s linear,
          opacity 0.5s linear;
        overflow: hidden;

        &.hidden {
          opacity: 0;
          max-height: 0;
        }

        .links {
          flex-direction: column;
          align-items: start;
          height: 100%;
        }
      }

      .links {
        list-style: none;
        display: flex;
        gap: 16px;
        height: 60px;
        padding: 16px;
        align-items: center;
        margin: 0;
      }

      @media (max-width: 767px) {
        main {
          max-width: 90%;
        }
      }

      @media (min-width: 768px) {
        .collapse {
          display: none;
        }
      }

      .nav-link {
        transition-property: box-shadow;
        transition-duration: 150ms;
        transition-timing-function: cubic-bezier(0, 0, 0.4, 1);
        cursor: pointer;
        text-decoration: none;
        outline: transparent solid 2px;
        outline-offset: 2px;
        color: #e2e8f0;
        padding: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
      }

      a:focus {
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
      }
    `,
  ],
})
export class AppComponent {
  navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Lectures",
      path: "/lectures",
    },
    {
      name: "Coursework",
      path: "/work",
    },
    {
      name: "Resources",
      path: "/resources",
    },
    {
      name: "Team",
      path: "/team",
    },
    {
      name: "Feedback",
      path: "https://forms.gle/aJ6bsaZ7cBmp2u6W7",
    },
  ];

  courseCode = environment.courseCode;
  semester = environment.semester;
}
