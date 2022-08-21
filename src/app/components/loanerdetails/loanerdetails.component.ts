import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Loaners from 'src/app/models/loaners.model';
import { DebtService } from 'src/app/services/debt.service';
import { LoanersService } from 'src/app/services/loaners.service';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
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
  constructor(public dialog: MatDialog, public debtService:DebtService,private ruter: Router, public loanerService:LoanersService) { }
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
  
  deleteUser(){
    //otvori dijalog za potvrdu
    if(this.loaner.totalDebt!>=0){
    const dialogRef = this.dialog.open(DialogDeleteUserComponent, {
      width: '250px',
      data: { toReturn: ""},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result=="ok"){
    
        this.debtService.deleteAllDebts(this.loaner.id!).then(() => {
        this.loanerService.delete(this.loaner.id!)
        localStorage.removeItem("chosenLoaner")
        this.ruter.navigate(['dug']);

      alert("Uspesno izbrisano")
        });
    }});
  }else{
    
  alert("Nije moguce izbrisati korisnika sa postojecim dugom!")
  }

  }

}
