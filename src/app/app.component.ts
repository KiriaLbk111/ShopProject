import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shop-app';
  private rainInterval: any;

  ngOnInit(): void {
    this.startRain();
  }

  private startRain(): void {
    const container = document.querySelector('.rain-container');
    if (!container) return;

    this.rainInterval = setInterval(() => {
      const drop = document.createElement('div');
      drop.classList.add('raindrop');

      const left = Math.random() * 100;
      drop.style.left = `${left}vw`;
      
      const duration = 5 + Math.random() * 10;
      drop.style.animationDuration = `${duration}s`;

      container.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, duration * 1000);
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
    }
  }
}
