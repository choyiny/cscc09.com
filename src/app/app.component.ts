import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgFor, NgIf],
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
        <li><span class="course">CSCC09</span> Summer 2024</li>

        <li *ngFor="let item of navItems">
          <a class="nav-link" [routerLink]="item.path">{{ item.name }}</a>
        </li>
      </ul>
    </nav>

    <div>
      <div class="collapse hidden" #collapse>
        <ul class="links">
          <li *ngFor="let item of navItems">
            <a class="nav-link" [routerLink]="item.path">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <main>
      <router-outlet />
    </main>

    <footer class="noprint">
      <div class="footer-line">
        <p>
          © 2024 Cho Yin Yong. Made with
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

        ul {
          @media screen and (max-width: 48em) {
            display: none;
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

      @media (max-width: 768px) {
        main {
          max-width: 90%;
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
      name: "Team",
      path: "/team",
    },
  ];
}
