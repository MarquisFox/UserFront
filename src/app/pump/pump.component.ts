import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Nhi} from "./nhi";
import {NhiRes} from "./nhiRes";
declare var google: any;

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss']
})

export class PumpComponent implements OnInit{
  toggle = false;
  @Input() pumpComponent!:PumpComponent

  nhi: Nhi[];
  trialNhi: Nhi = new Nhi();
  receivedRes: NhiRes = new NhiRes();
  nhiCurr: Nhi = new Nhi();
  selectedNhi: Nhi;

  onChange(num: number) {
    this.counterValue = num;

    this.toggle = false;

    this.nhi.forEach(element =>{
      if(element.id == num){
        this.nhiCurr = element
        this.counterValue = num
      }
    })
  }

  // return this.http.get<Nhi>('http://localhost:8080/nhi/id' + num1).subscribe(
  //   (data: Nhi) => {
  //     this.nhiCurr = data;
  //     console.log(this.nhiCurr)
  //   }
  // )

  counterValue: number;
  dataRes: NhiRes = new NhiRes();
  formNhi: Nhi = new Nhi();

  postNhi() {
    this.formNhi.id = this.nhiCurr.id;
    this.formNhi.g = this.nhiCurr.g;
    this.formNhi.ro = this.nhiCurr.ro;

    if(this.trialNhi.nu_ed != null)this.formNhi.nu_ed = this.trialNhi.nu_ed
    else this.formNhi.nu_ed = this.nhiCurr.nu_ed

    if(this.trialNhi.nu_pr != null) this.formNhi.nu_pr = this.trialNhi.nu_pr
    else this.formNhi.nu_pr = this.nhiCurr.nu_pr

    if(this.trialNhi.nu_n != null)this.formNhi.nu_n = this.trialNhi.nu_n
    else this.formNhi.nu_n = this.nhiCurr.nu_n

    if(this.trialNhi.h != null) this.formNhi.h = this.trialNhi.h
    else this.formNhi.h = this.nhiCurr.h

    if(this.trialNhi.n != null) this.formNhi.n = this.trialNhi.n
    else this.formNhi.n = this.nhiCurr.n

    if(this.trialNhi.n_nom != null) this.formNhi.n_nom = this.trialNhi.n_nom
    else this.formNhi.n_nom = this.nhiCurr.n_nom

    if(this.trialNhi.h_P != null) this.formNhi.h_P = this.trialNhi.h_P
    else this.formNhi.h_P = this.nhiCurr.h_P

    if(this.trialNhi.h_F != null) this.formNhi.h_F = this.trialNhi.h_F
    else this.formNhi.h_F = this.nhiCurr.h_F

    if(this.trialNhi.q_B_H20 != null) this.formNhi.q_B_H20 = this.trialNhi.q_B_H20
    else this.formNhi.q_B_H20 = this.nhiCurr.q_B_H20


    this.http.post<NhiRes>('http://localhost:8080/nhi/test', this.formNhi)
      .subscribe(
        (data: NhiRes) => {

          this.dataRes.nhi_element = Math.round(data.nhi_element * 100) / 100
          this.dataRes.qh20 = Math.round(data.qh20 * 100) / 100

          this.buildChart();
        },
        error => console.log(error)
      )

    this.http.post<NhiRes>('http://localhost:8080/nhi/test', this.nhiCurr)
      .subscribe(
        (data: NhiRes) => {

          this.receivedRes.nhi_element = Math.round(data.nhi_element * 100) / 100
          this.receivedRes.qh20 = Math.round(data.qh20 * 100) / 100

          this.buildChart();
        },
        error => console.log(error)
      )
    this.toggle = true;
  }

  updateDB() {
    this.http.post<Nhi>('http://localhost:8080/nhi', this.formNhi)
      .subscribe(
        (data: Nhi) => {
          console.log(this.formNhi)
          console.log(data)

        },
        error => console.log(error)
      )
  }



  constructor(private http: HttpClient) {
    this.http.get<Nhi[]>("http://localhost:8080/nhi").subscribe(result =>{
      this.nhi = result;
      this.nhiCurr = result[0]
    })
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
  }
  buildChart() {
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', this.nhiCurr.id);
      data.addRows([
        ['QH20', this.dataRes.qh20],
        ['NHi', this.dataRes.nhi_element]
      ]);
      var options = {
        title: 'Сравнение показателей'
      }
      chart().draw(data, options);
    }
    var chart =()=> new google.visualization.ColumnChart(document.getElementById('divPieChart'));
    var callback=()=>func(chart)
    google.charts.setOnLoadCallback(callback);
  }

  nhiResName = {
    QH20: 'QH20',
    NHi_element: 'NHi_element'
  }

  nhiName = {
    naming: 'Уникальный номер',
    nu_ed: 'КПД электродвигателя',
    nu_pr: 'КПД привода',
    nu_n: 'КПД насоса',
    H: 'Напор воды',
    n: 'Текущая частота вращения колеса',
    n_nom: 'Номинальная частота вращения колеса',
    H_P: 'Каталожный параметр',
    H_F: 'Каталожный параметр',
    Q_B_H20: 'Подача насосов при номинальной частоте'
  }

}
