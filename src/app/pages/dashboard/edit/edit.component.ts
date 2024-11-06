import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../../../core/services/recipe/recipe.service";
import { UtilsService } from "../../../shared/utils/utils.service";
import { MatCardModule } from "@angular/material/card";
import { environment } from "../../../../environments/environment.development";

@Component({
  selector: "app-edit",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    MatCardModule,
  ],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.css",
})
export class EditComponent implements OnInit {
  recipeForm!: FormGroup;
  isVisible: boolean = false;
  errorMessage: Map<string, string> = new Map();
  isLoading: boolean = false;
  image: File | null = null;

  imagePreviewUrl: string | null = null;
  imagePlaceholderUrl = "assets/images/add/thumbnail.png";

  recipeId: string | null = null;
  createdAt: string | null = null;
  updatedAt: string | null = null;

  get name() {
    return this.recipeForm.get("name");
  }
  get description() {
    return this.recipeForm.get("description");
  }
  get ingredients() {
    return this.recipeForm.get("ingredients");
  }
  get instructions() {
    return this.recipeForm.get("instructions");
  }

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupForm();
    this.fetchRecipe();
  }

  setupForm() {
    this.recipeForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      ingredients: ["", Validators.required],
      instructions: ["", Validators.required],
    });
  }

  fetchRecipe() {
    this.isLoading = true;
    this.recipeId = this.route.snapshot.paramMap.get("id") as string;
    this.recipeService.getRecipe(this.recipeId).subscribe({
      next: (response) => {
        this.recipeForm.patchValue({
          name: response.name,
          description: response.description,
          ingredients: response.ingredients.join(", "),
          instructions: response.instructions,
        });
        if (response.image) {
          this.imagePreviewUrl = environment.rmabackendUrl + response.image;
        }
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
      },
      error: (error) => {
        console.error(error);
        this.utils.openSnackBar(error.error.error, "error");
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  updateErrorMessage() {
    if (this.name && this.name.invalid) {
      if (this.name.hasError("required")) {
        this.errorMessage.set("name", "Name is required");
      }
    } else {
      this.errorMessage.delete("name");
    }

    if (this.description && this.description.invalid) {
      if (this.description.hasError("required")) {
        this.errorMessage.set("description", "Description is required");
      }
    } else {
      this.errorMessage.delete("description");
    }

    if (this.instructions && this.instructions.invalid) {
      if (this.instructions.hasError("required")) {
        this.errorMessage.set("instructions", "Instructions is required");
      }
    } else {
      this.errorMessage.delete("instructions");
    }

    if (this.ingredients && this.ingredients.invalid) {
      if (this.ingredients.hasError("required")) {
        this.errorMessage.set("ingredients", "Ingredients is required");
      }
    } else {
      this.errorMessage.delete("ingredients");
    }
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.recipeForm.valid) {
      this.isLoading = true;
      this.recipeForm.disable();

      const formData = new FormData();
      formData.append("name", this.recipeForm.value.name.trim());
      formData.append("description", this.recipeForm.value.description.trim());
      const ingredients = this.recipeForm.value.ingredients
        .split(",")
        .map((ingredient: string) => ingredient.trim())
        .filter((ingredient: string) => ingredient.length > 0);
      ingredients.forEach((value: string) => {
        formData.append(`ingredients`, value);
      });
      formData.append(
        "instructions",
        this.recipeForm.value.instructions.trim()
      );
      if (this.image) {
        formData.append("image", this.image as File);
      }

      if (this.recipeId) {
        this.recipeService.updateRecipe(this.recipeId, formData).subscribe({
          next: (response) => {
            this.utils.openSnackBar(response.message, "success");
            this.goBackToDashboard();
          },
          error: (error) => {
            this.utils.openSnackBar(error.error.error, "error");
            this.isLoading = false;
            this.recipeForm.enable();
          },
          complete: () => {
            this.isLoading = false;
            this.onClear();
            this.recipeForm.enable();
          },
        });
      }
    } else {
      this.updateErrorMessage();
    }
  }

  onClear() {
    this.recipeForm.reset();
  }

  goBackToDashboard() {
    const pageParam = this.route.snapshot.queryParamMap.get("page");
    if (pageParam) {
      this.router.navigateByUrl(`/dashboard?page=${pageParam}`);
    } else {
      this.router.navigateByUrl(`/dashboard`);
    }
  }
}
