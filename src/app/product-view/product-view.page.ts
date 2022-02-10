import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  constructor(private activeroute: ActivatedRoute, private route: Router, private http: HttpClient, private dataStored: UserService) {}

  productData = {
    username: this.dataStored.getData('username'),
    product_name: this.dataStored.getData('product_name'),
    product_price: this.dataStored.getData('product_price'),
    product_description: this.dataStored.getData('product_description'),
    product_discount: this.dataStored.getData('product_discount'),
    product_image_location: this.dataStored.getData('product_image_location'),
    
  };
  localLocationImage = 'http://localhost:3000/uploads/ProductImage_';

  ngOnInit() {
  }

  

  AddCart(){
    this.http.post('http://localhost:3000/AddCart',this.productData).subscribe((res) => {
      console.log(res)
    })
  }

}
