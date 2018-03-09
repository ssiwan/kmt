import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Engine } from './engine.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Engine>;

@Injectable()
export class EngineService {

    private resourceUrl =  SERVER_API_URL + 'api/engines';

    constructor(private http: HttpClient) { }

    create(engine: Engine): Observable<EntityResponseType> {
        const copy = this.convert(engine);
        return this.http.post<Engine>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(engine: Engine): Observable<EntityResponseType> {
        const copy = this.convert(engine);
        return this.http.put<Engine>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Engine>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Engine[]>> {
        const options = createRequestOption(req);
        return this.http.get<Engine[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Engine[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Engine = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Engine[]>): HttpResponse<Engine[]> {
        const jsonResponse: Engine[] = res.body;
        const body: Engine[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Engine.
     */
    private convertItemFromServer(engine: Engine): Engine {
        const copy: Engine = Object.assign({}, engine);
        return copy;
    }

    /**
     * Convert a Engine to a JSON which can be sent to the server.
     */
    private convert(engine: Engine): Engine {
        const copy: Engine = Object.assign({}, engine);
        return copy;
    }
}
