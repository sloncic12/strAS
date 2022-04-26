import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Debt from 'src/app/models/dug.model';
import Loaners from 'src/app/models/loaners.model';
import { DebtService } from 'src/app/services/debt.service';

@Component({
  selector: 'app-review-debts',
  templateUrl: './review-debts.component.html',
  styleUrls: ['./review-debts.component.css']
})
export class ReviewDebtsComponent implements OnInit {

  debts :Debt[];
  constructor(private debtService : DebtService) { }
  loaner: Loaners;
  ngOnInit(): void {
   this.loaner= JSON.parse( localStorage.getItem("chosenLoaner") || '{}');
   this.getDebts();
  
  }
  getDebts(): void{
    this.debtService.getAll(this.loaner.id).snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.debts=data;
    });
  }

  getDate(milies:any){
    return milies*-1
  }
  openImage(image:string){
    window.open(image);
  }
}
