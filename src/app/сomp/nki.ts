export class Nki {
  id: number; //1
  k: number; //коэф промеж теплопроводности
  pbc: number; //давление воздуха на входе в ступень
  r: number; //универсальная газовая постоянная //1
  f: number;
  q: number; //производительность ЦКА на всасывании
  th20: number; //температура воды //1
  t_ATM: number; //1
  t_I_ATM: number; //1
  mh20: number; //масса воды
  c_Air: number; // теплоёмкость воздуха //1
  c_water: number; //теплоёмкость воды //1
  t_I_HOI2: number; //температура воздуха на входе в 2 ступень ЦКА
  t_I_HOI3: number; //температура воздуха на входе в 3 ступень ЦКА
  g: number; //весовой расход воздуха
  epsmax_1: number; //1
  epsmin_1: number; //1
  epsmax_2: number; //1
  epsmin_2: number; //1
  epsmax_3: number; //1
  epsmin_3: number; //1
  sig1: number; //1
  sig2: number //1
  sig3: number; //1
}
