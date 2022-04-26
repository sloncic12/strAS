import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { NewUserDialogComponent } from 'src/app/dialogs/new-user-dialog/new-user-dialog.component';
import Distributor from 'src/app/models/distributors.model';
import { DistributorsService } from 'src/app/services/distributors.service';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {
  loaners: Distributor[];
  constructor(private distributorService: DistributorsService,private ruter:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getLoaners();
  }
  getLoaners(): void{
    this.distributorService.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.loaners = data;
    });
  }
  goToDetails(id:any):void{
    localStorage.setItem("chosenDistributor",JSON.stringify(id));
    
    this.ruter.navigate(['distributeri/pregled']);

  }
  
newLoaner(){

  const dialogRef = this.dialog.open(NewUserDialogComponent, {
    width: '250px',
    data: { toReturn: ""},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result==""){
      alert("Greska!");
      return;
    }
    var l=new Distributor();
    l.name=result;
    l.cedulja=0;
    l.cena=0;
    l.id="";
    this.distributorService.add(l);
  });
}
}
