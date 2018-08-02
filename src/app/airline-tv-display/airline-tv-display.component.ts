import { Component, OnInit } from '@angular/core';
import { MongolabService } from '../mongolab.service';

@Component({
  selector: 'app-airline-tv-display',
  providers: [MongolabService],    
  templateUrl: './airline-tv-display.component.html',
  styleUrls: ['./airline-tv-display.component.css']
})
export class AirlineTvDisplayComponent implements OnInit {

  records = {};

  constructor(mongoService: MongolabService) { 
    mongoService.getRecordsinQueue().subscribe(data => {
      console.dir(data[0]);
      this.records = data;
    });
  }

  ngOnInit() {
  }

}
