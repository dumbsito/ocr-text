import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeFileComponent } from './components/home-file/home-file.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OutPutTextComponent } from './components/out-put-text/out-put-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeFileComponent,
    SidebarComponent,
    OutPutTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
