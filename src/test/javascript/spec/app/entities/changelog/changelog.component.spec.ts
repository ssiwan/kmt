/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DhsKnowledgeManagementTestModule } from '../../../test.module';
import { ChangelogComponent } from '../../../../../../main/webapp/app/entities/changelog/changelog.component';
import { ChangelogService } from '../../../../../../main/webapp/app/entities/changelog/changelog.service';
import { Changelog } from '../../../../../../main/webapp/app/entities/changelog/changelog.model';

describe('Component Tests', () => {

    describe('Changelog Management Component', () => {
        let comp: ChangelogComponent;
        let fixture: ComponentFixture<ChangelogComponent>;
        let service: ChangelogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DhsKnowledgeManagementTestModule],
                declarations: [ChangelogComponent],
                providers: [
                    ChangelogService
                ]
            })
            .overrideTemplate(ChangelogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangelogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangelogService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Changelog(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.changelogs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
