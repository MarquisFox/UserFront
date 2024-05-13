import {Component, Input, OnInit} from "@angular/core";
import {Nbi} from "../nki/nki.component";

export interface Up {
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
  selector: 'app-updata',
  templateUrl: './updata.component.html',
  styleUrls: ['./updata.component.scss']
})

export class UpdataComponent implements OnInit {


  toggle = false;
  toggleGr = false;
  toggleRes = false;
  toggleResGr = false;
  @Input() up!:Up

  toggleData(){
    this.toggle = !this.toggle;
  }


  naming =  {
    K: 'коэф промеж теплопроводности',
    PBC: 'давление воздуха на входе в ступень',
    R: 'универсальная газовая постоянная',
    F: 'каталожный параметр',
    Q: 'производительность ЦКА на всасывании',
    TH20: 'температура воды',
    T_ATM: 'температура атмосферного воздуха',
    T_I_ATM: 'температура воздуха на входе в ЦКА',
    MH20: 'масса воды',
    C_Air: 'теплоёмкость воздуха',
    C_water: 'теплоёмкость воды',
    T_I_HOI2: 'температура воздуха на входе в 2 ступень ЦКА',
    T_I_HOI3: 'температура воздуха на входе в 3 ступень ЦКА',
    G: 'весовой расход воздуха',
    sig1: 'безразмерная экспериментальная зависимость для 1 ступени ЦКА',
    sig2: 'безразмерная экспериментальная зависимость для 2 ступени ЦКА',
    sig3: 'безразмерная экспериментальная зависимость для 3 ступени ЦКА'
  }

  nbiObj = {
    K: 17,
    PBC: 18,
    R: 130,
    F: 1000,
    Q: 1.8,
    TH20: 2.1,
    T_ATM: 2.4,
    T_I_ATM: 1.2,
    MH20: 3,
    C_Air: 7,
    C_water: 1.05,
    T_I_HOI2: 0.7,
    T_I_HOI3: 1.1,
    G: 1.01,
    sig1: 0.7,
    sig2: 22,
    sig3: 24
  }

  ngOnInit() {
  }

}
