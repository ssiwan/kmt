import { BaseEntity } from './../../shared';

export const enum EngineStatus {
    'READY',
    'UNSTAFFED',
    'OUTOFSERVICE',
    'INTRANSIT'
}

export class Engine implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public status?: EngineStatus,
        public articles?: BaseEntity[],
    ) {
    }
}
