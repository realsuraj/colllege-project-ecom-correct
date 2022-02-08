import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  constructor(private http: HttpClient) { }

  productName;
  productDiscount;
  productPrice;
  productDescription;
  images;

  fd = new FormData();

  ngOnInit() {
  }

  upload($event){
     if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.images = file;
    }
  }
 
 submit(){

  const formData = new FormData();
  formData.append('file', this.images);
  const data = {
    productDescription: this.productDescription,
    productDiscount: this.productDiscount,
    productName: this.productName,
    productPrice: this.productPrice
  }

  this.http.post<any>('http://localhost:3000/addProductImage', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );

  
  this.http.post('http://localhost:3000/AddProduct',data).subscribe((res) => {
   console.log(res)
  
 }) 
}

}
