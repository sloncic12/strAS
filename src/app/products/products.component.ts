import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { map } from 'rxjs';
import Product from '../models/product.model';
import { ProductService } from '../services/product.service';
import autoTable from 'jspdf-autotable'
import { NewProductComponent } from './new-product/new-product.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private dialog: MatDialog) { }
  @ViewChild('content') content: ElementRef;
  ngOnInit(): void {
    this.getLoaners();

  }

  products: Product[];
  getLoaners(): void {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.products = data;
    });
  }


  savePDF() {
    const doc = new jsPDF();
    var store = localStorage.getItem("chosenStore");
    doc.setFontSize(17);
    doc.text(store!, 80, 10);
    autoTable(doc, { theme: 'grid', styles: { fontSize: 14, textColor: 20 }, html: '#content' })
    doc.save('table.pdf')

  }

  deleteProduct(product: Product) {
    this.productService.delete(product.id!).then(() => {

      alert("Uspesno izbrisano")
    });
  }

  addProduct() {

    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '350px',
      data: {
        name: "",
        category: "Ostalo",
        quantity: "Nema na stanju",
        price: 0
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      var newProduct = new Product()
      newProduct.category = result.category
      newProduct.name = result.name
      newProduct.enough = result.quantity
      newProduct.cena = result.price
      // alert(JSON.stringify(newProduct))

      this.productService.add(newProduct)
      alert("Uspesno dodat proizvod")
    })

  }
}
