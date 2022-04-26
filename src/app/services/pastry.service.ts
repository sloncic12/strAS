import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import BreadPrice from '../models/bread_price.model';
import Pastry from '../models/pastry.model';

@Injectable({
  providedIn: 'root'
})
export class PastryService {



  loanersRef: AngularFireList<Pastry>;

  private dbPath = '/pastries';

  constructor(private db: AngularFireDatabase) {

    this.loanersRef = db.list(this.dbPath);

  }


  getAll(id: any): AngularFireList<Pastry> {

    return this.db.list('/pastries', ref => ref.child(id).orderByChild('date'));
  }

  update(id: string, key: string, value: any): Promise<void> {
    return this.db.list('/pastries', ref => ref.child(id)).update(key, value);

  }

  addNewPastry(id: string, pastry: Pastry): any {


    var someRef = this.db.database.ref().child('pastries').child(id).child(pastry.name!);
    var newId = someRef.push().key;
    pastry.id = newId;
    return someRef.set(pastry);

  }

  addNewBreadPrice(id: string, breadPrice: BreadPrice): any {
    var someRef = this.db.database.ref().child('bread_price').child(id).push();

    var newId = someRef.key;
    breadPrice.id = newId;
    return someRef.set(breadPrice);

  }

  getBreadPrices(id: string): AngularFireList<BreadPrice> {

    return this.db.list('/bread_price', ref => ref.child(id).orderByChild('date'));
  }


  getBreadPrice(id: string): AngularFireObject<Pastry> {

    return this.db.object('pastries/' + id + "/HLEB");

  }



}
