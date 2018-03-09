import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Station } from './station.model';
import { StationService } from './station.service';

@Component({
    selector: 'jhi-station-detail',
    templateUrl: './station-detail.component.html'
})
export class StationDetailComponent implements OnInit, OnDestroy {

    station: Station;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stationService: StationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStations();
    }

    load(id) {
        this.stationService.find(id)
            .subscribe((stationResponse: HttpResponse<Station>) => {
                this.station = stationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stationListModification',
            (response) => this.load(this.station.id)
        );
    }
}
