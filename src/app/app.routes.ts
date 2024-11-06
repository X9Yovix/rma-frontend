import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth/auth.guard";
import { noAuthGuard } from "./core/guards/no-auth/no-auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AddComponent } from "./pages/dashboard/add/add.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: "dashboard/add",
    component: AddComponent,
    canActivate: [authGuard],
  },
];
