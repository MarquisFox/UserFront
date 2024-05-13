import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Nki} from "./nki";
import {NkiRes} from "./nkiRes";
declare var google: any;

@Component({
  selector: 'app-pump',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.scss']
})

export class CompComponent implements OnInit{
  toggle = false;
  @Input() fanComponent!:CompComponent

  nki: Nki[];
  trialNki: Nki = new Nki();
  receivedRes: NkiRes = new NkiRes();
  nkiCurr: Nki = new Nki();
  selectedNki: Nki;

  onChange(num: number) {
    this.counterValue = num;

    this.toggle = false;

    this.nki.forEach(element =>{
      if(element.id == num){
        this.nkiCurr = element
        this.counterValue = num
      }
    })
  }

  counterValue: number;
  dataRes: NkiRes = new NkiRes();
  formNki: Nki = new Nki();

  postNki() {
    this.formNki.id = this.nkiCurr.id;
    this.formNki.r = this.nkiCurr.r;
    this.formNki.th20 = this.nkiCurr.th20;
    this.formNki.t_ATM = this.nkiCurr.t_ATM;
    this.formNki.t_I_ATM = this.nkiCurr.t_I_ATM;
    this.formNki.c_Air = this.nkiCurr.c_Air;
    this.formNki.c_water = this.nkiCurr.c_water;
    this.formNki.epsmax_1 = this.nkiCurr.epsmax_1;
    this.formNki.epsmin_1 = this.nkiCurr.epsmin_1;
    this.formNki.epsmax_2 = this.nkiCurr.epsmax_2;
    this.formNki.epsmin_2 = this.nkiCurr.epsmin_2;
    this.formNki.epsmax_3 = this.nkiCurr.epsmax_3;
    this.formNki.epsmin_3 = this.nkiCurr.epsmin_3;
    this.formNki.sig1 = this.nkiCurr.sig1;
    this.formNki.sig2 = this.nkiCurr.sig2;
    this.formNki.sig3 = this.nkiCurr.sig3;

    if(this.trialNki.k != null)this.formNki.k = this.trialNki.k
    else this.formNki.k = this.nkiCurr.k

    if(this.trialNki.pbc != null)this.formNki.pbc = this.trialNki.pbc
    else this.formNki.pbc = this.nkiCurr.pbc

    if(this.trialNki.f != null)this.formNki.f = this.trialNki.f
    else this.formNki.f = this.nkiCurr.f

    if(this.trialNki.q != null)this.formNki.q = this.trialNki.q
    else this.formNki.q = this.nkiCurr.q

    if(this.trialNki.mh20 != null)this.formNki.mh20 = this.trialNki.mh20
    else this.formNki.mh20 = this.nkiCurr.mh20

    if(this.trialNki.t_I_HOI2 != null)this.formNki.t_I_HOI2 = this.trialNki.t_I_HOI2
    else this.formNki.t_I_HOI2 = this.nkiCurr.t_I_HOI2

    if(this.trialNki.t_I_HOI3 != null)this.formNki.t_I_HOI3 = this.trialNki.t_I_HOI3
    else this.formNki.t_I_HOI3 = this.nkiCurr.t_I_HOI3

    if(this.trialNki.g != null)this.formNki.g = this.trialNki.g
    else this.formNki.g = this.nkiCurr.g

    console.log("data")
    console.log(this.trialNki)

    this.http.post<NkiRes>('http://localhost:8080/nki/test', this.formNki)
      .subscribe(
        (data: NkiRes) => {
          this.dataRes.eps1i = Math.round(data.eps1i * 100) / 100
          this.dataRes.eps2i = Math.round(data.eps2i * 100) / 100
          this.dataRes.eps3i = Math.round(data.eps3i * 100) / 100
          this.dataRes.sigma1 = Math.round(data.sigma1 * 100) / 100
          this.dataRes.sigma2 = Math.round(data.sigma2 * 100) / 100
          this.dataRes.sigma3 = Math.round(data.sigma3 * 100) / 100
          this.dataRes.tho1 = Math.round(data.tho1 * 100) / 100
          this.dataRes.tho2 = Math.round(data.tho2 * 100) / 100
          this.dataRes.tho3 = Math.round(data.tho3 * 100) / 100
          this.dataRes.z = Math.round(data.z * 100) / 100
          this.dataRes.tk1 = Math.round(data.tk1 * 100) / 100
          this.dataRes.tk2 = Math.round(data.tk2 * 100) / 100
          this.dataRes.w1 = Math.round(data.w1 * 100) / 100
          this.dataRes.w2 = Math.round(data.w2 * 100) / 100
          this.dataRes.deltaT1i = Math.round(data.deltaT1i * 100) / 100
          this.dataRes.deltaT2i = Math.round(data.deltaT2i * 100) / 100
          this.dataRes.deltaT3i = Math.round(data.deltaT3i * 100) / 100
          this.dataRes.eps1 = Math.round(data.eps1 * 100) / 100
          this.dataRes.eps2 = Math.round(data.eps2 * 100) / 100
          this.dataRes.eps3 = Math.round(data.eps3 * 100) / 100
          this.dataRes.q1 = Math.round(data.q1 * 100) / 100
          this.dataRes.q2 = Math.round(data.q2 * 100) / 100
          this.dataRes.q3 = Math.round(data.q3 * 100) / 100
          this.dataRes.nki = Math.round(data.nki * 100) / 100

          console.log(data)

          this.buildChart();
        },
        error => console.log(error)
      )

    this.http.post<NkiRes>('http://localhost:8080/nki/test', this.nkiCurr)
      .subscribe(
        (data: NkiRes) => {
          this.receivedRes.eps1i = Math.round(data.eps1i * 100) / 100
          this.receivedRes.eps2i = Math.round(data.eps2i * 100) / 100
          this.receivedRes.eps3i = Math.round(data.eps3i * 100) / 100
          this.receivedRes.sigma1 = Math.round(data.sigma1 * 100) / 100
          this.receivedRes.sigma2 = Math.round(data.sigma2 * 100) / 100
          this.receivedRes.sigma3 = Math.round(data.sigma3 * 100) / 100
          this.receivedRes.tho1 = Math.round(data.tho1 * 100) / 100
          this.receivedRes.tho2 = Math.round(data.tho2 * 100) / 100
          this.receivedRes.tho3 = Math.round(data.tho3 * 100) / 100
          this.receivedRes.z = Math.round(data.z * 100) / 100
          this.receivedRes.tk1 = Math.round(data.tk1 * 100) / 100
          this.receivedRes.tk2 = Math.round(data.tk2 * 100) / 100
          this.receivedRes.w1 = Math.round(data.w1 * 100) / 100
          this.receivedRes.w2 = Math.round(data.w2 * 100) / 100
          this.receivedRes.deltaT1i = Math.round(data.deltaT1i * 100) / 100
          this.receivedRes.deltaT2i = Math.round(data.deltaT2i * 100) / 100
          this.receivedRes.deltaT3i = Math.round(data.deltaT3i * 100) / 100
          this.receivedRes.eps1 = Math.round(data.eps1 * 100) / 100
          this.receivedRes.eps2 = Math.round(data.eps2 * 100) / 100
          this.receivedRes.eps3 = Math.round(data.eps3 * 100) / 100
          this.receivedRes.q1 = Math.round(data.q1 * 100) / 100
          this.receivedRes.q2 = Math.round(data.q2 * 100) / 100
          this.receivedRes.q3 = Math.round(data.q3 * 100) / 100
          this.receivedRes.nki = Math.round(data.nki * 100) / 100

          this.buildChart();
        },
        error => console.log(error)
      )
    this.toggle = true;
  }

