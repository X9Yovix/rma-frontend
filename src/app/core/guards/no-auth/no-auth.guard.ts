import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map((response) => {
      console.log("noAuthGuard response: ", response);
      router.navigateByUrl("/dashboard");
      return false;
    }),
    catchError((error) => {
      console.error("noAuthGuard error: ", error);
      return of(true);
    })
  );
};
