import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subscription, Operator } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
      }, 500);
    });


    // let modifedOperator: Observable<number>
    const modifedObservable = customIntervalObserver.pipe(filter((data: number) =>{
      return data > 0;
    }), map((data: number) => {

      // If counter is running in 500 ms then to get the output
      // in seconds properly we have to divide the data by 2.
      // Half a counting per increment [per increment means every 500 ms second our count values becomes .5 second]
      return data / 2;
    }));

    this.firstObsSubscription = modifedObservable.subscribe(data => {
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
