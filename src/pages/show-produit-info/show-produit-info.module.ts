import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowProduitInfoPage } from './show-produit-info';

@NgModule({
  declarations: [
    ShowProduitInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowProduitInfoPage),
  ],
})
export class ShowProduitInfoPageModule {}
