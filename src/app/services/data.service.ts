import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { OHLCEntity } from '../models/ohlcentity';

@Injectable()
export class DataService {

  constructor() { }

    private socket: SocketIOClient.Socket;
    private chartobserver: Observer<any>;
    private gridobserver: Observer<OHLCEntity>;
  
    private socket_connection(){
      this.socket = socketIo('http://kaboom.rksv.net/watch',
        {
          transports: ['websocket', 'polling'],
          forceNew: true
        });
        this.socket.on('connect', () => {
          this.subscribe();
        });
        this.socket.on('disconnect', () => {
          console.log("connection lost");
        });
        this.socket.on('connect_failed', () => {
          console.log("connection failed to web socket");
        });
    }
    public getOHLCData(isGrid): Observable<any> {
        this.socket_connection();
        this.socket.on('data', (data, fn) => {
          if(isGrid)
            this.gridobserver.next(data);
          else
            this.chartobserver.next(data);
          fn(1);
        });
        if(isGrid)
          return this.createGridObservable();
        else
          return this.createObservable();
    }
    
    private subscribe(){
      this.socket.emit('sub', {state:true});
    }

    public unsubscribe(){
      this.socket.emit('unsub', {state:false});
    }

    public createObservable(): Observable<any> {
        return new Observable<any>(observer => {
            this.chartobserver = observer;
        });
    }

  // observer for OHLC grid data
  public createGridObservable(): Observable<OHLCEntity> {
    return new Observable<OHLCEntity>(observer => {
        this.gridobserver = observer;
    });
  }
}
