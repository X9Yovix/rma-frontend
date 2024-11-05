import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.rmaApiUrl}/users`;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: user.email,
      password: user.password,
    });
  }
}
