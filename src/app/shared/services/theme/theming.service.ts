import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class ThemingService {
  private currentTheme = "theme-light";

  get isDarkMode(): boolean {
    return this.currentTheme === "theme-dark";
  }

  toggleTheme(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? "theme-dark" : "theme-light";
    document.body.className = this.currentTheme;
    localStorage.setItem("activeTheme", this.currentTheme);
  }

  loadTheme() {
    this.currentTheme = localStorage.getItem("activeTheme") || "theme-light";
    document.body.className = this.currentTheme;
  }
}
