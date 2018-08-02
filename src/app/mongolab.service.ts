import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MongolabService {

  baseURL = 'https://api.mlab.com/api/1/databases/virtual-token/collections/';
  apiKey = 'm0lpQ0AtgHyiKNl1sIhYS7aYXdXDetVU';

  constructor(private http: HttpClient) { }

  getPassengerDetails() {

    var aURL = this.baseURL + 'Passengers?apiKey=' + this.apiKey;
    return this.http.get(aURL);
  }

  getQueueDetails() {
    var aURL = this.baseURL + 'Queue?apiKey=' + this.apiKey;
    return this.http.get(aURL);
  }

  patchPassenger(passenger: any) {
    var key = JSON.stringify({
      _id: passenger._id
    });
    var aURL = this.baseURL + 'Passengers?apiKey=' + this.apiKey + '&q=' + key;
    delete passenger._id;
    return this.http.put(aURL, passenger);
  }

  patchQueue(queue: any) {
  var key = JSON.stringify({
      _id: queue._id
    });
    var aURL = this.baseURL + 'Queue?apiKey=' + this.apiKey + '&q=' + key;
    delete queue._id;
    return this.http.put(aURL, queue);
  }
}
