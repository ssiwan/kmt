import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { RouterModule } from '@angular/router';
import {engineRoute} from '../../entities/engine/';
import {stationRoute} from '../../entities/station/';

const ENTITY_STATES = [
    ...engineRoute,
    ...stationRoute
];

@NgModule({
    imports: [CommonModule,
    RouterModule.forChild(ENTITY_STATES)],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule {}
