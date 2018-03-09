/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DhsKnowledgeManagementTestModule } from '../../../test.module';
import { ChangelogDetailComponent } from '../../../../../../main/webapp/app/entities/changelog/changelog-detail.component';
import { ChangelogService } from '../../../../../../main/webapp/app/entities/changelog/changelog.service';
import { Changelog } from '../../../../../../main/webapp/app/entities/changelog/changelog.model';

describe('Component Tests', () => {

    describe('Changelog Management Detail Component', () => {
        let comp: ChangelogDetailComponent;
        let fixture: ComponentFixture<ChangelogDetailComponent>;
        let service: ChangelogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DhsKnowledgeManagementTestModule],
                declarations: [ChangelogDetailComponent],
                providers: [
                    ChangelogService
                ]
            })
            .overrideTemplate(ChangelogDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangelogDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangelogService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Changelog(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.changelog).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
