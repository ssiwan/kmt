import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhsKnowledgeManagementSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { StatModule } from '../shared/stat';

import { ScorecardModule } from '../shared/scorecard';
@NgModule({
    imports: [
        DhsKnowledgeManagementSharedModule,
        StatModule,
        ScorecardModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [        
    ],
    providers: [        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhsKnowledgeManagementHomeModule {}
