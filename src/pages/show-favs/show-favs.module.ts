import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowFavsPage } from './show-favs';

@NgModule({
  declarations: [
    ShowFavsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowFavsPage),
  ],
})
export class ShowFavsPageModule {}
