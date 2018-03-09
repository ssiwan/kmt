import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Changelog } from './changelog.model';
import { ChangelogPopupService } from './changelog-popup.service';
import { ChangelogService } from './changelog.service';
import { User, UserService } from '../../shared';
import { Article, ArticleService } from '../article';

@Component({
    selector: 'jhi-changelog-dialog',
    templateUrl: './changelog-dialog.component.html'
})
export class ChangelogDialogComponent implements OnInit {

    changelog: Changelog;
    isSaving: boolean;

    users: User[];

    articles: Article[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private changelogService: ChangelogService,
        private userService: UserService,
        private articleService: ArticleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.articleService.query()
            .subscribe((res: HttpResponse<Article[]>) => { this.articles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.changelog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.changelogService.update(this.changelog));
        } else {
            this.subscribeToSaveResponse(
                this.changelogService.create(this.changelog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Changelog>>) {
        result.subscribe((res: HttpResponse<Changelog>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Changelog) {
        this.eventManager.broadcast({ name: 'changelogListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackArticleById(index: number, item: Article) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-changelog-popup',
    template: ''
})
export class ChangelogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changelogPopupService: ChangelogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.changelogPopupService
                    .open(ChangelogDialogComponent as Component, params['id']);
            } else {
                this.changelogPopupService
                    .open(ChangelogDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
