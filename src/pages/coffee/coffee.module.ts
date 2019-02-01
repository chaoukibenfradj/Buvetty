import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoffeePage } from './coffee';

@NgModule({
  declarations: [
    CoffeePage,
  ],
  imports: [
    IonicPageModule.forChild(CoffeePage),
  ],
})
export class CoffeePageModule {}
