import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AuthService } from "../../core/services/auth/auth.service";
import { UtilsService } from "../../shared/utils/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm!: FormGroup;
  isVisible: boolean = false;
  errorMessage: Map<string, string> = new Map();
  isLoading: boolean = false;

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  updateErrorMessage() {
    if (this.email && this.email.invalid) {
      if (this.email.hasError("required")) {
        this.errorMessage.set("email", "Email is required");
      } else if (this.email.hasError("email")) {
        this.errorMessage.set("email", "Not a valid email");
      }
    } else {
      this.errorMessage.delete("email");
    }

    if (this.password && this.password.invalid) {
      if (this.password.hasError("required")) {
        this.errorMessage.set("password", "Password is required");
      }
    } else {
      this.errorMessage.delete("password");
    }
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  onSubmit() {
    try {
      console.log(this.loginForm.value);
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.loginForm.disable();
        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            this.utils.openSnackBar(response.message);
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            this.authService.updateIsLoggedInStatus(true);
            this.router.navigateByUrl("/dashboard");
          },
          error: (error) => {
            console.error(error);
            this.utils.openSnackBar(error.error.error);
          },
        });
      } else {
        this.updateErrorMessage();
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
      this.loginForm.enable();
    }
  }
}
