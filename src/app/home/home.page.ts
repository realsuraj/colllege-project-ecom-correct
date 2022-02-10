import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private http: HttpClient, private router: Router, private dataStored: UserService) { }

  data;
  image_location = 'http://localhost:3000/uploads/ProductImage_';

 ngOnInit() {
   this.http.get('http://localhost:3000/products').subscribe(
     (res) => {
       console.log(res)
      this.data = res;
      },
     (err) => console.log(err))
  }

  Product_view(i){
    console.log(this.data[i])
    this.router.navigate(['/product-view'], {queryParams: this.data[i].product_name})
    this.dataStored.setData('product_name',this.data[i].product_name)
    this.dataStored.setData('product_price',this.data[i].product_price)
    this.dataStored.setData('product_description',this.data[i].product_description)
    this.dataStored.setData('product_discount',this.data[i].product_discount)
    this.dataStored.setData('product_image_location',this.data[i].product_image_location)
  }

  

}
