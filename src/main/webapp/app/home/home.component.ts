import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Station } from '../entities/station/station.model';
import { StationService } from '../entities/station/station.service';
import { Engine } from '../entities/engine/engine.model';
import { EngineService } from '../entities/engine/engine.service';
import { ArticleService } from '../entities/article/article.service';
import { TagService } from '../entities/tag/tag.service';
import { Article } from '../entities/article/article.model';
import { Tag } from '../entities/tag/tag.model';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    stations: Station[];
    engines: Engine[];
    articles: Article[];
    tags: Tag[];
    predicate: any;
    reverse: any;
    totalStations: number;
    totalEngines: number;
    totalArticles: number;
    totalTags: number;
    outstandingArticles: Map<string, number> = new Map<string, number>();
    goodArticles: Map<string, number> = new Map<string, number>();
    poorArticles: Map<string, number> = new Map<string, number>();
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private stationService: StationService,
        private engineService: EngineService,
        private articleService: ArticleService,
        private tagService: TagService,
        private jhiAlertService: JhiAlertService
        ) {
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadAll() {
        this.stationService.query({
            page: 0,
            size: 100,
            sort: ''}).subscribe(
                (res: HttpResponse<Station[]>) => this.onSuccessStationQuery(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.engineService.query({
            page: 0,
            size: 100,
            sort: ''}).subscribe(
                (res: HttpResponse<Engine[]>) => this.onSuccessEngineQuery(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.articleService.query({
            page: 0,
            size: 1000,
            sort: ''}).subscribe(
                (res: HttpResponse<Article[]>) => this.onSuccessArticlesQuery(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.tagService.query({
            page: 0,
            size: 100,
            sort: ''}).subscribe(
                (res: HttpResponse<Tag[]>) => this.onSuccessTagsQuery(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    getStationId(index: number, item: Station) {
        return item.id;
    }

    getTotalStations() {
        return 'Total Stations : '.concat(this.totalStations.toString());
    }

    getTotalEngines() {
        return 'Total Engines : '.concat(this.totalEngines.toString());
    }

    getTotalArticles() {
        return 'Total Articles : '.concat(this.totalArticles.toString());
    }

    getTotalTags() {
        return 'Total Tags : '.concat(this.totalTags.toString());
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onSuccessStationQuery(data, headers) {
        this.totalStations = headers.get('X-Total-Count');
        this.stations = data;
    }

    private onSuccessEngineQuery(data, headers) {
        this.engines = data;
        this.totalEngines = headers.get('X-Total-Count');
    }

    private groupBy(tagName, review) {
        switch (review) {
            case 'Outstanding' :
                const x = this.outstandingArticles.get(tagName);
                this.outstandingArticles.set(tagName, 
                    x === undefined ? 0 :  x + 1);
            case 'Good' :
                const y = this.goodArticles.get(tagName);
                this.goodArticles.set(tagName, 
                    y === undefined ? 0 : y + 1);
            case 'Poor' :
                const z = this.poorArticles.get(tagName);
                this.poorArticles.set(tagName, 
                    z === undefined ? 0 : z + 1);
        }
    }

    private onSuccessArticlesQuery(data, headers) {
        this.articles = data;

        data.forEach(article => {
            article.tags.forEach(tag => {
                this.groupBy(tag.name, article.review);
            });
        });

        console.log('Outstanding : ', this.outstandingArticles);
        console.log('Good : ', this.goodArticles);
        console.log('Poor : ', this.poorArticles);

        this.totalArticles = headers.get('X-Total-Count');
    }

    getArtilePerType(data){
        return data.map(res => res.tags);
    }

    private onSuccessTagsQuery(data, headers) {
        this.tags = data;
        this.totalTags = headers.get('X-Total-Count');
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
