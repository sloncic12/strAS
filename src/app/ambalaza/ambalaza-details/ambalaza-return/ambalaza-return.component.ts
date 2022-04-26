import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ambalaza-return',
  templateUrl: './ambalaza-return.component.html',
  styleUrls: ['./ambalaza-return.component.css']
})
export class AmbalazaReturnComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AmbalazaReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  date1:Date;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {

  }

  
  dateChangedOne($event:any){
    this.data.date= $event.target.value;
   }

}
