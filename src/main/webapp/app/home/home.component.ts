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
    distinctTags: any[];
    outstandingArticles: Map<string, number> = new Map<string, number>();
    goodArticles: Map<string, number> = new Map<string, number>();
    poorArticles: Map<string, number> = new Map<string, number>();
    isDataAvailable: boolean;
    outStandingChartData: number[];
    goodChartData: number[];
    poorChartData: number[];
    finalChartData: any;
    chartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Knowledge Articles Scorecard',
            fontSize: 14
        }
    };

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

    getChartLabels() {
        return this.distinctTags;
    }

    onChartClick(event) {
        console.log(event);
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadAll() {
        if (!this.isAuthenticated) {
            return;
        }
        this.stationService.query({
            page: 0,
            size: 100,
            sort: ''
        }).subscribe(
            (res: HttpResponse<Station[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.engineService.query({
            page: 0,
            size: 100,
            sort: ''
        }).subscribe(
            (res: HttpResponse<Engine[]>) => this.onSuccessEngineQuery(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.articleService.query({
            page: 0,
            size: 1000,
            sort: ''
        }).subscribe(
            (res: HttpResponse<Article[]>) => this.onSuccessArticlesQuery(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.tagService.query({
            page: 0,
            size: 100,
            sort: ''
        }).subscribe(
            (res: HttpResponse<Tag[]>) => this.onSuccessTagsQuery(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.totalArticles = 0;
        this.totalItems = 0;
        this.totalStations = 0;
        this.totalTags = 0;
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
        return 'Total Engines : '.concat(this.totalItems.toString());
    }

    getTotalArticles() {
        return 'Total Articles : '.concat(this.totalArticles.toString());
    }

    getTotalTags() {
        return 'Total Article Types : '.concat(this.totalTags.toString());
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.loadAll();
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
        this.totalStations = headers.get('X-Total-Count');
        this.stations = data;
    }

    private onSuccessEngineQuery(data, headers) {
        this.engines = data;
        this.totalItems = headers.get('X-Total-Count');
    }

    private groupBy(tagName, review) {
        switch (review) {
            case 'Outstanding': {
                const x = this.outstandingArticles.get(tagName);
                this.outstandingArticles.set(tagName,
                    x === undefined ? 1 : x + 1);
                break;
            }
            case 'Good': {
                const y = this.goodArticles.get(tagName);
                this.goodArticles.set(tagName,
                    y === undefined ? 1 : y + 1);
                break;
            }
            case 'Poor': {
                const z = this.poorArticles.get(tagName);
                this.poorArticles.set(tagName,
                    z === undefined ? 1 : z + 1);
                break;
            }
        }
    }

    private onSuccessArticlesQuery(data, headers) {
        this.articles = data;
        const allTags = [];
        data.forEach((article) => {
            article.tags.forEach((tag) => {
                allTags.push(tag.name);
                this.groupBy(tag.name, article.review);
            });
        });

        this.distinctTags = allTags.filter((value, index, seriesValues) => (seriesValues.slice(0, index)).indexOf(value) === -1);
        console.log(this.distinctTags);
        console.log('Outstanding : ', this.outstandingArticles);
        console.log('Good : ', this.goodArticles);
        console.log('Poor : ', this.poorArticles);

        this.totalArticles = headers.get('X-Total-Count');
        this.getChartLabelsAndData();
        this.isDataAvailable = true;
    }

    private onSuccessTagsQuery(data, headers) {
        this.tags = data;
        this.totalTags = headers.get('X-Total-Count');
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private getChartLabelsAndData() {
        const outStanding = [];
        const good = [];
        const poor = [];
        this.distinctTags.forEach((element) => {
            const tagData = this.outstandingArticles.get(element);
            outStanding.push(tagData === undefined ? 0 : tagData);
        });

        this.distinctTags.forEach((element) => {
            const tagData = this.goodArticles.get(element);
            good.push(tagData === undefined ? 0 : tagData);
        });

        this.distinctTags.forEach((element) => {
            const tagData = this.poorArticles.get(element);
            poor.push(tagData === undefined ? 0 : tagData);
        });

        this.outStandingChartData = outStanding;
        this.goodChartData = good;
        this.poorChartData = poor;

        this.finalChartData = [
            { data: this.outStandingChartData, label: 'Outstanding' },
            { data: this.goodChartData, label: 'Good' },
            { data: this.poorChartData, label: 'Poor' }
        ];
    }

}
