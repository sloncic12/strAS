import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { map } from 'rxjs';
import Product from '../models/product.model';
import { ProductService } from '../services/product.service';
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductService) { }
  @ViewChild('content') content: ElementRef;
  ngOnInit(): void {
    this.getLoaners();

  }
   
  products: Product[];
   getLoaners(): void{
      this.productService.getAll().snapshotChanges().pipe(
        map(changes=>
          changes.map(c=>({
            key: c.payload, ...c.payload.val()
          })))
      ).subscribe(data => {
        this.products = data;
      });
    }


    savePDF() {
      const doc = new jsPDF();
      var store=localStorage.getItem("chosenStore");
    doc.setFontSize(17);
      doc.text(store!,80,10);
      autoTable(doc,  {theme: 'grid' ,  styles: { fontSize: 14 ,textColor: 20}, html: '#content' })
      doc.save('table.pdf')
  
    }

    deleteProduct(product:Product){

    }
}
