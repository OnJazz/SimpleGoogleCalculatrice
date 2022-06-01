import { Component } from '@angular/core';
import { CalculRequestService } from './services/calcul-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SimpleGoogleCalculatriceFront';
  constructor(private calculService: CalculRequestService) { }

  sendRequest = () => {
    this.calculService.getResultFromCalcul("2+2").subscribe(res => {
      console.log(res);
    });
  }
}
