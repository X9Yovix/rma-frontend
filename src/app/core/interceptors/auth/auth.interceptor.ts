import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const clone = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${accessToken}`),
    });
    return next(clone);
  }

  return next(req);
};
