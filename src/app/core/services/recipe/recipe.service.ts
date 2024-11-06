import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RecipeInterface } from "../../interfaces/recipe/recipe-interface";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private apiUrl = `${environment.rmaApiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  getRecipes(page: number = 1, pageSize: number = 5): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${pageSize}`);
  }
}
