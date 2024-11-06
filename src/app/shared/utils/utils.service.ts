import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    type?: string,
    action: string = "Close",
    config?: MatSnackBarConfig
  ) {
    const defaultConfig: MatSnackBarConfig = {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["error-snackbar"],
    };

    if (type === "success") {
      defaultConfig.panelClass = ["success-snackbar"];
    } else if (type === "error") {
      defaultConfig.panelClass = ["error-snackbar"];
    } else {
      defaultConfig.panelClass = [];
    }

    this.snackBar.open(message, action, { ...defaultConfig, ...config });
  }
}
