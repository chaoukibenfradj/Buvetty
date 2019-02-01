import { NgModule } from '@angular/core';
import { HideHeaderDirective } from './hide-header/hide-header';
import { RotateMenuDirective } from './rotate-menu/rotate-menu';
@NgModule({
	declarations: [HideHeaderDirective,
    RotateMenuDirective],
	imports: [],
	exports: [HideHeaderDirective,
    RotateMenuDirective]
})
export class DirectivesModule {}
