import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { map } from 'rxjs';
import Bread from 'src/app/models/bread.model';
import Distributor from 'src/app/models/distributors.model';
import Pastry from 'src/app/models/pastry.model';
import { BreadService } from 'src/app/services/bread.service';
import { DistributorsService } from 'src/app/services/distributors.service';
import { PastryService } from 'src/app/services/pastry.service';

@Component({
  selector: 'app-bread-new',
  templateUrl: './bread-new.component.html',
  styleUrls: ['./bread-new.component.css']
})
export class BreadNewComponent implements OnInit {
  iznos: number;
  picker: any;
  opis: string;
  myForm: Form;
  date: Date;
  selectedDistributor: string;
  pastries: Pastry[];
  selectedPastry: string;
  distributors: Distributor[];
  constructor(private fb: FormBuilder, private ruter: Router, private distributorService: DistributorsService, private pastryService: PastryService, private breadService: BreadService) { }

  ngOnInit(): void {
    this.getDistributors();
  }



  getDistributors(): void {
    this.distributorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.distributors = data;
    });
  }

  dateChanged($event: any) {
    this.date = $event.target.value;
  }


  submitCompany(form: any) {


    if (form.value.iznos == 0) {
      alert("Lose popunjeno");
      return;
    }
    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setHours(0);
    var b = new Bread();
    b.id = "";
    b.datum = this.date.getTime() * (-1);
    b.kolicina = form.value.iznos;
    b.distributor = this.selectedDistributor;
    b.type = this.selectedPastry;
    var curDistributor = this.distributors[0];
    this.distributors.forEach(v => {
      if (v.name == this.selectedDistributor) {
        curDistributor = v;
      }
    });

    this.breadService.addNewBread(b);

    if (this.selectedPastry != "HLEB") {
      if (this.selectedDistributor == "Gadzin" && this.selectedPastry == "LEPINJA") {
        var newCedulja = curDistributor.cedulja! - b.kolicina! * 0.9;
        this.distributorService.update(curDistributor.id!, { cedulja: newCedulja })

      } else {
        var curpastry = this.pastries[0];
        this.pastries.forEach(v => {
          if (v.name == this.selectedPastry) {
            curpastry = v;
          }
        });

        var newCena = curDistributor.cena! - form.value.iznos * curpastry.cena!;
        this.distributorService.update(curDistributor.id!, { cena: newCena })

      }
    } else {
      var k = 0;
      if (this.selectedDistributor != "Stanimirovic") {
        k = b.kolicina! * 0.9;
      } else {
        k = b.kolicina!;
      }
      var newCedulja = curDistributor.cedulja! - k!;
      this.distributorService.update(curDistributor.id!, { cedulja: newCedulja })

    }
    alert("Uspesno dodato!");
    this.ruter.navigate(['hleb']);
  }

  onChange() {

    this.distributors.forEach(v => {
      if (v.name == this.selectedDistributor) {

        this.pastryService.getAll(v.id).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({
              key: c.payload, ...c.payload.val()
            })))
        ).subscribe(data => {
          this.pastries = data;
        });


      }


    });

  }
}