  updateDB() {
    this.http.post<Nki>('http://localhost:8080/nki', this.formNki)
      .subscribe(
        (data: Nki) => {
          console.log(this.formNki)
          console.log(data)

        },
        error => console.log(error)
      )
  }



  constructor(private http: HttpClient) {
    this.http.get<Nki[]>("http://localhost:8080/nki").subscribe(result =>{
      this.nki = result;
      this.nkiCurr = result[0]

      console.log(this.nkiCurr)
    })
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
  }
  buildChart() {
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', this.nkiCurr.id);
      data.addRows([
        ['Новый показатель', this.receivedRes.nki],
        ['Старый показатель', this.dataRes.nki]
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


  nkiResName = {
    eps1i: 'eps1i',
    eps2i: 'eps2i',
    eps3i: 'eps3i',
    sigma1: 'sigma1',
    sigma2: 'sigma2',
    sigma3: 'sigma3',
    thO1: 'thO1',
    thO2: 'thO2',
    thO3: 'thO3',
    z: 'z',
    tk1: 'tk1',
    k2: 'tk2',
    w1: 'w1',
    w2: 'w2',
    deltat1i: 'deltat1i',
    deltat2i: 'deltat2i',
    deltat3i: 'deltat3i',
    eps1: 'eps1',
    eps2: 'eps2',
    eps3: 'eps3',
    q1: 'q1',
    q2: 'q2',
    q3: 'q3',
    nki: 'nki'
  }

  nkiName = {
    naming: 'Уникальный номер',
    k: 'коэф промеж теплопроводности',
    pbc: 'давление воздуха на входе в ступень',
    f: 'каталожный параметр',
    q: 'производительность ЦКА на всасывании',
    mh20: 'масса воды',
    t_I_HOI2: 'температура воздуха на входе в 2 ступень ЦКА',
    t_I_HOI3: 'температура воздуха на входе в 3 ступень ЦКА',
    g: 'весовой расход воздуха'
  }

}
