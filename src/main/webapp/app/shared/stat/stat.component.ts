import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Engine } from '../../entities/engine/engine.model';

@Component({
    selector: 'jhi-app-stat',
    templateUrl: './stat.component.html'
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() engines: Array<{ id: number, number: number, status: string, articles: any }>;
    @Output() event: EventEmitter<any> = new EventEmitter();    

    constructor() { }

    ngOnInit() { }

    getClass(status) {
        switch (status) {
            case "READY": return "success";
            case "UNSTAFFED": return "warning";
            case "INTRANSIT": return "primary";
            case "OUTOFSERVICE": return "danger";
        }
    }

    getIcon(status) {
        switch (status) {
            case "READY": return "fa-smile-o";
            case "UNSTAFFED": return "fa-user-times";
            case "INTRANSIT": return "fa-taxi";
            case "OUTOFSERVICE": return "fa-times-circle";
        }
    }

    getEngineId(index: number, item: Engine) {
        return item.id;
    }
}
