import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-return-bread-dialog',
  templateUrl: './return-bread-dialog.component.html',
  styleUrls: ['./return-bread-dialog.component.css']
})
export class ReturnBreadDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReturnBreadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {

  }
}
