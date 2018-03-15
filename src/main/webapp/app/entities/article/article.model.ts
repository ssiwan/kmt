import { BaseEntity } from './../../shared';

export const enum ArticleStatus {
    'DRAFT',
    'APPROVED'
}

export const enum ArticleReview {
    'Outstanding',
    'Good',
    'Poor'
}

export class Article implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public content?: any,
        public status?: ArticleStatus,
        public review?: ArticleReview,
        public tags?: BaseEntity[],
        public changelogs?: BaseEntity[],
        public stations?: BaseEntity[],
        public engines?: BaseEntity[],
    ) {
    }
}
