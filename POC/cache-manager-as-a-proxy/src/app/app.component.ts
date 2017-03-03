import { Component, OnInit } from '@angular/core';
import { CacheService } from './cache/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  abstract;
  title = 'app works!';

  constructor(private cacheManager: CacheService) {

  }

  ngOnInit(): void {
    window['appComp'] = this;
    this.cacheManager.updateServerMetaVersions({
      'req1' : 'v1',
      'req2' : 'v1',
      'req3' : 'v1',
      'req4' : 'v1',
      'req5' : 'v1',
      'req6' : 'v1',
      'req7' : 'v1',
      'req8' : 'v1'
    });
  }

  getAnItem (): void {
    this.logCurrentTime();
    this.cacheManager.getItem('req1').forEach(res => {
      console.log(res);
    }).then(() => {/*Ended*/});
  }

  logCurrentTime(): void {
    const x = new Date();
    console.log('Data requested @ ' + x.getMinutes() + ' : ' + x.getSeconds());
  }
}
