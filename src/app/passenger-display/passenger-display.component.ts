import { Component } from '@angular/core';
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
  recLoc = 'HUEHUE';
  passengerDetails: any = {};
  queue: any = {};
  currentlyServedRank = '?';

  constructor(private mongoService: MongolabService, private route: ActivatedRoute) {}

  refreshPassengerDetails() {
    this.mongoService.getPassengerDetails().subscribe(data => {
        this.passengerDetails = data.filter(pax => {
          return pax.recLoc === this.recLoc;
        })[0];

        if (!this.passengerDetails.rank) {
        Observable.timer(3000).subscribe(data => {
          this.addPassengerToQueue(this.passengerDetails, this.queue);
        });
        }
    });
  }

  refreshQueueDetails() {
    this.mongoService.getQueueDetails().subscribe(data => {
      this.queue = data[0];
    });
  }

  addPassengerToQueue(passenger: any, queue: any) {
    var newRank = queue.lastInsertedRank +1;

    queue.lastInsertedRank = newRank;
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
    );
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
