import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {


  categories: Array<string> = [
    'Voce i povrce',
    'Pice',
    "Mlecni proizvodi",
    "Suhomesnato",
    "Hemija",
    "Cigarete",
    "Kafa",
    "Ostalo"]

  quantity: Array<string> = [
    "Nema na stanju",
    "Pri kraju"
  ]
  constructor(
    public dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
