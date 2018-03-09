import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Changelog } from './changelog.model';
import { ChangelogPopupService } from './changelog-popup.service';
import { ChangelogService } from './changelog.service';

@Component({
    selector: 'jhi-changelog-delete-dialog',
    templateUrl: './changelog-delete-dialog.component.html'
})
export class ChangelogDeleteDialogComponent {

    changelog: Changelog;

    constructor(
        private changelogService: ChangelogService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.changelogService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'changelogListModification',
                content: 'Deleted an changelog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-changelog-delete-popup',
    template: ''
})
export class ChangelogDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changelogPopupService: ChangelogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.changelogPopupService
                .open(ChangelogDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
