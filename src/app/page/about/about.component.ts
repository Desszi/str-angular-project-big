import { Component, OnInit } from '@angular/core';
import { AboutCard } from 'app/model/about-card';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  cards: AboutCard[] = [
    { id: 1, fullName: 'KIRÁLY ÁRPÁD', image: '../assets/img/faces/ka.jpg', html: 70, css_scss: 55, javascript: 52, angular: 52, git: 'https://github.com/arpad58/' },
    { id: 2, fullName: 'MARGIT RÓBERT', image: '../assets/img/faces/marrob.jpg', html: 80, css_scss: 75, javascript: 65, angular: 50, git: 'https://github.com/marrob/' },
    { id: 3, fullName: 'ORMOS ATTILA', image: '../assets/img/faces/Attila.jpg', html: 85, css_scss: 65, javascript: 45, angular: 50, git: 'https://github.com/ormiati/' },
    { id: 4, fullName: 'PORKOLÁB MERCÉDESZ', image: '../assets/img/faces/desszi.jpg', html: 95, css_scss: 88, javascript: 93, angular: 67, git: 'https://github.com/Desszi/' },
    { id: 5, fullName: 'SZŰCS TAMÁS', image: '../assets/img/faces/SzT.jpg', html: 85, css_scss: 75, javascript: 65, angular: 50, git: 'https://github.com/Oborsil/' },
    { id: 6, fullName: 'TAKÁCS BÁLINT', image: '../assets/img/faces/balint.jpg', html: 87, css_scss: 77, javascript: 67, angular: 57, git: 'https://github.com/takib77/' },
    { id: 7, fullName: 'VILLÁNYI ÁGNES', image: '', html: 85, css_scss: 75, javascript: 99, angular: 50, git: 'https://github.com/Afonya74' },
    { id: 8, fullName: 'GONDA VALÉR', image: '', html: 97, css_scss: 75, javascript: 25, angular: 50, git: '' }
  ]

  constructor() { }

  ngOnInit(): void {
    this.cards.forEach(item => {
      if (item.fullName == 'MARGIT RÓBERT') {
        item.css_scss = Math.floor(Math.random() * 100 + 25);
        item.angular = Math.floor(Math.random() * 100 + 25);
        item.javascript = Math.floor(Math.random() * 100 + 25);
      }
    })
  }
}
