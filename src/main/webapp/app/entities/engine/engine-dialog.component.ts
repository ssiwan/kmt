import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Engine } from './engine.model';
import { EnginePopupService } from './engine-popup.service';
import { EngineService } from './engine.service';
import { Article, ArticleService } from '../article';
import { Station, StationService } from '../station';

@Component({
    selector: 'jhi-engine-dialog',
    templateUrl: './engine-dialog.component.html'
})
export class EngineDialogComponent implements OnInit {

    engine: Engine;
    isSaving: boolean;

    articles: Article[];

    stations: Station[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private engineService: EngineService,
        private articleService: ArticleService,
        private stationService: StationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.articleService.query()
            .subscribe((res: HttpResponse<Article[]>) => { this.articles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.stationService.query()
            .subscribe((res: HttpResponse<Station[]>) => { this.stations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.engine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.engineService.update(this.engine));
        } else {
            this.subscribeToSaveResponse(
                this.engineService.create(this.engine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Engine>>) {
        result.subscribe((res: HttpResponse<Engine>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Engine) {
        this.eventManager.broadcast({ name: 'engineListModification', content: 'OK'});
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

    trackStationById(index: number, item: Station) {
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
    selector: 'jhi-engine-popup',
    template: ''
})
export class EnginePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enginePopupService: EnginePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enginePopupService
                    .open(EngineDialogComponent as Component, params['id']);
            } else {
                this.enginePopupService
                    .open(EngineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
