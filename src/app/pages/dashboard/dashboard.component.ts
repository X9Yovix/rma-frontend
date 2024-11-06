import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RecipeInterface } from "../../core/interfaces/recipe/recipe-interface";
import { RecipeService } from "../../core/services/recipe/recipe.service";
import { CommonModule, DatePipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { UtilsService } from "../../shared/utils/utils.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogAnimationsComponent } from "../../shared/components/dialog-animations/dialog-animations.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatButtonModule,
    MatIcon,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements AfterViewInit, OnInit {
  isLoading: boolean = false;

  displayedColumns: string[] = ["name", "description", "actions"];
  recipesList: RecipeInterface[] = [];
  dataSource = new MatTableDataSource<RecipeInterface>(this.recipesList);

  pageSizes = [5, 10, 100];
  totalRecipes = 0;

  totalPages = 0;
  currentPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);
  elementName: string = "";

  constructor(
    private recipeService: RecipeService,
    private utils: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const pageParam = this.route.snapshot.queryParamMap.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    this.getRecipes(page);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRecipes(page: number = 1, pageSize: number = 5) {
    this.isLoading = true;
    this.recipeService.getRecipes(page, pageSize).subscribe({
      next: (response) => {
        this.recipesList = response.recipes;
        this.totalRecipes = response.totalRecipes;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage - 1;
        this.dataSource = new MatTableDataSource<RecipeInterface>(
          this.recipesList
        );

        if (this.paginator) {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = this.totalRecipes;
        }
      },
      error: (error) => {
        console.error(error);
        this.utils.openSnackBar(error.error.error, "error");
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.getRecipes(event.pageIndex + 1, event.pageSize);
  }

  onCreate() {
    this.router.navigateByUrl("/dashboard/add");
    this.router.navigateByUrl(`/dashboard/add?page=${this.currentPage + 1}`);
  }

  onModify(element: RecipeInterface) {
    this.router.navigateByUrl(
      `/dashboard/edit/${element._id}?page=${this.currentPage + 1}`
    );
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: RecipeInterface
  ): void {
    const dialogRef = this.dialog.open(DialogAnimationsComponent, {
      width: "250px",
      enterAnimationDuration,
      exitAnimationDuration,
      data: { name: element.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "confirm") {
        this.onDelete(element);
      }
    });
  }

  onDelete(element: RecipeInterface) {
    this.recipeService.deleteRecipe(element._id).subscribe({
      next: (response) => {
        this.utils.openSnackBar(response.message, "success");
        this.getRecipes(this.currentPage + 1);
      },
      error: (error) => {
        console.error(error);
        this.utils.openSnackBar(error.error.error, "error");
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
