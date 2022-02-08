import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.page.html',
  styleUrls: ['./adminlogin.page.scss'],
})
export class AdminloginPage implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  username;
  password;

  ngOnInit() {
  }

  submit(){
    let responseFromServer= null;
    const data = {
      username: this.username,
      password: this.password
    }

    this.http.post('http://localhost:3000/adminlogin',data).subscribe(
      (res) => { responseFromServer = res; 
        console.log(responseFromServer);
        
        if(responseFromServer.message == "Success_login"){
          this.router.navigate(['/admin-dashboard'],{queryParams: data.username})
        }
      },
      (err) => console.log(err)

     
      )

     
  }

}
