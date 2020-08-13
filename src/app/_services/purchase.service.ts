import { PurchaseInfo } from './../_models/purchase';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PurchaseInfo[]> {
        return this.http.get<PurchaseInfo[]>(`${environment.apiUrl}/purchases/getall`);
    }

    get(id: string) {
        return this.http.get<PurchaseInfo>(`${environment.apiUrl}/purchases/get`, {params: {id} } );
    }

    create(purchase: any) {
        return this.http.post(`${environment.apiUrl}/purchases/create`, purchase);
    }
}
