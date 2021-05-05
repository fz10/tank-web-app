import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { TankComponent } from 'smart-webcomponents-angular/tank';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  @ViewChild('tank', { read: TankComponent, static: false }) tank: TankComponent | undefined;

  title = 'Tank App';

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.init();
  }

  init(): void {
  }	

}
