import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from './calculatrice/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './calculatrice/panel/panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    CalculatriceComponent,
    ButtonComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
