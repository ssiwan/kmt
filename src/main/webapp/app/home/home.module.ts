import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhsKnowledgeManagementSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { StatModule } from '../shared/stat';

import { ScorecardModule } from '../shared/scorecard';

import { StationService } from '../entities/station';

import { EngineService } from '../entities/engine';

import { ArticleService } from '../entities/article';

import { TagService } from '../entities/tag';

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
        StationService,
        EngineService,
        ArticleService,
        TagService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhsKnowledgeManagementHomeModule {}
