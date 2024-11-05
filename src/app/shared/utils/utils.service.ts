import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    action: string = "Close",
    config?: MatSnackBarConfig
  ) {
    const defaultConfig: MatSnackBarConfig = {
      duration: 2000,
      verticalPosition: "top",
    };

    this.snackBar.open(message, action, { ...defaultConfig, ...config });
  }
}
