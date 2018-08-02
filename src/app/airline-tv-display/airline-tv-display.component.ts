import { Component, OnInit } from '@angular/core';
import { MongolabService } from '../mongolab.service';
import { Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-airline-tv-display',
  providers: [MongolabService],
  templateUrl: './airline-tv-display.component.html',
  styleUrls: ['./airline-tv-display.component.css']
})
export class AirlineTvDisplayComponent implements OnInit {

  queue: any = {};
  passengers: any = {};

  aggregatedData: any = [];

  constructor(private mongoService: MongolabService) {}

  refreshData() {
    this.mongoService.getQueueDetails().subscribe(data => {
      this.queue = data[0];

      this.refreshPassengerDetails();
    });
  }

  mapByRecloc(data) {
    let result = {};
    for (let i = 0; i < data.length; ++i) {
      let pax = data[i];
      result[pax.recLoc] = pax;
    }

    return result;
  }

  refreshPassengerDetails() {
    this.mongoService.getPassengerDetails().subscribe(data => {
        this.passengers = this.mapByRecloc(data);

        this.buildAggregate();
    });
  }

  buildAggregate() {
    this.aggregatedData.length = 0;

    let counterByRecloc = {};
    for (let i = 0; i < this.queue.currentlyServed.length; ++i) {
      if (this.queue.currentlyServed[i].recLoc) {
        counterByRecloc[this.queue.currentlyServed[i].recLoc] = this.queue.currentlyServed[i].counterName;
      }
    }

    for (let i = 0; i < this.queue.queue.length; ++i) {
        if (!this.queue.done[this.queue.queue[i].recLoc]) {
            this.aggregatedData.push({
                rank: this.queue.queue[i].rank,
                recLoc: this.queue.queue[i].recLoc,
                paxData: this.passengers[this.queue.queue[i].recLoc],
                counterName: counterByRecloc[this.queue.queue[i].recLoc]
            });
        }
    }
  }

  ngOnInit() {
    this.refreshData();
    Observable.interval(5000).subscribe(data => {
        this.refreshData();
    });
  }

}
