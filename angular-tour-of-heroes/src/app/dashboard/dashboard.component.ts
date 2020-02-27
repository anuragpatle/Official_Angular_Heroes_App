import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  heroes: Hero[] = [];

  private firstObsSubscription: Subscription;

  constructor(private heroService: HeroService) { }

  timeOfDashboardComponentInit: number;

  ngOnInit() {
    this.getHeroes();

    const customIntervalObserver = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObserver.subscribe(data => {
      this.timeOfDashboardComponentInit = data as number;
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
