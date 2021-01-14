import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isOpen = true;
  private mediaSubscription;

  constructor(public mediaObserver: MediaObserver) {
    this.mediaSubscription = mediaObserver.asObservable().subscribe(changes => {
      this.isOpen = (changes[0].mqAlias !== 'xs');
      console.log(changes.map(c => c.mqAlias));
    });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
  }

}
