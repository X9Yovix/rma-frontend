import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../models/user.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.rmaApiUrl}/users`;

  private loggedInSubject = new BehaviorSubject<boolean>(this.defaultState());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  defaultState(): boolean {
    return !!localStorage.getItem("accessToken");
  }

  updateIsLoggedInStatus(isLoggedIn: boolean): void {
    this.loggedInSubject.next(isLoggedIn);
  }

  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify`);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: user.email,
      password: user.password,
    });
  }

  logout(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}
