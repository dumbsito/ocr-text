import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OcrService } from 'src/app/services/ocr.service';
import { recognize } from 'tesseract.js';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy{
  @ViewChild("inputImg")inputImg!:ElementRef;
  @ViewChild("outputImg")outputImg!:ElementRef;
  listSubscribers:any=[];
  openSideBar:boolean=false;
  image:any
  worker:any
  loading:any;
  context!:CanvasRenderingContext2D;

  loadingPercentage:number=0;
  constructor(public ocrService:OcrService){

  }

  leer(){
    console.log();
    
  }
  ngOnInit(): void {
    this.listObserver();
      }
  listObserver=()=>{
       const observer1=this.ocrService.cbImage.subscribe(img=>{
      this.image=img.src;
        this.openSideBar=true
       })  
       this.listSubscribers.push(observer1)
  }
  ngOnDestroy(): void {
   this.listSubscribers.forEach((a:any)=>a.unsubscribe())
  }

  toggleMenu(){
    this.ocrService.showImage=false;
    this.openSideBar=!this.openSideBar;
  }



loadingProgress(logger:any){
console.log(logger);
this.loadingPercentage=logger.progress;

}
initSetup(){
  const canvasElement=this.outputImg.nativeElement;
  const imageElement=this.inputImg.nativeElement;
  const {naturalWidth,naturalHeight}=imageElement;
  console.log(naturalWidth,naturalHeight);
  this.context=canvasElement.getContext("2d");
  this.context.lineWidth=5;
  this.context.lineCap="square";
  this.context.strokeStyle="green";
  canvasElement.width=naturalWidth;
  canvasElement.height=naturalHeight;
  this.initAi();
}

   draw(data:any){
   data.words.forEach((w:any)=>{
    const bounding=w.bbox;
    console.log(bounding);
    this.context.strokeStyle="red";
    this.context.strokeRect(bounding.x0, bounding.y0, bounding.x1 - bounding.x0, bounding.y1 - bounding.y0);
    this.context.beginPath();
    // this.cx.moveTo(w.baseline.x0, w.baseline.y0);
    // this.cx.lineTo(w.baseline.x1, w.baseline.y1);
    this.context.stroke();
   })
}
 async initAi(){
    this.loading=true;
    const imgElement=this.inputImg.nativeElement;
    const {data}=await recognize(imgElement,"spa",{
      logger:m=>this.loadingProgress(m)
    })
    this.draw(data);
    console.log("finalizo", data);
    this.ocrService.cbText.emit(data)
    this.loadingPercentage=0;
  }

  loadedImage(){
   this.initSetup()
    console.log("imagen cargada");
    
  }
}
