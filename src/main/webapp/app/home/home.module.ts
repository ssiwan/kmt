import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhsKnowledgeManagementSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { StatModule } from '../shared/stat';

// import { HomeService } from './';

@NgModule({
    imports: [
        DhsKnowledgeManagementSharedModule,
        StatModule,
      //  HomeService,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        // HomeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhsKnowledgeManagementHomeModule {}
