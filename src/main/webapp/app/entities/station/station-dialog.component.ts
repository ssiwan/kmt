import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Station } from './station.model';
import { StationPopupService } from './station-popup.service';
import { StationService } from './station.service';
import { Article, ArticleService } from '../article';

@Component({
    selector: 'jhi-station-dialog',
    templateUrl: './station-dialog.component.html'
})
export class StationDialogComponent implements OnInit {

    station: Station;
    isSaving: boolean;

    articles: Article[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stationService: StationService,
        private articleService: ArticleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.articleService.query()
            .subscribe((res: HttpResponse<Article[]>) => { this.articles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.station.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stationService.update(this.station));
        } else {
            this.subscribeToSaveResponse(
                this.stationService.create(this.station));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Station>>) {
        result.subscribe((res: HttpResponse<Station>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Station) {
        this.eventManager.broadcast({ name: 'stationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
    selector: 'jhi-station-popup',
    template: ''
})
export class StationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stationPopupService: StationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stationPopupService
                    .open(StationDialogComponent as Component, params['id']);
            } else {
                this.stationPopupService
                    .open(StationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
