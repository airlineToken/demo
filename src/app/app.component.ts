import { Component } from '@angular/core';
import { MongolabService } from './mongolab.service';

@Component({
  selector: 'app-root',
  providers: [MongolabService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recLoc = 'RECLOC';
  passengerDetails = {};
  currentlyServedRank = '?';

  constructor(mongoService: MongolabService) {
    mongoService.getPassengerDetails(this.recLoc).subscribe(data => {
        console.dir(data[0]);
        this.passengerDetails = data[0];
    });
  }
}
