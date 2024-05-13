import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Res} from "./res";

declare var google: any;

@Component({
  selector: 'app-pump',
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.scss']
})

export class ResComponent implements OnInit{
  toggle = false;
  @Input() resComponent!:ResComponent

  res: Res;


  constructor(private http: HttpClient) {
    this.http.get<Res>("http://localhost:8080/res").subscribe(result =>{
      this.res = result;
    })
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
  }



  resName = {
    R: 'R',
    S: 'S',
    U: 'U'
  }

}
