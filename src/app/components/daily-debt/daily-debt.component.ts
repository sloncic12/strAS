import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import Debt from 'src/app/models/dug.model';
import Loaners from 'src/app/models/loaners.model';
import { DebtService } from 'src/app/services/debt.service';
import { LoanersService } from 'src/app/services/loaners.service';

@Component({
  selector: 'app-daily-debt',
  templateUrl: './daily-debt.component.html',
  styleUrls: ['./daily-debt.component.css']
})
export class DailyDebtComponent implements OnInit {


  constructor(private fb: FormBuilder,private debtService:DebtService,private loanerService:LoanersService) { }

  loaners: Loaners[];
  selectedRadio:string;
  myForm:Form;
  date1:Date;
  sumUzeto:number;
  sumVraceno:number;
  date2:Date;
  debts :Debt[];
  ngOnInit(): void {
    this.selectedRadio="1";
    this.sumUzeto=0;
    this.sumVraceno=0;
  }


  submitCompany(form:any){
    this.sumVraceno=0;
    this.sumUzeto=0;
    this.date1.setSeconds(0);
    this.date1.setMinutes(0);
    this.date1.setHours(0);
    var dateTo=this.date1.getTime()*(-1);
    if (this.date2!=null){
    this.date2.setSeconds(0);
    this.date2.setMinutes(0);
    this.date2.setHours(0);


    var dateFrom=this.date2.getTime()*(-1);
    this.loanerService.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.loaners = data;
      this.loaners.forEach(loaner=>{



        this.debtService.getAll(loaner.id).snapshotChanges().pipe(
          map(changes=>
            changes.map(c=>({
              key: c.payload, ...c.payload.val()
            })))
        ).subscribe(data => {
          this.debts=data;
          
          this.debts.forEach(debt=>{

            if ((debt.date! <= dateTo) && (debt.date! >= dateFrom)) {
              if (debt.opis != "vracen") {
                  this.sumUzeto = this.sumUzeto+ debt.value!;
              } else {
                  this.sumVraceno =  this.sumVraceno+ debt.value!;
                  
              }
            }
          });




        });









      });
    });


    }else{
      
    this.loanerService.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.loaners = data;
      this.loaners.forEach(loaner=>{



        this.debtService.getAll(loaner.id).snapshotChanges().pipe(
          map(changes=>
            changes.map(c=>({
              key: c.payload, ...c.payload.val()
            })))
        ).subscribe(data => {
          this.debts=data;
          
          this.debts.forEach(debt=>{


            if (debt.date == dateTo) {
              if (debt.opis != "vracen") {
                  this.sumUzeto = this.sumUzeto+ debt.value!;
              } else {
                  this.sumVraceno =  this.sumVraceno+ debt.value!;
                  
              }
            }
          });




        });









      });
    });

    }

     
    }

    dateChangedOne($event:any){
     this.date1= $event.target.value;
    }

    dateChangedTwo($event:any){
      this.date2= $event.target.value;
     }
  }

