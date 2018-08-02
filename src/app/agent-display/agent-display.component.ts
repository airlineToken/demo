import { Component, OnInit } from '@angular/core';
import { MongolabService } from '../mongolab.service';

@Component({
  selector: 'app-agent-display',
  providers: [MongolabService],    
  templateUrl: './agent-display.component.html',
  styleUrls: ['./agent-display.component.css']
})
export class AgentDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
