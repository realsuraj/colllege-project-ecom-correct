import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  username;
  password;
  
 async submit(){
   let serverResponseData;
  const data = {
    username: this.username,
    password: this.password
  }
  this.http.post('http://localhost:3000/login', data).subscribe((res) => {
    serverResponseData = res;
   console.log(res)
   if(serverResponseData.message == "Success")
   {
     console.log("in if condition");
     this.route.navigate(['/home'], { queryParams: data.username })
   }
 })
}

}
