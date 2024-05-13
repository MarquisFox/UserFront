import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Uj} from "./uj";
import {UjRes} from "./ujRes";
declare var google: any;

@Component({
  selector: 'app-pump',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})

export class DamageComponent implements OnInit{
  toggle = false;
  @Input() damageComponent!:DamageComponent

  uj: Uj[];
  trialUj: Uj = new Uj();
  receivedRes: UjRes = new UjRes();
  ujCurr: Uj = new Uj();
  selectedUj: Uj;

  onChange(num: number) {
    this.counterValue = num;

    this.toggle = false;

    this.uj.forEach(element =>{
      if(element.id == num){
        this.ujCurr = element
        this.counterValue = num
      }
    })
  }

  counterValue: number;
  dataRes: UjRes = new UjRes();
  formUj: Uj = new Uj();

  postUj() {
    this.formUj.id = this.ujCurr.id;
    this.formUj.m_i = this.ujCurr.m_i;
    this.formUj.k = this.ujCurr.k;
    this.formUj.kj = this.ujCurr.kj;
    this.formUj.aj = this.ujCurr.aj;
    this.formUj.pti = this.ujCurr.pti;


    if(this.trialUj.qkP_i != null)this.formUj.qkP_i = this.trialUj.qkP_i
    else this.formUj.qkP_i = this.ujCurr.qkP_i

    if(this.trialUj.p_i != null)this.formUj.p_i = this.trialUj.p_i
    else this.formUj.p_i = this.ujCurr.p_i

    if(this.trialUj.n_i != null)this.formUj.n_i = this.trialUj.n_i
    else this.formUj.n_i = this.ujCurr.n_i

    if(this.trialUj.q_i != null)this.formUj.q_i = this.trialUj.q_i
    else this.formUj.q_i = this.ujCurr.q_i

    if(this.trialUj.lk_i != null)this.formUj.lk_i = this.trialUj.lk_i
    else this.formUj.lk_i = this.ujCurr.lk_i

    if(this.trialUj.qk_i != null)this.formUj.qk_i = this.trialUj.qk_i
    else this.formUj.qk_i = this.ujCurr.qk_i

    if(this.trialUj.pmin != null)this.formUj.pmin = this.trialUj.pmin
    else this.formUj.pmin = this.ujCurr.pmin

    if(this.trialUj.pmax != null)this.formUj.pmax = this.trialUj.pmax
    else this.formUj.pmax = this.ujCurr.pmax

    if(this.trialUj.epsilon != null)this.formUj.epsilon = this.trialUj.epsilon
    else this.formUj.epsilon = this.ujCurr.epsilon

    if(this.trialUj.ci != null)this.formUj.ci = this.trialUj.ci
    else this.formUj.ci = this.ujCurr.ci



    this.http.post<UjRes>('http://localhost:8080/uj/test', this.formUj)
      .subscribe(
        (data: UjRes) => {
          this.dataRes.u = Math.round(data.u * 100) / 100
          this.dataRes.ui = Math.round(data.ui * 100) / 100
          this.dataRes.ujDeltaPj = Math.round(data.ujDeltaPj * 100) / 100
          this.dataRes.deltaPj = Math.round(data.deltaPj * 100) / 100
          this.dataRes.ptj = Math.round(data.ptj * 100) / 100

          console.log("bbb " + this.dataRes);

          this.buildChart();
        },
        error => console.log(error)
      )

    this.http.post<UjRes>('http://localhost:8080/uj/test', this.ujCurr)
      .subscribe(
        (data: UjRes) => {
          console.log(data)

          this.receivedRes.u = Math.round(data.u * 100) / 100

          console.log("111 " + data.u)

          this.receivedRes.ui = Math.round(data.ui * 100) / 100
          this.receivedRes.ujDeltaPj = Math.round(data.ujDeltaPj * 100) / 100
          this.receivedRes.deltaPj = Math.round(data.deltaPj * 100) / 100
          this.receivedRes.ptj = Math.round(data.ptj * 100) / 100

          this.buildChart();
        },
        error => console.log(error)
      )
    this.toggle = true;
  }

  updateDB() {
    this.http.post<Uj>('http://localhost:8080/uj', this.formUj)
      .subscribe(
        (data: Uj) => {
          console.log(this.formUj)
          console.log(data)

        },
        error => console.log(error)
      )
  }



  constructor(private http: HttpClient) {
    this.http.get<Uj[]>("http://localhost:8080/uj").subscribe(result =>{
      this.uj = result;
      this.ujCurr = result[0]
    })
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
  }
  buildChart() {
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', this.ujCurr.id);
      data.addRows([
        ['Новый показатель', this.receivedRes.u],
        ['Старый показатель', this.dataRes.u]
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


  ujResName = {
    U: 'U',
    Ui: 'Ui',
    UjDeltaPj: 'UjDeltaPj',
    deltaPj: 'deltaPj',
    PTj: 'PTj'
  }

  ujName = {
    naming: 'Уникальный номер',
    qkp_i: 'количество воды, транспортируемого через участок',
    p_i: 'давление на входе корпуса',
    n_i: 'количество потребителей корпуса',
    q_i: 'системный параметр Q',
    lk_i: 'расчетная  длина водопровода на участке',
    qk_i: 'расход воды на k-м участке',
    pmin: 'нижняя граница давления',
    pmax: 'верхняя граница давления',
    epsilon: 'граница отклонения',
    ci: 'масштабирующий коэффициент, используемый для расчета ущерба в денежном выражении'
  }

}
