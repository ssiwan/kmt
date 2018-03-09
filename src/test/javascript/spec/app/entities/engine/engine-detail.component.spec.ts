/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DhsKnowledgeManagementTestModule } from '../../../test.module';
import { EngineDetailComponent } from '../../../../../../main/webapp/app/entities/engine/engine-detail.component';
import { EngineService } from '../../../../../../main/webapp/app/entities/engine/engine.service';
import { Engine } from '../../../../../../main/webapp/app/entities/engine/engine.model';

describe('Component Tests', () => {

    describe('Engine Management Detail Component', () => {
        let comp: EngineDetailComponent;
        let fixture: ComponentFixture<EngineDetailComponent>;
        let service: EngineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DhsKnowledgeManagementTestModule],
                declarations: [EngineDetailComponent],
                providers: [
                    EngineService
                ]
            })
            .overrideTemplate(EngineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EngineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EngineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Engine(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.engine).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
