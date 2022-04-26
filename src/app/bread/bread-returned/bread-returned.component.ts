import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Bread from 'src/app/models/bread.model';
import { BreadService } from 'src/app/services/bread.service';

@Component({
  selector: 'app-bread-returned',
  templateUrl: './bread-returned.component.html',
  styleUrls: ['./bread-returned.component.css']
})
export class BreadReturnedComponent implements OnInit {

  

  bread: Bread[];
  toReturn: number;
  
  public isMenuCollapsed = true;
  constructor(private breadService : BreadService,private ruter: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLoaners();
  }

    getLoaners(): void{
      this.breadService.getAllReturned().snapshotChanges().pipe(
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


}
