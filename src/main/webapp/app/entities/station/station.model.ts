import { BaseEntity } from './../../shared';

export class Station implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public county?: string,
        public articles?: BaseEntity[],
    ) {
    }
}
