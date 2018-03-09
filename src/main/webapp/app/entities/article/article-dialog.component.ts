import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Article } from './article.model';
import { ArticlePopupService } from './article-popup.service';
import { ArticleService } from './article.service';
import { Tag, TagService } from '../tag';
import { Changelog, ChangelogService } from '../changelog';
import { Station, StationService } from '../station';
import { Engine, EngineService } from '../engine';

@Component({
    selector: 'jhi-article-dialog',
    templateUrl: './article-dialog.component.html'
})
export class ArticleDialogComponent implements OnInit {

    article: Article;
    isSaving: boolean;

    tags: Tag[];

    changelogs: Changelog[];

    stations: Station[];

    engines: Engine[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private articleService: ArticleService,
        private tagService: TagService,
        private changelogService: ChangelogService,
        private stationService: StationService,
        private engineService: EngineService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tagService.query()
            .subscribe((res: HttpResponse<Tag[]>) => { this.tags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.changelogService.query()
            .subscribe((res: HttpResponse<Changelog[]>) => { this.changelogs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.stationService.query()
            .subscribe((res: HttpResponse<Station[]>) => { this.stations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.engineService.query()
            .subscribe((res: HttpResponse<Engine[]>) => { this.engines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.article.id !== undefined) {
            this.subscribeToSaveResponse(
                this.articleService.update(this.article));
        } else {
            this.subscribeToSaveResponse(
                this.articleService.create(this.article));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Article>>) {
        result.subscribe((res: HttpResponse<Article>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Article) {
        this.eventManager.broadcast({ name: 'articleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTagById(index: number, item: Tag) {
        return item.id;
    }

    trackChangelogById(index: number, item: Changelog) {
        return item.id;
    }

    trackStationById(index: number, item: Station) {
        return item.id;
    }

    trackEngineById(index: number, item: Engine) {
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
    selector: 'jhi-article-popup',
    template: ''
})
export class ArticlePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private articlePopupService: ArticlePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.articlePopupService
                    .open(ArticleDialogComponent as Component, params['id']);
            } else {
                this.articlePopupService
                    .open(ArticleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
