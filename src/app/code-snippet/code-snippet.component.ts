import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-code-snippet",
  templateUrl: "./code-snippet.component.html",
  styles: [],
})
export class CodeSnippetComponent implements OnInit {
  trustedUrl: SafeResourceUrl;
  iframeSrc = "https://codespace.app/s/helloworld-WpmbkW5bzJ";

  constructor(public sanitizer: DomSanitizer) {
    this.trustedUrl = this.iframeSrc
      ? this.sanitizer.bypassSecurityTrustUrl(this.iframeSrc)
      : "";
  }

  ngOnInit(): void {}
}
