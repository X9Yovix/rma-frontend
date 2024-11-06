import { Component, OnInit } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { ThemingService } from "../../../services/theme/theming.service";
import { MatButtonModule } from "@angular/material/button";
import { Subscription } from "rxjs";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [MatToolbar, MatToolbarRow, MatIcon, MatButtonModule],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.css",
})
export class ToolbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  tokenSubscription!: Subscription;

  constructor(
    private readonly themingService: ThemingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tokenSubscription = this.authService.loggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  switchTheme() {
    this.themingService.toggleTheme(!this.themingService.isDarkMode);
  }

  isDarkMode() {
    return this.themingService.isDarkMode;
  }

  logout() {
    this.authService.logout();
    this.authService.updateIsLoggedInStatus(false);
    this.router.navigateByUrl("/login");
  }
}
