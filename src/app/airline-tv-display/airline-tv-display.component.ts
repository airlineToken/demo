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

  queue = {};
  passengers = {};

  constructor(private mongoService: MongolabService) {}

  refreshQueueDetails() {
    this.mongoService.getQueueDetails().subscribe(data => {
      this.queue = data[0];
    });
  }

  mapByRecloc(data: any[]) {
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
    });
  }

  ngOnInit() {
    this.refreshQueueDetails();
    Observable.interval(5000).subscribe(data => {
        this.refreshQueueDetails();
    });

    this.refreshPassengerDetails();
    Observable.interval(5000).subscribe(data => {
        this.refreshPassengerDetails();
    });
  }

}
