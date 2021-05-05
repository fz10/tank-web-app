import { Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { TankComponent } from 'smart-webcomponents-angular/tank';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  @ViewChild('tank', { read: TankComponent, static: false }) tank: TankComponent | undefined;

  title = 'Tank App';

  editing = false;

  maximum = 100;
  minimum = 0;
  highLevel = 90;
  lowLevel = 10;
  level = 40;
  setValue = this.level;
  max = this.maximum;
  min = this.minimum;
  high = this.highLevel;
  low = this.lowLevel;

  classColor = 'tank-blue';

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.init();
  }

  init(): void {
  }

  onIncrement() {
    if (this.level < this.maximum) {
      this.level += 1;
      this.setValue = this.level;
      this.checkColor();
    }
  }

  onDecrement() {
    if (this.level > this.minimum) {
      this.level -= 1;
      this.setValue = this.level;
      this.checkColor();
    }
  }

  onSetValue() {
    let newLevel = this.setValue;
    if (newLevel <= this.maximum && newLevel >= this.minimum) {
      if (newLevel < this.level) {
        while (this.level > newLevel) {
          setTimeout(() => { }, 5000);
          this.level -= 1;
          this.checkColor();
        }
      }
      else if (newLevel > this.level) {
        while (this.level < newLevel) {
          setTimeout(() => { }, 5000);
          this.level += 1;
          this.checkColor();
        }
      }
    }
  }

  onEdit() {
    this.editing = true;
  }

  onCancel() {
    this.editing = false;
    this.max = this.maximum;
    this.min = this.minimum;
    this.high = this.highLevel;
    this.low = this.lowLevel;
  }

  onConfirm() {
    if (this.max > this.min && this.high > this.low) {
      if (this.min >= 0 && this.high <= this.max && this.low >= this.min) {
        this.maximum = this.max;
        this.minimum = this.min;
        this.highLevel = this.high;
        this.lowLevel = this.low;
        this.editing = false;
        this.level = this.minimum;
        this.setValue = this.minimum;
        this.checkColor();
      }
    }
  }

  onDrain() {
    Swal.fire({
      title: 'Do you want to drain the Tank?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Drain!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.level = 0;
        this.setValue = 0;
      }
    });
  }

  checkColor() {
    if (this.level >= this.highLevel) { this.classColor = 'tank-red'; }
    else if (this.level <= this.lowLevel) { this.classColor = 'tank-yellow'; }
    else { this.classColor = 'tank-blue'; }
    
  }

}
