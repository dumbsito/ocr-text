import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
showImage:boolean=false;
cbImage:EventEmitter<any>=new EventEmitter<any>()
cbText:EventEmitter<any>=new EventEmitter<any>()
  constructor() {

   }
}
