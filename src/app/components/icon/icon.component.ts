import { Component, Input } from "@angular/core";

@Component({ selector: "app-icon", templateUrl: "./icon.component.html" })
export class IconComponent {
  @Input() icon: string | undefined;
}
