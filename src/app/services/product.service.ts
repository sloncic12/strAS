import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  getAll(): AngularFireList<Product> {

    var store = localStorage.getItem("chosenStore");
    if (store == "Pricinovic") {
      return this.db.list('/mp_product', ref => ref.orderByChild("category"));
    } else {
      return this.db.list('/glu_product', ref => ref.orderByChild("category"));

    }
  }

  add(product: Product): any {

    var store = localStorage.getItem("chosenStore");
    if (store == "Pricinovic") {

      var someRef = this.db.database.ref().child('mp_product').push();
      var newId = someRef.key;
      product.id = newId;
      return someRef.set(product);
    } else {
      var someRef = this.db.database.ref().child('glu_product').push();

      var newId = someRef.key;
      product.id = newId;
      return someRef.set(product);
    }
  }


  delete(productID: string): Promise<void> {
    var store = localStorage.getItem("chosenStore");

    if (store == "Pricinovic") {
      var newRef = this.db.database.ref().child("mp_product").child(productID);
      return newRef.remove();
    } else {
      var newRef = this.db.database.ref().child("glu_product").child(productID);
      return newRef.remove();

    }


  }
}
