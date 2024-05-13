import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Nhi} from "../pump/nhi";
import {FullNKi} from "./fullNKi";
import {Nki} from "../сomp/nki";

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
  selector: 'app-nki-page',
  templateUrl: './nki.component.html',
  styleUrls: ['./nki.component.scss']
})
export class NkiComponent implements OnInit{
  toggle = false;
  toggleGr = false;
  toggleRes = false;
  toggleResGr = false;

  nki: Nki[]

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

  constructor(private http: HttpClient) {
    this.http.get<Nki[]>("http://localhost:8080/nki").subscribe(result =>{
      this.nki = result;
    })
  }

  naming =  {
    id: "id",
    k: 'коэф промеж теплопроводности',
    pbc: 'давление воздуха на входе в ступень',
    r: 'каталожный параметр',
    f: 'каталожный параметр',
    q: 'производительность ЦКА на всасывании',
    th20: 'температура воды',
    t_ATM: 'температура атмосферного воздуха',
    t_I_ATM: 'температура воздуха при входе',
    mh20: 'масса воды',
    c_Air: 'каталожный параметр',
    c_water: 'теплоёмкость воды',
    t_I_HOI2: 'температура воздуха на входе в 2 ступень ЦКА',
    t_I_HOI3: 'температура воздуха на входе в 3 ступень ЦКА',
    g: 'весовой расход воздуха',
    epsmax_1: 'каталожный параметр',
    epsmin_1: 'каталожный параметр',
    epsmax_2: 'каталожный параметр',
    epsmin_2: 'каталожный параметр',
    epsmax_3: 'каталожный параметр',
    epsmin_3: 'каталожный параметр',
    sig1: 'sig1',
    sig2: 'sig2',
    sig3: 'sig3'
  }

  // nbiObj = {
  //   K: 17,
  //   PBC: 18,
  //   R: 130,
  //   F: 1000,
  //   Q: 1.8,
  //   TH20: 2.1,
  //   T_ATM: 2.4,
  //   T_I_ATM: 1.2,
  //   MH20: 3,
  //   C_Air: 7,
  //   C_water: 1.05,
  //   T_I_HOI2: 0.7,
  //   T_I_HOI3: 1.1,
  //   G: 1.01,
  //   sig1: 0.7,
  //   sig2: 22,
  //   sig3: 24
  // }


  nbiResObj = {
    eps1i: 345.4,
    eps2i: 345.2,
    eps3i: 654.1,
    sigma1: 56,
    sigma2: 79.3,
    sigma3: 546,
    THO1: 76.2,
    THO2: 45.8,
    THO3: 32.4,
    Z: 54,
    Tk1: 576,
    Tk2: 456,
    W1: 426,
    W2: 657,
    deltaT1i: 243,
    deltaT2i: 645.5,
    deltaT3i: 31.4,
    eps1: 32.8,
    eps2: 30.4,
    eps3: 36.6,
    Q1: 45,
    Q2: 56,
    Q3: 87,
    Nki: 7845.53423
  }

  namingRes = {
    id: "id",
    k: 'k',
    pbc: 'pbc',
    r: 'r',
    f: 'f',
    q: 'q',
    th20: 'th20',
    t_ATM: 't_ATM',
    t_I_ATM: 't_I_ATM',
    mh20: 'mh20',
    c_Air: 'c_Air',
    c_water: 'c_water',
    t_I_HOI2: 't_I_HOI2',
    t_I_HOI3: 't_I_HOI3',
    g: 'g',
    epsmax_1: 'epsmax_1',
    epsmin_1: 'epsmin_1',
    epsmax_2: 'epsmax_2',
    epsmin_2: 'epsmin_2',
    epsmax_3: 'epsmax_3',
    epsmin_3: 'epsmin_3',
    sig1: 'sig1',
    sig2: 'sig2',
    sig3: 'sig3'
  }


  ngOnInit() {
  }

}
