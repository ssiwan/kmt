import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Changelog } from './changelog.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Changelog>;

@Injectable()
export class ChangelogService {

    private resourceUrl =  SERVER_API_URL + 'api/changelogs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(changelog: Changelog): Observable<EntityResponseType> {
        const copy = this.convert(changelog);
        return this.http.post<Changelog>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(changelog: Changelog): Observable<EntityResponseType> {
        const copy = this.convert(changelog);
        return this.http.put<Changelog>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Changelog>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Changelog[]>> {
        const options = createRequestOption(req);
        return this.http.get<Changelog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Changelog[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Changelog = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Changelog[]>): HttpResponse<Changelog[]> {
        const jsonResponse: Changelog[] = res.body;
        const body: Changelog[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Changelog.
     */
    private convertItemFromServer(changelog: Changelog): Changelog {
        const copy: Changelog = Object.assign({}, changelog);
        copy.modified = this.dateUtils
            .convertDateTimeFromServer(changelog.modified);
        return copy;
    }

    /**
     * Convert a Changelog to a JSON which can be sent to the server.
     */
    private convert(changelog: Changelog): Changelog {
        const copy: Changelog = Object.assign({}, changelog);

        copy.modified = this.dateUtils.toDate(changelog.modified);
        return copy;
    }
}
