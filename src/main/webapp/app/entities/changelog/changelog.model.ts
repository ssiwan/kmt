import { BaseEntity } from './../../shared';

export class Changelog implements BaseEntity {
    constructor(
        public id?: number,
        public modified?: any,
        public userId?: number,
        public articles?: BaseEntity[],
    ) {
    }
}
