import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map((response) => {
      console.log("authGuard response: ", response);
      return true;
    }),
    catchError((error) => {
      console.error("authGuard error: ", error);
      authService.logout();
      router.navigateByUrl("/login");
      return of(false);
    })
  );
};
