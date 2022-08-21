import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import BreadPrice from 'src/app/models/bread_price.model';
import Distributor from 'src/app/models/distributors.model';
import Pastry from 'src/app/models/pastry.model';
import { PastryService } from 'src/app/services/pastry.service';
import { DialogPriceChangeComponent } from './dialog-price-change/dialog-price-change.component';

@Component({
  selector: 'app-distributorpastries',
  templateUrl: './distributorpastries.component.html',
  styleUrls: ['./distributorpastries.component.css']
})
export class DistributorpastriesComponent implements OnInit {

  pastries: Pastry[];
  newPrice: number;
  distributor: Distributor;
  constructor(private pastryService: PastryService, private ruter: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.distributor = JSON.parse(localStorage.getItem("chosenDistributor") || '{}');
    this.getLoaners();
  }

  getLoaners(): void {
    this.pastryService.getAll(this.distributor.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.pastries = data;
    });
  }

  changePastry(pastry: any): void {

    const dialogRef = this.dialog.open(DialogPriceChangeComponent, {
      width: '250px',
      data: { name: pastry.name, newPrice: this.newPrice },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newPrice = result;
      this.pastryService.update(this.distributor.id!, pastry.name, { cena: this.newPrice })
        .then(() => {
          pastry.cena = this.newPrice;
          if (pastry.name == "HLEB") {
            var breadPrice = new BreadPrice();
            var date = new Date();
            breadPrice.date = date.getTime();
            breadPrice.id = "";
            breadPrice.value = this.newPrice
            this.pastryService.addNewBreadPrice(this.distributor.id!, breadPrice)
          }
          alert("Uspesno dodato!");
        })
        .catch(err => console.log(err));



    });
    //change pastry
    //   localStorage.setItem("chosenLoaner",JSON.stringify(id));

    //this.ruter.navigate(['dug/duznik']);
    //
  }


}
