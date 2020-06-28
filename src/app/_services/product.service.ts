import { ProductInfo } from '@app/products/add-product-modal/models/productInfo.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<ProductInfo[]> {
        return this.http.get<ProductInfo[]>(`${environment.apiUrl}/products/getall`);
    }

    get(id: string) {
        return this.http.get<ProductInfo>(`${environment.apiUrl}/products/get`, {params: {id} } );
    }

    create(product: any) {
        return this.http.post(`${environment.apiUrl}/products/create`, product);
    }

    update(product: any) {
        return this.http.put(`${environment.apiUrl}/products/update`, product);
    }

    updateFile(file: any) {
        return this.http.put(`${environment.apiUrl}/products/updatefile`, file);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/products/delete`, {params: {id} });
    }
}
