import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PayslipReponse } from '../models/responses/payslip';
import { PayslipItems } from '../models/responses/payslip-items';

@Injectable()
export class PayslipService {

  baseUrl: string = environment.apiUrl + 'payslips';
  
  constructor(private http: HttpClient) { }

  get(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<PayslipReponse>(url, { headers, params })
  }

  send(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/send`;

    return this.http.post<any>(url, {}, { headers });
  }

  payItems(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/items`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<PayslipItems>(url, { headers, params })
  }

  deleteItem(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/items/${id}`;

    return this.http.delete<any>(url, { headers });
  }

  updateItem(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/items/${id}`;

    return this.http.put<any>(url, body, { headers });
  }

  addItem(id: string, body: object, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/items`;

    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.post<any>(url, body, { headers, params });
  }
}
