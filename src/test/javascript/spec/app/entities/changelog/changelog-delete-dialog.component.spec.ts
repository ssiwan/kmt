/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DhsKnowledgeManagementTestModule } from '../../../test.module';
import { ChangelogDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/changelog/changelog-delete-dialog.component';
import { ChangelogService } from '../../../../../../main/webapp/app/entities/changelog/changelog.service';

describe('Component Tests', () => {

    describe('Changelog Management Delete Component', () => {
        let comp: ChangelogDeleteDialogComponent;
        let fixture: ComponentFixture<ChangelogDeleteDialogComponent>;
        let service: ChangelogService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DhsKnowledgeManagementTestModule],
                declarations: [ChangelogDeleteDialogComponent],
                providers: [
                    ChangelogService
                ]
            })
            .overrideTemplate(ChangelogDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangelogDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangelogService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
