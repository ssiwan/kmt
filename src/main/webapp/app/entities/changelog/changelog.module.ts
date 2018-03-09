import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhsKnowledgeManagementSharedModule } from '../../shared';
import { DhsKnowledgeManagementAdminModule } from '../../admin/admin.module';
import {
    ChangelogService,
    ChangelogPopupService,
    ChangelogComponent,
    ChangelogDetailComponent,
    ChangelogDialogComponent,
    ChangelogPopupComponent,
    ChangelogDeletePopupComponent,
    ChangelogDeleteDialogComponent,
    changelogRoute,
    changelogPopupRoute,
    ChangelogResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...changelogRoute,
    ...changelogPopupRoute,
];

@NgModule({
    imports: [
        DhsKnowledgeManagementSharedModule,
        DhsKnowledgeManagementAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangelogComponent,
        ChangelogDetailComponent,
        ChangelogDialogComponent,
        ChangelogDeleteDialogComponent,
        ChangelogPopupComponent,
        ChangelogDeletePopupComponent,
    ],
    entryComponents: [
        ChangelogComponent,
        ChangelogDialogComponent,
        ChangelogPopupComponent,
        ChangelogDeleteDialogComponent,
        ChangelogDeletePopupComponent,
    ],
    providers: [
        ChangelogService,
        ChangelogPopupService,
        ChangelogResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhsKnowledgeManagementChangelogModule {}
