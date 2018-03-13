import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Station } from '../entities/station/station.model';
import { StationService } from '../entities/station/station.service';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

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
    predicate: any;
    reverse: any;
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private stationService: StationService,
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
            sort: ""}).subscribe(
                (res: HttpResponse<Station[]>) => this.onSuccess(res.body, res.headers),
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
        // this.totalItems = headers.get('X-Total-Count');
        // this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.stations = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
