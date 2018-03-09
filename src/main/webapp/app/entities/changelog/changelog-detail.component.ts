import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Changelog } from './changelog.model';
import { ChangelogService } from './changelog.service';

@Component({
    selector: 'jhi-changelog-detail',
    templateUrl: './changelog-detail.component.html'
})
export class ChangelogDetailComponent implements OnInit, OnDestroy {

    changelog: Changelog;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private changelogService: ChangelogService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChangelogs();
    }

    load(id) {
        this.changelogService.find(id)
            .subscribe((changelogResponse: HttpResponse<Changelog>) => {
                this.changelog = changelogResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChangelogs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'changelogListModification',
            (response) => this.load(this.changelog.id)
        );
    }
}
