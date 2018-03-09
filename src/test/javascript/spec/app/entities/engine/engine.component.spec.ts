/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DhsKnowledgeManagementTestModule } from '../../../test.module';
import { EngineComponent } from '../../../../../../main/webapp/app/entities/engine/engine.component';
import { EngineService } from '../../../../../../main/webapp/app/entities/engine/engine.service';
import { Engine } from '../../../../../../main/webapp/app/entities/engine/engine.model';

describe('Component Tests', () => {

    describe('Engine Management Component', () => {
        let comp: EngineComponent;
        let fixture: ComponentFixture<EngineComponent>;
        let service: EngineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DhsKnowledgeManagementTestModule],
                declarations: [EngineComponent],
                providers: [
                    EngineService
                ]
            })
            .overrideTemplate(EngineComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Engine(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.engines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
