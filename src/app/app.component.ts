import { Component, OnInit } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterOutlet } from "@angular/router";

import { ThemingService } from "./shared/services/theme/theming.service";
import { ToolbarComponent } from "./shared/components/toolbar/toolbar/toolbar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule, ToolbarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  constructor(private themingService: ThemingService) {}

  ngOnInit(): void {
    this.themingService.loadTheme();
  }
}
