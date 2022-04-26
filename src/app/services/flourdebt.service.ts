import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import FlourDebt from '../models/flourdebt.model';

@Injectable({
  providedIn: 'root'
})
export class FlourdebtService {


  
  constructor(private db:AngularFireDatabase) {
  
  }
     
     getAll(id:any): AngularFireList<FlourDebt> {
    return  this.db.list('/distributor_goods', ref => ref.child(id).orderByChild('date'));
    }
  
    add(debt: FlourDebt,id:any): any {
      var newId= this.db.createPushId();
      debt.id=newId;
      return this.db.list('/distributor_goods', ref => ref.child(id).push(debt));
     
    }

    getAllInsideDates(id:string,date1:number,date2:number) :AngularFireList<FlourDebt>{
 
      return  this.db.list('/distributor_goods', ref => ref.child(id).orderByChild('date').startAt(date2).endAt(date1));
 

  
     } 

  
}
