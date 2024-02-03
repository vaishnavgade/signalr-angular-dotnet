import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignalrService } from './services/signalr.service';
import { MessageModel } from './interfaces/message-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public data: MessageModel = <MessageModel>{};

  constructor(
    private httpClient: HttpClient,
    public signalRService: SignalrService
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferRealtimeDataListener();
  }

  public startAuto(): void
  {
    this.httpClient.get<MessageModel>('https://localhost:5001/api/realtime/startauto')
      .subscribe(res => {
        this.data = res;
        console.log(res);
      }
    );
  }

  public start(): void
  {
    this.httpClient.get<MessageModel>('https://localhost:5001/api/realtime/start')
      .subscribe(res => {
        this.data = res;
        console.log(res);
      }
    );
  }

  public stop(): void
  {
    this.httpClient.get<MessageModel>('https://localhost:5001/api/realtime/stop')
      .subscribe(res => {
        this.data = res;
        console.log(res);
      }
    );
  }
}
