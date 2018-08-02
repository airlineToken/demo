import { Component, OnInit  } from '@angular/core';
import { MongolabService } from '../mongolab.service';
import { Observable} from 'rxjs/Rx';

import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  providers: [MongolabService],
  templateUrl: './passenger-display.component.html',
  styleUrls: ['./passenger-display.component.css']
})
export class PassengerDisplayComponent implements OnInit {
  recLoc = '';
  passengerDetails: any = {};
  queue: any = {};
  unknownPnr: boolean = false;
  counterName: null;

  constructor(private mongoService: MongolabService, private route: ActivatedRoute) {}

  refreshPassengerDetails() {
    this.mongoService.getPassengerDetails().subscribe((data: any) => {
        let filtered = data.filter(pax => {
          return pax.recLoc === this.recLoc;
        });

        if (filtered.length == 0) {
          this.unknownPnr = true;
          return;
        }

        this.passengerDetails = filtered[0];
        let done = this.queue.done[this.recLoc];

        if (!this.passengerDetails.rank && !done) {
        Observable.timer(3000).subscribe(data => {
          this.addPassengerToQueue(this.passengerDetails, this.queue);
        });
        }
    });
  }

  refreshQueueDetails() {
    this.mongoService.getQueueDetails().subscribe(data => {
      this.queue = data[0];

      this.counterName = null;
      // Update counterName?
      for (let i = 0; i < this.queue.currentlyServed.length; ++i) {
        if (this.queue.currentlyServed[i].recLoc === this.recLoc) {
            this.counterName = this.queue.currentlyServed[i].counterName;
        }
      }
    });
  }

  addPassengerToQueue(passenger: any, queue: any) {
    var newRank = queue.lastInsertedRank +1;

    queue.lastInsertedRank = newRank;
    queue.queue.push({
        rank: newRank,
        recLoc: passenger.recLoc
    });
    passenger.rank = newRank;

    this.mongoService.patchPassenger(passenger).subscribe(data => {
      console.log("Put pax response:");
      console.dir(data);
    });
    this.mongoService.patchQueue(queue).subscribe(data => {
      console.log("Put queue response:");
      console.dir(data);
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.recLoc = params.recLoc;
    });
    this.refreshQueueDetails();
    this.refreshPassengerDetails();
    Observable.interval(5000).subscribe(data => {
        this.refreshPassengerDetails();
    });

    Observable.interval(5000).subscribe(data => {
        this.refreshQueueDetails();
    });
  }
}
