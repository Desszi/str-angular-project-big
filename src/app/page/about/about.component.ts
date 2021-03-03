import { Component, OnInit } from '@angular/core';
import { AboutCard } from 'app/model/about-card';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  cards: AboutCard[] = [
    { id: 1, fullName: 'KIRÁLY ÁRPÁD', image: '', html: 85, css_scss: 75, javascript: 65, angular: 100, git: '' },
    { id: 2, fullName: 'MARGIT RÓBERT', image: '../assets/img/faces/marrob.jpg', html: 80, css_scss: 75, javascript: 65, angular: 50, git: 'https://github.com/marrob/' },
    { id: 3, fullName: 'ORMOS ATTILA', image: '', html: 85, css_scss: 43, javascript: 65, angular: 50, git: '' },
    { id: 4, fullName: 'PORKOLÁB MERCÉDESZ', image: '', html: 85, css_scss: 81, javascript: 65, angular: 50, git: '' },
    { id: 5, fullName: 'SZŰCS TAMÁS', image: '../assets/img/faces/SzT.jpg', html: 85, css_scss: 75, javascript: 65, angular: 50, git: 'https://github.com/Oborsil/' },
    { id: 6, fullName: 'TAKÁCS BÁLINT', image: '', html: 66, css_scss: 75, javascript: 65, angular: 50, git: '' },
    { id: 7, fullName: 'VILLÁNYI ÁGNES', image: '', html: 85, css_scss: 75, javascript: 99, angular: 50, git: '' },
    { id: 8, fullName: 'GONDA VALÉR', image: '', html: 97, css_scss: 75, javascript: 25, angular: 50, git: '' }
  ]

  constructor() { }

  ngOnInit(): void {
    this.cards.forEach(item=>{
      if(item.fullName=='MARGIT RÓBERT'){
        item.css_scss = Math.floor(Math.random() * 100); 
        item.angular = Math.floor(Math.random() * 100); 
        item.javascript = Math.floor(Math.random() * 100); 
      }
    })
  }
}
