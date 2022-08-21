import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Distributor from 'src/app/models/distributors.model';
import FlourDebt from 'src/app/models/flourdebt.model';
import { FlourdebtService } from 'src/app/services/flourdebt.service';

@Component({
  selector: 'app-distributordebts',
  templateUrl: './distributordebts.component.html',
  styleUrls: ['./distributordebts.component.css']
})
export class DistributordebtsComponent implements OnInit {
  distributor: Distributor;
  debts: FlourDebt[];
  constructor(private flourDebtService: FlourdebtService) { }

  ngOnInit(): void {

    this.distributor = JSON.parse(localStorage.getItem("chosenDistributor") || '{}');
    this.getDebts();
  }


  getDebts(): void {
    this.flourDebtService.getAll(this.distributor.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.debts = data;
    });
  }

  getDate(milies: any) {
    return milies * -1
  }
}
