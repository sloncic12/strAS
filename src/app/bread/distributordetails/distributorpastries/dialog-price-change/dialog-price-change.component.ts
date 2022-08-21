import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-price-change',
  templateUrl: './dialog-price-change.component.html',
  styleUrls: ['./dialog-price-change.component.css']
})
export class DialogPriceChangeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPriceChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {

  }
}
