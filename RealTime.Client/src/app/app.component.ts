import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignalrService } from './services/signalr.service';
import { RealtimeModel } from './interfaces/realtime-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private httpClient: HttpClient,
    public signalRService: SignalrService
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferRealtimeDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.httpClient.get<RealtimeModel>('https://localhost:5001/api/realtime')
      .subscribe(res => console.log(res)
    );
  }
}
