import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NkiRes} from "../сomp/nkiRes";
import {NbiRes} from "../fan/nbiRes";
import {NhiRes} from "../pump/nhiRes";
import {UjRes} from "../damage/ujRes";
import {Nki} from "../сomp/nki";
import {Nbi} from "../fan/nbi";
import {Nhi} from "../pump/nhi";
import {Uj} from "../damage/uj";
import {Union} from "./Union";
import {style} from "@angular/animations";

declare var google: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  nh1: boolean = false
  nh2: boolean = true
  nh3: boolean = true

  af: number[] = [0 , 0 , 0]
  bf: number[] = [0 , 0 , 0]
  cf: number[] = [0 , 0 , 0]
  df: number[] = [0 , 0 , 0]

  nb1: boolean = false
  nb2: boolean = true
  nb3: boolean = true

  nk1: boolean = false
  nk2: boolean = true
  nk3: boolean = true

  uj1: boolean = false
  uj2: boolean = true
  uj3: boolean = true

  nhF: number = 0;
  nbF: number = 0;
  nkF: number = 0;
  ujF: number = 0;

  counterF1(){
    this.nhF = 0
    this.nbF = 0
    this.nkF = 0
    this.ujF = 0


    if(this.nh1 == true)this.af[0] = 1
    else this.af[0] = 0
    if(this.nh2 == true)this.af[1] = 1
    else this.af[1] = 0
    if(this.nh3 == true)this.af[2] = 1
    else this.af[2] = 0

    if(this.nb1 == true)this.bf[0] = 1
    else this.bf[0] = 0
    if(this.nb2 == true)this.bf[1] = 1
    else this.bf[1] = 0
    if(this.nb3 == true)this.bf[2] = 1
    else this.bf[2] = 0

    if(this.nk1 == true)this.cf[0] = 1
    else this.cf[0] = 0
    if(this.nk2 == true)this.cf[1] = 1
    else this.cf[1] = 0
    if(this.nk3 == true)this.cf[2] = 1
    else this.cf[2] = 0

    if(this.uj1 == true)this.df[0] = 1
    else this.df[0] = 0
    if(this.uj2 == true)this.df[1] = 1
    else this.df[1] = 0
    if(this.uj3 == true)this.df[2] = 1
    else this.df[2] = 0


    this.af.map(el => this.nhF += el)
    this.bf.map(el => this.nbF += el)
    this.cf.map(el => this.nkF += el)
    this.df.map(el => this.ujF += el)

    console.log(this.nhF)
    console.log(this.nbF)
    console.log(this.nkF)
    console.log(this.ujF)


    if(this.nhF > 2){
      alert("Критическая ошибка! Превышение допустимого давления")
    }
    if(this.nhF < 2){
      alert("Критическая ошибка! Низкое давление")
    }
    /////////////
    if(this.nbF > 2){
      alert("Осторожно! Высокое потребление электроэнергии")
    }
    if(this.nbF < 2){
      alert("Осторожно! Неконтролируемый нагрев теплоносителя")
    }
    ////////////////
    if(this.nkF > 2){
      alert("Критическая ошибка! Превышение допустимого значения")
    }
    if(this.nkF < 2){
      alert("Ошибка! Недостаточно мощности")
    }
    //////////////////
    if(this.ujF > 2){
      alert("Полная загруженность системы")
    }
    if(this.ujF < 2){
      alert("Неэффективное потребеление ресурсов")
    }

  }

  nki: Nki[];
  nbi: Nbi[];
  nhi: Nhi[];
  uj: Uj[];

  nkiRes: NkiRes[];
  nbiRes: NbiRes[];
  nhiRes: NhiRes[];
  ujRes: UjRes[];

  chartNkM: Union[] = [];
  chartNhM: Union[] = [];
  chartNbM: Union[] = [];
  chartUj: Union[] = [];


  constructor(private http: HttpClient) {
    google.charts.load('current', {'packages':['corechart']})

    this.http.get<Nki[]>("http://localhost:8080/nki").subscribe(result =>{
      this.nki = result;
    })
    this.http.get<Nbi[]>("http://localhost:8080/nbi").subscribe(result =>{
      this.nbi = result;
    })
    this.http.get<Nhi[]>("http://localhost:8080/nhi").subscribe(result =>{
      this.nhi = result;
    })
    this.http.get<Uj[]>("http://localhost:8080/uj").subscribe(result =>{
      this.uj = result;
    })


    this.http.get<NkiRes[]>("http://localhost:8080/nki/res").subscribe(result =>{
      var counter = 0
      this.nkiRes = result;
      result.forEach(el =>{
        counter += 1
        this.chartNkM.push(new Union(("Nki " + counter), el.nki))
      })
      this.buildChartNki()
    })
    this.http.get<NbiRes[]>("http://localhost:8080/nbi/res").subscribe(result =>{
      var counter = 0
      this.nbiRes = result;
      result.forEach(el =>{
        counter += 1
        this.chartNbM.push(new Union(("NBi " + counter), el.nbi))
      })
      this.buildChartNbi()
    })
    this.http.get<NhiRes[]>("http://localhost:8080/nhi/res").subscribe(result =>{
      this.nhiRes = result;
      result.forEach(el =>{
          this.chartNhM.push(new Union("NHi", el.nhi_element))
      })
      this.buildChartNhi()
    })
    this.http.get<UjRes[]>("http://localhost:8080/uj/res").subscribe(result =>{
      var counter = 0
      this.ujRes = result;
      result.forEach(el =>{
        counter += 1
        this.chartUj.push(new Union(("Uj " + counter), el.ui))
      })
      this.buildChartUj()
    })
  }


  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
  }



  buildChartNki() {
    var func = (chart: any) : void => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', '1');
      data.addRows(this.chartNkM.map(el=>Array<any>(el.name, el.value)));
      var options = {
        title: 'Сравнение показателей',
        curveType: 'function',
      }
      chart().draw(data, options);
    }
    var chart =()=> new google.visualization.LineChart(document.getElementById('nkiChar'));
    var callback=()=>func(chart)
    google.charts.setOnLoadCallback(callback);
  }

  buildChartNhi() {
    var func = (chart: any) : void => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', '1');
      data.addRows(this.chartNhM.map(el=>Array<any>(el.name, el.value)));
      var options = {
        title: 'Сравнение показателей',
        curveType: 'function',
      }
      chart().draw(data, options);
    }
    var chart =()=> new google.visualization.LineChart(document.getElementById('nhiChar'));
    var callback=()=>func(chart)
    google.charts.setOnLoadCallback(callback);
  }

  buildChartNbi() {
    var func = (chart: any) : void => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', '1');
      data.addRows(this.chartNbM.map(el=>Array<any>(el.name, el.value)));
      var options = {
        title: 'Сравнение показателей',
        curveType: 'function',
      }
      chart().draw(data, options);
    }
    var chart =()=> new google.visualization.LineChart(document.getElementById('nbiChar'));
    var callback=()=>func(chart)
    google.charts.setOnLoadCallback(callback);
  }

  buildChartUj() {
    var func = (chart: any) : void => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', '1');
      data.addRows(this.chartUj.map(el=>Array<any>(el.name, el.value)));
      var options = {
        title: 'Сравнение показателей',
        curveType: 'function',
      }
      chart().draw(data, options);
    }
    var chart =()=> new google.visualization.LineChart(document.getElementById('ujChar'));
    var callback=()=>func(chart)
    google.charts.setOnLoadCallback(callback);
  }



}
