import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import Bread from 'src/app/models/bread.model';
import Distributor from 'src/app/models/distributors.model';
import { BreadService } from 'src/app/services/bread.service';
import { PastryService } from 'src/app/services/pastry.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { FlourdebtService } from 'src/app/services/flourdebt.service';
import BreadPrice from 'src/app/models/bread_price.model';
import { BreadReturnedComponent } from '../../bread-returned/bread-returned.component';
@Component({
  selector: 'app-distributorbreadreview',
  templateUrl: './distributorbreadreview.component.html',
  styleUrls: ['./distributorbreadreview.component.css']
})
export class DistributorbreadreviewComponent implements OnInit {

  constructor(private pastryService: PastryService, private breadService: BreadService, private fb: FormBuilder, private flourDebtService: FlourdebtService) { }
  date1: Date;
  pastries: string[] = [];

  breadPrices: BreadPrice[] = [];
  myForm: Form;
  bread: Bread[] = [];
  breadSums: Bread[] = [];
  iznos: number;

  iznosUKg: number;
  cedulje: number;
  distributor: Distributor;
  date2: Date;
  ngOnInit(): void {

    this.distributor = JSON.parse(localStorage.getItem("chosenDistributor") || '{}');
    this.getLoaners();
    this.getBreadPrice();
  }


  submitCompany(form: any) {

    if (this.date1 != null && this.date2 != null) {
      this.breadSums = [];
      this.bread = [];
      const size = this.pastries.length;
      let scores: number[] = [];
      for (var i = 0; i < size; i++) {
        scores.push(0);
      }
      this.cedulje = 0;
      this.iznos = 0;
      this.iznosUKg = 0;
      let currentBreadPrice = 0;
      this.breadService.getAllInsideDates(this.date1.getTime() * (-1), this.date2.getTime() * (-1)).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({
            key: c.payload, ...c.payload.val()
          })))
      ).subscribe(data => {
        //code goes here
        data.forEach(bread => {
          if (bread.distributor == this.distributor.name) {
            this.bread.push(bread);
            var pos = this.pastries.indexOf(bread.type!);
            scores[pos] += bread.kolicina!;

          }
        })
        this.flourDebtService.getAllInsideDates(this.distributor.id!, this.date1.getTime() * (-1), this.date2.getTime() * (-1)).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({
              key: c.payload, ...c.payload.val()
            })))
        ).subscribe(data => {
          //code goes here
          data.forEach(bread => {
            if (currentBreadPrice < (this.breadPrices.length - 1)) {
              if ((bread.date! * (-1)) >= this.breadPrices[currentBreadPrice + 1].date!) {

                currentBreadPrice = currentBreadPrice + 1;

              }
            }
            if (bread.cedulja! != 0) {
              this.cedulje = this.cedulje + bread.cedulja!;
            }
            if (bread.value! != 0) {
              this.iznos = this.iznos + bread.value!;
              this.iznosUKg = this.iznosUKg + bread.value! / this.breadPrices[currentBreadPrice].value!;
            }
          }
          )
          this.iznos = this.iznos
          if (this.bread.length > 0) {

            var b: Bread = new Bread();
            b.type = "Cedulja";
            b.kolicina = this.cedulje;

            this.breadSums.push(b);
            var b2: Bread = new Bread();
            b2.type = "Iznos u dinarima";
            b2.kolicina = Math.round(this.iznos);
            this.breadSums.push(b2);
            var b3: Bread = new Bread();
            b3.type = "Iznos u ceduljama";
            b3.kolicina = Math.round(this.iznosUKg);
            this.breadSums.push(b3);
            for (var i = 0; i < scores.length; i++) {

              if (scores[i] > 0) {
                var b: Bread = new Bread();
                b.kolicina = scores[i];
                b.type = this.pastries[i];
                this.breadSums.push(b);
              }

            }
          }




        });


      })
    }
  }


  dateChangedOne($event: any) {
    this.date1 = $event.target.value;
  }

  dateChangedTwo($event: any) {
    this.date2 = $event.target.value;
  }

  getBreadPrice(): void {
    this.pastryService.getBreadPrices(this.distributor.id!).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      data.forEach(p => {
        this.breadPrices.push(p)

      })

    });
  }

  getLoaners(): void {
    this.pastryService.getAll(this.distributor.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      data.forEach(p => {
        this.pastries.push(p.name!);

      })

    });
  }
  getDate(milies: any) {
    return milies * -1
  }
  savePDF() {
    const doc = new jsPDF();
    var store = localStorage.getItem("chosenStore");
    doc.setFontSize(15);
    doc.text(store! + " " + this.distributor.name!, 80, 10);
    autoTable(doc, { theme: 'grid', styles: { fontSize: 10, textColor: 20 }, html: '#content1' })

    autoTable(doc, { theme: 'grid', styles: { fontSize: 10, textColor: 20 }, html: '#content2' })
    doc.save('table.pdf')

  }
}
