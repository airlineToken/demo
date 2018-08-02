import { Component, OnInit } from '@angular/core';
import { MongolabService } from '../mongolab.service';
import { Observable} from 'rxjs/Rx';

import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-agent-display',
  providers: [MongolabService],
  templateUrl: './agent-display.component.html',
  styleUrls: ['./agent-display.component.css']
})
export class AgentDisplayComponent implements OnInit {

  queue: any = {};
  currentPassenger: any = null;
  counterName: string = '';
  error: boolean = false;

  queueCleared: boolean = false;

  constructor(private mongoService: MongolabService, private route: ActivatedRoute) {}

  refreshQueueDetails() {
    this.error = false;
    this.mongoService.getQueueDetails().subscribe(data => {
      this.queue = data[0];

      // Is a passenger already assigned?
      for (let i = 0; i < this.queue.currentlyServed.length; ++i) {
        if (this.queue.currentlyServed[i].counterName === this.counterName) {
          // get the pax with this recloc
          this.mongoService.getPassengerDetails().subscribe((data: any) => {
	        let filtered = data.filter(pax => {
	          return pax.recLoc === this.queue.currentlyServed[i].recLoc;
	        });

	        if (filtered.length == 0) {
	          this.error = true;
	        }

	        this.currentPassenger = filtered[0];
	      });
	      return;
        }
      }

      // Get next passenger in queue
      this.queueCleared = this.queue.lastServedRank >= this.queue.lastInsertedRank;
      if (!this.queueCleared) {
        let nextRank = this.queue.lastServedRank+1;
        this.queue.lastServedRank = nextRank;

        // Get next pax details
        this.mongoService.getPassengerDetails().subscribe((data: any) => {
	        let filtered = data.filter(pax => {
	          return pax.rank === nextRank;
	        });

	        if (filtered.length == 0) {
	          this.error = true;
	          return;
	        }

	        this.currentPassenger = filtered[0];

            // Update queue in DB
	        this.queue.currentlyServed.push ({
	          counterName: this.counterName,
	          rank: nextRank,
	          recLoc: this.currentPassenger.recLoc
	        });

	        this.mongoService.patchQueue(this.queue).subscribe(data => {
	          console.log("Put queue response:");
	          console.dir(data);
	        });
	    });
      }
    });
  }

  serviced() {
    // Remove the customer from the serviced ones
    let index = -1;
    for (let i = 0; i < this.queue.currentlyServed.length; ++i) {
	    if (this.queue.currentlyServed[i].counterName === this.counterName) {
	      index = i;
	      break;
	    }
    }
    this.queue.currentlyServed.splice(index, 1);
    this.queue.done[this.currentPassenger.recLoc] = true;
    this.currentPassenger = null;
    this.mongoService.patchQueue(this.queue).subscribe(data => {
      console.log("Put queue response:");
      console.dir(data);

      Observable.interval(2000).subscribe(data => {
        this.refreshQueueDetails();
    });
    });
  }

  noshow() {
    // Push the pax back at the end of the queue
    // Remove the customer from the serviced ones
    let index = -1;
    for (let i = 0; i < this.queue.currentlyServed.length; ++i) {
        if (this.queue.currentlyServed[i].counterName === this.counterName) {
          index = -1;
          break;
        }
    }
    this.queue.currentlyServed.splice(index, 1);

    // Update pax rank to last
    var newRank = this.queue.lastInsertedRank +1;
    for (let i = 0; i < this.queue.queue.length; ++i) {
        if (this.queue.queue[i].recLoc === this.currentPassenger.recLoc) {
          this.queue.queue[i].rank = newRank
          break;
        }
    }
    this.queue.lastInsertedRank = newRank;
    this.currentPassenger.rank = newRank;

    this.mongoService.patchPassenger(this.currentPassenger).subscribe(data => {
      console.log("Put pax response after noshow:");
      console.dir(data);
    });

    this.currentPassenger = null;
    this.mongoService.patchQueue(this.queue).subscribe(data => {
      console.log("Put queue response after noshow:");
      console.dir(data);

        Observable.interval(2000).subscribe(data => {
          this.refreshQueueDetails();
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.counterName = params.counterName;
    });
    this.refreshQueueDetails();

    Observable.interval(10000).subscribe(data => {
        this.refreshQueueDetails();
    });
  }

}
