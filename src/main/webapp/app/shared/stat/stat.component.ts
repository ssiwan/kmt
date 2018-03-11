import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
