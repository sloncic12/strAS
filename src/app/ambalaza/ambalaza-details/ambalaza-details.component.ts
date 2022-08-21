import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DialogDeleteUserComponent } from 'src/app/components/loanerdetails/dialog-delete-user/dialog-delete-user.component';
import { AmbalazaserviceService } from 'src/app/services/ambalazaservice.service';
import Ambalaza from '../../models/ambalaza.model';
import AmbalazaLoaner from '../../models/ambalazaloaner.model';
import { AmbalazaDetailService } from '../../services/ambalaza-detail.service';

@Component({
  selector: 'app-ambalaza-details',
  templateUrl: './ambalaza-details.component.html',
  styleUrls: ['./ambalaza-details.component.css']
})
export class AmbalazaDetailsComponent implements OnInit {

  constructor(private ruter: Router, public dialog: MatDialog, private ambalazaService: AmbalazaDetailService, private bottleLoanerService: AmbalazaserviceService) { }

  loaner: AmbalazaLoaner;
  selected: number;
  ngOnInit(): void {
    this.loaner = JSON.parse(localStorage.getItem("chosenBottleLoaner") || '{}');
    this.selected = 0;

  }

  setSelected(n: any) {
    this.selected = n;
    localStorage.setItem("selected", n);
  }

  deleteUser() {
    //otvori dijalog za potvrdu
    if (this.loaner.zaduzen == 'ne') {
      const dialogRef = this.dialog.open(DialogDeleteUserComponent, {
        width: '250px',
        data: { toReturn: "" },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result == "ok") {

          this.ambalazaService.deleteAllBottleDates(this.loaner.id!).then(() => {
            this.bottleLoanerService.delete(this.loaner.id!)
            localStorage.removeItem("chosenLoaner")
            this.ruter.navigate(['ambalaza']);

            alert("Uspesno izbrisano")
          });
        }
      });



    } else {
      alert("Nije moguce izbrisati korisnika sa postojecim dugom!")
    }
  }

}
