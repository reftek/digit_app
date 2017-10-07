import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class InvoiceService {

  private baseUrl: string = environment.apiUrl + 'invoices';
  
  constructor(private http: HttpClient) { }

  create(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl, body, { headers })
  }

  send(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/send`;
    return this.http.post<any>(url, body, { headers })
  }

  get(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<any>(url, { headers, params })
  }

  download(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.baseUrl}/${id}/download`;

    return this.http.post<any>(url, {});
  }

  update(id: string, body: object, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.put<any>(url, body, { headers, params })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, { headers });
  }
}
