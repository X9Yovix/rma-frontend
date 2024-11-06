import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private apiUrl = `${environment.rmaApiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  getRecipes(page: number = 1, pageSize: number = 5): Observable<any> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("limit", pageSize.toString());
    return this.http.get(`${this.apiUrl}`, { params });
  }

  addRecipe(recipe: FormData): Observable<any> {
    return this.http.post(this.apiUrl, recipe);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateRecipe(id: string, recipe: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchRecipes(
    name: string,
    ingredients: string,
    page: number = 1,
    pageSize: number = 5
  ): Observable<any> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("limit", pageSize.toString())
      .set("name", name)
      .set("ingredients", ingredients);
    return this.http.get(`${this.apiUrl}/advanced/search`, { params });
  }
}
