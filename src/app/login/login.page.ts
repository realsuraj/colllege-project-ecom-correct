import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http: HttpClient, private route: Router, private dataStored: UserService) { }

  ngOnInit() {
  }

  username;
  password;
  
 submit(){
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
     this.dataStored.setData('username',data.username);
     this.route.navigate(['/home'], { queryParams: data.username })

   }
 })
}

}
