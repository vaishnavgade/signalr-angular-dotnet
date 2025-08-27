import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignalrService } from './services/signalr.service';
import { MessageModel } from './interfaces/message-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [SignalrService]
})
export class App implements OnInit {

  public data: WritableSignal<MessageModel> = signal(<MessageModel>{});
  public signalRService: SignalrService = inject(SignalrService);

  private httpClient: HttpClient = inject(HttpClient);

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferRealtimeDataListener();
  }

  public startAuto(): void
  {
    this.httpClient.get<MessageModel>('https://localhost:5001/api/realtime/startauto')
      .subscribe(res => {
        this.data.set(res);
        console.log(res);
      }
    );
  }

  public start(): void
  {
    this.httpClient.get<MessageModel>('https://localhost:5001/api/realtime/start')
      .subscribe(res => {
        this.data.set(res);
        console.log(res);
      }
    );
  }

  public stop(): void
  {
    this.httpClient.get<MessageModel>('https://localhost:5001/api/realtime/stop')
      .subscribe(res => {
        this.data.set(res);
        console.log(res);
      }
    );
  }
}
