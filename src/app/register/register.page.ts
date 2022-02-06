import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private http: HttpClient,private route: Router) { }

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
  this.http.post('http://localhost:3000/register', data).subscribe((res) => {
   console.log(res)
    serverResponseData = res;
    if(serverResponseData.message = "Success" && serverResponseData.errno == null){
      this.route.navigate(['/login'], {})
    }
 })

 
}


}
