import { Component } from '@angular/core';
import { OcrService } from 'src/app/services/ocr.service';

@Component({
  selector: 'app-home-file',
  templateUrl: './home-file.component.html',
  styleUrls: ['./home-file.component.scss']
})
export class HomeFileComponent {
  listImages = [
    {
      src: '/assets/banner.jpeg'
    },
    {
      src: '/assets/eng_bw.png'
    },
    {
      src: '/assets/example-1.png'
    }
  ];

  constructor(private ocrService:OcrService){

  }

  clickImage(image:any){
    this.ocrService.showImage=true;
    this.ocrService.cbImage.emit(image);
  }
}
