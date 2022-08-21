import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import Ambalaza from 'src/app/models/ambalaza.model';
import AmbalazaLoaner from 'src/app/models/ambalazaloaner.model';
import { AmbalazaDetailService } from 'src/app/services/ambalaza-detail.service';
import { AmbalazaserviceService } from 'src/app/services/ambalazaservice.service';
import { AmbalazaNewComponent } from '../ambalaza-new/ambalaza-new.component';
import { AmbalazaReturnComponent } from '../ambalaza-return/ambalaza-return.component';

@Component({
  selector: 'app-ambalaza-review',
  templateUrl: './ambalaza-review.component.html',
  styleUrls: ['./ambalaza-review.component.css']
})
export class AmbalazaReviewComponent implements OnInit {

  constructor(private curService: AmbalazaDetailService, private dialog: MatDialog, private loanerBottleService: AmbalazaserviceService) { }
  loaner: AmbalazaLoaner;
  ambalaza: Ambalaza[];
  ambalazaDatumi: Ambalaza[];


  ngOnInit(): void {
    this.loaner = JSON.parse(localStorage.getItem("chosenBottleLoaner") || '{}');
    this.getDebts();
    this.getDateAmbalaza();
  }


  getDebts(): void {
    this.curService.getAll(this.loaner.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      // data.forEach(d=>{
      //   if ((d.flase!)==0 && (d.gajba!)==0){
      //     this.curService.delete(this.loaner.id!,d.tip!);
      //   }

      // })

      this.ambalaza = data;

    });
  }

  getDateAmbalaza(): void {
    this.curService.getAllWithDates(this.loaner.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {

      this.ambalazaDatumi = data;

    });
  }

  toReturnGajbe: number;
  toReturnFlase: number;
  date: Date;
  getDate(milies: any) {
    return milies * -1
  }
  returnAmbalaza(bottle: Ambalaza) {
    const dialogRef = this.dialog.open(AmbalazaReturnComponent, {
      width: '350px',
      data: {
        toReturnGajbe: 0,
        toReturnFlase: 0,
        date: this.date
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if ((result.toReturnFlase == null && result.toReturnGajbe == null) || (result.date == null)) {
        alert("Greska!");
        return;
      } else {
        if (result.toReturnFlase == 0 && result.toReturnGajbe == 0) {
          alert("Greska!");
          return;
        }
      }

      this.date = result.date;
      this.date.setSeconds(0);
      this.date.setMinutes(0);
      this.date.setHours(0);
      var ambalaza = new Ambalaza();
      ambalaza.id = "";
      ambalaza.gajba = result.toReturnGajbe;
      ambalaza.flase = result.toReturnFlase;
      ambalaza.date = this.date.getTime() * (-1);
      ambalaza.tip = bottle.tip!;
      ambalaza.returned = "da";
      var newGajbaNumber = bottle.gajba! - result.toReturnGajbe;
      var newFlaseNumber = bottle.flase! - result.toReturnFlase;
      var b = false;
      if (newGajbaNumber < 0 || newFlaseNumber < 0) {
        alert("Nije moguce vratiti vise od zaduzenog");
        return;
      }
      if (newGajbaNumber >= 0 && result.toReturnGajbe) {
        this.curService.update(ambalaza, this.loaner.id!, bottle.tip!, { gajba: newGajbaNumber })
        b = true;
      }
      if (newFlaseNumber >= 0 && result.toReturnFlase) {
        this.curService.update(ambalaza, this.loaner.id!, bottle.tip!, { flase: newFlaseNumber })
        b = true;
      }
      if (b) {
        this.curService.addToDates(ambalaza, this.loaner.id!);
      }
      if (newGajbaNumber == 0 && newFlaseNumber == 0) {
        //izbrisati dete
        this.curService.delete(this.loaner.id!, bottle.tip!);
        //proveriti da li je poslednje dete, ako jeste nije vise zaduzen
        if (this.ambalaza.length == 1) {
          this.loanerBottleService.update(this.loaner.id!, { zaduzen: "ne" });
        }
      }
      bottle.flase = newFlaseNumber;
      bottle.gajba = newGajbaNumber;



    });
  }
}