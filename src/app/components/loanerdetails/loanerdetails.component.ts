import { Component, OnInit, ViewChild } from '@angular/core';
import Loaners from 'src/app/models/loaners.model';
import { NewDebtComponent } from './new-debt/new-debt.component';
import { ReturnDebtComponent } from './return-debt/return-debt.component';

@Component({
  selector: 'app-loanerdetails',
  templateUrl: './loanerdetails.component.html',
  styleUrls: ['./loanerdetails.component.css']
})
export class LoanerdetailsComponent implements OnInit {
 
  
  @ViewChild(ReturnDebtComponent) child1:ReturnDebtComponent;
  
  @ViewChild(NewDebtComponent) child2:NewDebtComponent;
  constructor() { }
  loaner: Loaners;
  selected:number;
  ngOnInit(): void {
   this.loaner= JSON.parse( localStorage.getItem("chosenLoaner") || '{}');
  this.selected=0;
  
  }
 
  setSelected(n:any){
    this.selected=n;
    localStorage.setItem("selected",n);
    this.loaner= JSON.parse( localStorage.getItem("chosenLoaner") || '{}');
 
  }
  


}
