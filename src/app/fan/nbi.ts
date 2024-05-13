export class Nbi {
  id: number; //1
  th20: number; //температура воды 1
  t1H20: number; //температура воды на входе в градирню 1
  mh20: number; //масса воды
  ro: number; //плотность воды //1
  l0: number; //коэф напорной характеристики вентилятора
  l1: number; //коэф напорной характеристики вентилятора
  l2: number; //коэф напорной характеристики вентилятора
  a0R: number; //коэф, зависящий от конструктивного исполнения секции градирни
  h: number; //высота оросителя
  deltaT: number; //уменьшение температуры после градирни 1
  kb: number; //мастабирующий коэф
  kpdA: number; //кпд вентилятора

  c2: number; //неизвестный параметр
  lambda: number; //неизвестный параметр

  k: number; //неизвестный параметр
  epsE: number; //неизвестный параметр
  e11: number; //неизвестный параметр
  e21: number; //неизвестный параметр
}
