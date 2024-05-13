import {Component, OnInit} from "@angular/core";
import {UjRes} from "../damage/ujRes";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {LogPass} from "./LP";

@Component({
  selector: 'app-const',
  templateUrl: './const.component.html',
  styleUrls: ['./const.component.scss']
})
export class ConstComponent implements OnInit{


  ngOnInit() {

  }

  constructor(private http: HttpClient) {

  }

  user: User
  logs: LogPass


  auth(){
    this.http.post<UjRes>('http://localhost:8080/auth', this.user)
      .subscribe(
        (data: UjRes) => {
          console.log(data)

        },
        error => console.log(error)
      )
  }
}
