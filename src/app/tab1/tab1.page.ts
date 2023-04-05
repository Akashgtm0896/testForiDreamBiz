// import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Component, HostListener } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  constructor() {}

  destroy = new Subject();
  timer: number;

  rxjsTimer = timer(1000, 1000);

  @HostListener('click') myClick() {
    alert('clicked');
    this.fabb();
  }

  fabb() {
    this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe((val) => {
      this.timer = val;

      if (this.timer === 4) {
        console.log('6 Sec Completed');
        console.log(' U r still Logged in!!');
      }
      if (this.timer >= 8) {
        console.log('30 Sec Completed Now');
        console.log('Your logged out');
        this.destroy.next();
        // this.destroy.complete();
      }
    });
  }

  ngOnInit() {
    this.fabb();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }



}
