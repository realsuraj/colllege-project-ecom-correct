import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private http: HttpClient) { }

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



}
