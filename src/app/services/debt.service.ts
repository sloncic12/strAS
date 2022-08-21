import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import Debt from '../models/dug.model';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(private db: AngularFireDatabase) {

  }

  getAll(id: any): AngularFireList<Debt> {
    var store = localStorage.getItem("chosenStore");
    if (store == "Pricinovic") {
      return this.db.list('/mp_debt', ref => ref.child(id).orderByChild('date'));
    } else {

      return this.db.list('/glu_debt', ref => ref.child(id).orderByChild('date'));
    }
  }
  //ne ovako!!

  add(debt: Debt, id: any): any {

    var store = localStorage.getItem("chosenStore");
    if (store == "Pricinovic") {

      var someRef = this.db.database.ref().child('mp_debt').child(id).push();
      var newId = someRef.key;
      debt.id = newId;
      return someRef.set(debt);
    } else {
      var someRef = this.db.database.ref().child('glu_debt').child(id).push();

      var newId = someRef.key;
      debt.id = newId;
      return someRef.set(debt);
    }
  }

  deleteAllDebts(userId: string): Promise<void> {
    var store = localStorage.getItem("chosenStore");

    if (store == "Pricinovic") {
      var newRef = this.db.database.ref().child("mp_debt").child(userId);
      return newRef.remove();
    } else {
      var newRef = this.db.database.ref().child("glu_debt").child(userId);
      return newRef.remove();

    }


  }

}
