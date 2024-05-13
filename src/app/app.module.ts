import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {NbiComponent} from './nbi/nbi.component';
import {NkiComponent} from './nki/nki.component';
import {UPageComponent} from "./u-page/u-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {UpdataComponent} from "./updata/updata.component";
import {ConstComponent} from "./const/const.component";
import {PumpComponent} from "./pump/pump.component";
import {ChartsComponent} from "./charts/charts.component";
import {FanComponent} from "./fan/fan.component";
import {CompComponent} from "./сomp/comp.component";
import {DamageComponent} from "./damage/damage.component";
import {ResComponent} from "./res/res.component";

const routes = [
  {path: '', component: HomePageComponent},
  {path: 'nki', component: NkiComponent},
  {path: 'u', component: UPageComponent},
  {path: 'nbi', component: NbiComponent},
  {path: 'updata', component: UpdataComponent},
  {path: 'const', component: ConstComponent},
  {path: 'pump', component: PumpComponent},
  {path: 'comp', component: CompComponent},
  {path: 'fan', component: FanComponent},
  {path: 'damage', component: DamageComponent},
  {path: 'res', component: ResComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NbiComponent,
    NkiComponent,
    UPageComponent,
    HomePageComponent,
    UpdataComponent,
    ConstComponent,
    PumpComponent,
    FanComponent,
    CompComponent,
    DamageComponent,
    ResComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
