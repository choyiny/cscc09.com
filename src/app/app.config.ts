import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideFileRouter } from "@analogjs/router";
import { provideContent, withMarkdownRenderer } from "@analogjs/content";
import { withInMemoryScrolling } from "@angular/router";
import { withPrismHighlighter } from "@analogjs/content/prism-highlighter";

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
        anchorScrolling: "enabled",
      }),
    ),
    provideHttpClient(),
    provideClientHydration(),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
  ],
};
