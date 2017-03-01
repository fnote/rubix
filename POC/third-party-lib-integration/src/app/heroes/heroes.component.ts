import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit  {
  abstract;
  selectedHero: Hero;
  tHero: Hero;
  heroes: Observable<Hero[]>;
  private selectedId: number;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.heroes = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.heroService.getHeroesOld();
      });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  isSelected(hero: Hero) {
    return hero.id === this.selectedId;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
  }
}
