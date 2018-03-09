import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DhsKnowledgeManagementStationModule } from './station/station.module';
import { DhsKnowledgeManagementEngineModule } from './engine/engine.module';
import { DhsKnowledgeManagementChangelogModule } from './changelog/changelog.module';
import { DhsKnowledgeManagementTagModule } from './tag/tag.module';
import { DhsKnowledgeManagementArticleModule } from './article/article.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DhsKnowledgeManagementStationModule,
        DhsKnowledgeManagementEngineModule,
        DhsKnowledgeManagementChangelogModule,
        DhsKnowledgeManagementTagModule,
        DhsKnowledgeManagementArticleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhsKnowledgeManagementEntityModule {}
