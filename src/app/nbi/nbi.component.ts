import {Component, Input, OnInit} from '@angular/core'

export interface Nbi {
  TH20: number,
  T1H20: number,
  MH20: number,
  ro: number,
  l0: number,
  l1: number,
  l2: number,
  A0R: number,
  h: number,
  deltaT: number,
  kb: number,
  kpdA: number,
  C2: number,
  lambda: number,
  k: number,
  epsE: number,
  E11: number,
  E21: number
}

@Component({
  selector: 'app-nbi',
  templateUrl: './nbi.component.html',
  styleUrls: ['./nbi.component.scss']
})
export class NbiComponent implements OnInit{
  toggle = false;
  toggleGr = false;
  toggleRes = false;
  toggleResGr = false;
  @Input() nbi!:Nbi

  toggleData(){
    this.toggle = !this.toggle;
  }

  toggleGraph(){
    this.toggleGr = !this.toggleGr;
  }

  toggleResult(){
    this.toggleRes = !this.toggleRes;
  }

  toggleResultGr(){
    this.toggleResGr = !this.toggleResGr;
  }

  title = 'My nbi title'
  text: string = "asvs"
  array = [1,2,3,4,5,6,7,8]

  obj = {name: 'naming', info:{
    moreInfo: 'thisinfo',
      num: 32
    }}

  naming =  {
    TH20: 'температура воды',
    T1H20: 'температура воды на входе в градирню',
    MH20: 'масса воды',
    ro: 'плотность воды',
    l0: 'коэф напорной характеристики вентилятора',
    l1: 'коэф напорной характеристики вентилятора',
    l2: 'коэф напорной характеристики вентилятора',
    A0R: 'коэф, зависящий от конструктивного исполнения секции градирни',
    h: 'высота оросителя',
    deltaT: 'уменьшение температуры после градирни',
    kb: 'мастабирующий коэф',
    kpdA: 'кпд вентилятора',
    C2: 'системный параметр',
    lambda: 'системный параметр',
    k: 'системный параметр',
    epsE: 'системный параметр',
    E11: 'системный параметр',
    E21: 'системный параметр'
  }


  nbiObj = {
    TH20: 17,
    T1H20: 18,
    MH20: 130,
    ro: 1000,
    l0: 1.8,
    l1: 2.1,
    l2: 2.4,
    A0R: 1.2,
    h: 3,
    deltaT: 7,
    kb: 1.05,
    kpdA: 0.7,
    C2: 1.1,
    lambda: 1.01,
    k: 0.7,
    epsE: 4,
    E11: 22,
    E21: 24
  }


  nbiResObj = {
    PvAi: 342.31244,
    QAi: 3453.87945,
    NBi: 2134.7876
  }

  namingRes = {
    PvAi: 'PvAi',
    QAi: 'QAi',
    NBi: 'NBi'
  }


  ngOnInit() {
  }

}
