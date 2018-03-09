import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Station } from './station.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Station>;

@Injectable()
export class StationService {

    private resourceUrl =  SERVER_API_URL + 'api/stations';

    constructor(private http: HttpClient) { }

    create(station: Station): Observable<EntityResponseType> {
        const copy = this.convert(station);
        return this.http.post<Station>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(station: Station): Observable<EntityResponseType> {
        const copy = this.convert(station);
        return this.http.put<Station>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Station>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Station[]>> {
        const options = createRequestOption(req);
        return this.http.get<Station[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Station[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Station = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Station[]>): HttpResponse<Station[]> {
        const jsonResponse: Station[] = res.body;
        const body: Station[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Station.
     */
    private convertItemFromServer(station: Station): Station {
        const copy: Station = Object.assign({}, station);
        return copy;
    }

    /**
     * Convert a Station to a JSON which can be sent to the server.
     */
    private convert(station: Station): Station {
        const copy: Station = Object.assign({}, station);
        return copy;
    }
}
