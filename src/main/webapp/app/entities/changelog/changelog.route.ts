import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChangelogComponent } from './changelog.component';
import { ChangelogDetailComponent } from './changelog-detail.component';
import { ChangelogPopupComponent } from './changelog-dialog.component';
import { ChangelogDeletePopupComponent } from './changelog-delete-dialog.component';

@Injectable()
export class ChangelogResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const changelogRoute: Routes = [
    {
        path: 'changelog',
        component: ChangelogComponent,
        resolve: {
            'pagingParams': ChangelogResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhsKnowledgeManagementApp.changelog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'changelog/:id',
        component: ChangelogDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhsKnowledgeManagementApp.changelog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changelogPopupRoute: Routes = [
    {
        path: 'changelog-new',
        component: ChangelogPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhsKnowledgeManagementApp.changelog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'changelog/:id/edit',
        component: ChangelogPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhsKnowledgeManagementApp.changelog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'changelog/:id/delete',
        component: ChangelogDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhsKnowledgeManagementApp.changelog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
