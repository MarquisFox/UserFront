import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Nbi} from "./nbi";
import {NbiRes} from "./nbiRes";
declare var google: any;

@Component({
  selector: 'app-pump',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss']
})

export class FanComponent implements OnInit{
  toggle = false;
  @Input() fanComponent!:FanComponent

  nbi: Nbi[];
  trialNbi: Nbi = new Nbi();
  receivedRes: NbiRes = new NbiRes();
  nbiCurr: Nbi = new Nbi();
  selectedNbi: Nbi;

  onChange(num: number) {
    this.counterValue = num;

    this.toggle = false;

    this.nbi.forEach(element =>{
      if(element.id == num){
        this.nbiCurr = element
        this.counterValue = num
      }
    })
  }

  counterValue: number;
  dataRes: NbiRes = new NbiRes();
  formNbi: Nbi = new Nbi();

  postNbi() {
    this.formNbi.id = this.nbiCurr.id;
    this.formNbi.th20 = this.nbiCurr.th20;
    this.formNbi.t1H20 = this.nbiCurr.t1H20;
    this.formNbi.ro = this.nbiCurr.ro;
    this.formNbi.deltaT = this.nbiCurr.deltaT;
    this.formNbi.k = this.nbiCurr.k;
    this.formNbi.lambda = this.nbiCurr.lambda;

    if(this.trialNbi.mh20 != null)this.formNbi.mh20 = this.trialNbi.mh20
    else this.formNbi.mh20 = this.nbiCurr.mh20

    if(this.trialNbi.l0 != null)this.formNbi.l0 = this.trialNbi.l0
    else this.formNbi.l0 = this.nbiCurr.l0

    if(this.trialNbi.l1 != null)this.formNbi.l1 = this.trialNbi.l1
    else this.formNbi.l1 = this.nbiCurr.l1

    if(this.trialNbi.l2 != null)this.formNbi.l2 = this.trialNbi.l2
    else this.formNbi.l2 = this.nbiCurr.l2

    if(this.trialNbi.a0R != null)this.formNbi.a0R = this.trialNbi.a0R
    else this.formNbi.a0R = this.nbiCurr.a0R

    if(this.trialNbi.h != null)this.formNbi.h = this.trialNbi.h
    else this.formNbi.h = this.nbiCurr.h

    if(this.trialNbi.kb != null)this.formNbi.kb = this.trialNbi.kb
    else this.formNbi.kb = this.nbiCurr.kb

    if(this.trialNbi.kpdA != null)this.formNbi.kpdA = this.trialNbi.kpdA
    else this.formNbi.kpdA = this.nbiCurr.kpdA

    if(this.trialNbi.c2 != null)this.formNbi.c2 = this.trialNbi.c2
    else this.formNbi.c2 = this.nbiCurr.c2

    if(this.trialNbi.lambda != null)this.formNbi.lambda = this.trialNbi.lambda
    else this.formNbi.lambda = this.nbiCurr.lambda

    if(this.trialNbi.epsE != null)this.formNbi.epsE = this.trialNbi.epsE
    else this.formNbi.epsE = this.nbiCurr.epsE

    if(this.trialNbi.e11 != null)this.formNbi.e11 = this.trialNbi.e11
    else this.formNbi.e11 = this.nbiCurr.e11

    if(this.trialNbi.e21 != null)this.formNbi.e21 = this.trialNbi.e21
    else this.formNbi.e21 = this.nbiCurr.e21


    this.http.post<NbiRes>('http://localhost:8080/nbi/test', this.formNbi)
      .subscribe(
        (data: NbiRes) => {

          console.log(data)

          this.dataRes.nbi = Math.round(data.nbi * 100) / 100
          this.dataRes.qai = Math.round(data.qai * 100) / 100
          this.dataRes.pvAi = Math.round(data.pvAi * 100) / 100

          this.buildChart();
        },
        error => console.log(error)
      )

    this.http.post<NbiRes>('http://localhost:8080/nbi/test', this.nbiCurr)
      .subscribe(
        (data: NbiRes) => {

          this.receivedRes.nbi = Math.round(data.nbi * 100) / 100
          this.receivedRes.qai = Math.round(data.qai * 100) / 100
          this.receivedRes.pvAi = Math.round(data.pvAi * 100) / 100

          this.buildChart();
        },
        error => console.log(error)
      )
    this.toggle = true;
  }

  updateDB() {
    this.http.post<Nbi>('http://localhost:8080/nbi', this.formNbi)
      .subscribe(
        (data: Nbi) => {
          console.log(this.formNbi)
          console.log(data)

        },
        error => console.log(error)
      )
  }



  constructor(private http: HttpClient) {
    this.http.get<Nbi[]>("http://localhost:8080/nbi").subscribe(result =>{
      this.nbi = result;
      this.nbiCurr = result[0]
    })
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
  }
  buildChart() {
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', this.nbiCurr.id);
      data.addRows([
        ['Новый показатель', this.receivedRes.nbi],
        ['Старый показатель', this.dataRes.nbi]
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


  nbiResName = {
    PvAi: 'PvAi',
    QAi: 'QAi',
    NBi_element: 'NBi_element'
  }

  nbiName = {
    naming: 'Уникальный номер',
    MH20: 'масса воды',
    l0: 'коэф напорной характеристики вентилятора',
    l1: 'коэф напорной характеристики вентилятора',
    l2: 'коэф напорной характеристики вентилятора',
    aor: 'коэф секции градирни',
    h: 'высота оросителя',
    kb: 'мастабирующий коэф',
    kpdA: 'кпд вентилятора',
    C2: 'неизвестный параметр',
    lambda: 'неизвестный параметр',
    k: 'неизвестный параметр',
    epsE: 'неизвестный параметр',
    E11: 'неизвестный параметр',
    E21: 'неизвестный параметр'
  }

}
