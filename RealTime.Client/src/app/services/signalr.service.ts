import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { RealtimeModel } from '../interfaces/realtime-model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | undefined;

  public data: RealtimeModel = <RealtimeModel>{};

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/realtime')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferRealtimeDataListener = () => {
    this.hubConnection?.on('TransferRealtimeData', (data) => {
      this.data = data;
      console.log(data);
    });
  }
}
