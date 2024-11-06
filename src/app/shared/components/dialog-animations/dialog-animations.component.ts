import { Component, Inject, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-dialog-animations",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: "./dialog-animations.component.html",
  styleUrl: "./dialog-animations.component.css",
})
export class DialogAnimationsComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsComponent>);
  elementName: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    //console.log(this.data);
    this.elementName = this.data.name;
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
