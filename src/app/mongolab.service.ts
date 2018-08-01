import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MongolabService {

  baseURL = 'https://api.mlab.com/api/1/databases/virtual-token/collections/';
  apiKey = 'm0lpQ0AtgHyiKNl1sIhYS7aYXdXDetVU';

  constructor(private http: HttpClient) { }

  getPassengerDetails(recLoc: string) {

    var aURL = this.baseURL + 'Passengers?apiKey=' + this.apiKey;
    return this.http.get(aURL);
  }
}
