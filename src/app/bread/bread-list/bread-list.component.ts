import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Bread from 'src/app/models/bread.model';
import Distributor from 'src/app/models/distributors.model';
import Pastry from 'src/app/models/pastry.model';
import { BreadService } from 'src/app/services/bread.service';
import { DistributorsService } from 'src/app/services/distributors.service';
import { PastryService } from 'src/app/services/pastry.service';
import { ReturnBreadDialogComponent } from './return-bread-dialog/return-bread-dialog.component';

@Component({
  selector: 'app-bread-list',
  templateUrl: './bread-list.component.html',
  styleUrls: ['./bread-list.component.css']
})
export class BreadListComponent implements OnInit {


  bread: Bread[];
  toReturn: number;
  distributors: Distributor[];
  pastries:Pastry[];
  public isMenuCollapsed = true;
  constructor(private distributorService:DistributorsService,private pastryService:PastryService, private breadService : BreadService,private ruter: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLoaners();
    this.getDistributors();
    
  }

    getLoaners(): void{
      this.breadService.getAll().snapshotChanges().pipe(
        map(changes=>
          changes.map(c=>({
            key: c.payload, ...c.payload.val()
          })))
      ).subscribe(data => {
        this.bread = data;
      });
    }

    getDate(milies:any){
      return milies*-1
    }
  
    returnBread(selbread:Bread):void{

      const dialogRef = this.dialog.open(ReturnBreadDialogComponent, {
        width: '250px',
        height:'250px',
        data: { toReturn: this.toReturn},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.toReturn = result;
        if (this.toReturn>selbread.kolicina!){
          alert("Greska! Uneta vracena kolicina veca od uzete!");
          return;
        }

        var curDistributor=this.distributors[0];
        this.distributors.forEach(v=>{
          if (v.name==selbread.distributor){
            curDistributor=v;
          }});
          var oldAmount=selbread.kolicina!;
               //doda se novi hleb u vracene
        var returnedBread=new Bread();
        returnedBread.kolicina=this.toReturn;
        returnedBread.datum=selbread.datum;
        returnedBread.distributor=selbread.distributor;
        returnedBread.type=selbread.type;
        returnedBread.id="";
        this.breadService.addReturned(returnedBread)

        //smanji se uzeti ili izbrise ako treba
        var newAmount=selbread.kolicina!-this.toReturn;
        if (newAmount>0){
        this.breadService.update(selbread.id!,{kolicina: newAmount})
        .then(() => {
          selbread.kolicina=newAmount;
          if (selbread.type=="HLEB"  || (selbread.type=="LEPINJA" && selbread.distributor=="Gadzin")){
            if(((selbread.distributor!)=="Stanimirovic")){
            var newCedulja=curDistributor.cedulja!+returnedBread.kolicina!;
            this.distributorService.update(curDistributor.id!,{cedulja: newCedulja})
              }else{
                var forRet=(oldAmount*0.9-(oldAmount-this.toReturn)*0.9);              
            var newCedulja=curDistributor.cedulja!+forRet;
            this.distributorService.update(curDistributor.id!,{cedulja: newCedulja})
              }
          }else{
            this.pastryService.getAll(curDistributor.id).snapshotChanges().pipe(
              map(changes=>
                changes.map(c=>({
                  key: c.payload, ...c.payload.val()
                })))
            ).subscribe(data => {
              this.pastries = data;
              this.pastries.forEach(curpastry=>{

                if (curpastry.name==returnedBread.type){
                  var newCena =curDistributor.cena!+ returnedBread.kolicina! * curpastry.cena!;
                  this.distributorService.update(curDistributor.id!,{cena: newCena})
                }
              })



            });

         
  
          }
     })
         .catch(err => console.log(err));
         
        


        }else{
              this.breadService.delete(selbread.id!)
                .then(() => {
                  if (selbread.type=="HLEB" || (selbread.type=="LEPINJA" && selbread.distributor=="Gadzin")){
                    var newCedulja=curDistributor.cedulja!+returnedBread.kolicina!;
                    this.distributorService.update(curDistributor.id!,{cedulja: newCedulja})
          
                  }else{
                    this.pastryService.getAll(curDistributor.id).snapshotChanges().pipe(
                      map(changes=>
                        changes.map(c=>({
                          key: c.payload, ...c.payload.val()
                        })))
                    ).subscribe(data => {
                      this.pastries = data;
                      this.pastries.forEach(curpastry=>{
      
                        if (curpastry.name==returnedBread.type){
                          var newCena =curDistributor.cena!+ returnedBread.kolicina! * curpastry.cena!;
                          this.distributorService.update(curDistributor.id!,{cena: newCena})
                        }
                      })
        
        
        
                    });
      
                 
          
                  }
            
                  window.location.reload();
                  alert("Uspesno dodato!"); 
                })
                .catch(err => console.log(err));
            }

      

      
  

          });

    
  
    }

    
  getDistributors(): void{
    this.distributorService.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.distributors = data;
    });
  }

  openNewBread(){
    this.ruter.navigate(['hleb/nov']);

  }

  openReturnedBread(){
    this.ruter.navigate(['hleb/vracen']);

  }
}
