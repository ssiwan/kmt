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
    totalItems: number;
    totalArticles: number;
    totalTags: number;
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
                (res: HttpResponse<Station[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
        
        this.engineService.query({
            page: 0,
            size: 100,
            sort: ""}).subscribe(
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

    getTotalStations(){
        return 'Total Stations : '.concat(this.totalStations.toString());
    }

    getTotalEngines(){
        return 'Total Engines : '.concat(this.totalItems.toString());
    }

    getTotalArticles(){
        return 'Total Articles : '.concat(this.totalArticles.toString());
    }

    getTotalTags(){
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

    private onSuccess(data, headers) {
        // this.links = this.parseLinks.parse(headers.get('link'));
        this.totalStations = headers.get('X-Total-Count');
        // this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.stations = data;
    }

    private onSuccessEngineQuery(data, headers) {        
        this.engines = data;
        this.totalItems = headers.get('X-Total-Count');
    }

    private onSuccessArticlesQuery(data, headers) {        
        this.articles = data;
        this.totalArticles = headers.get('X-Total-Count');
    }

    private onSuccessTagsQuery(data, headers) {        
        this.tags = data;
        this.totalTags = headers.get('X-Total-Count');
    }   

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }   
    
}
