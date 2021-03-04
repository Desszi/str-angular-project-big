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
    { id: 2, fullName: 'MARGIT RÓBERT', image: '', html: 80, css_scss: 75, javascript: 65, angular: 50, git: '' },
    { id: 3, fullName: 'ORMOS ATTILA', image: '', html: 85, css_scss: 43, javascript: 65, angular: 50, git: '' },
    { id: 4, fullName: 'PORKOLÁB MERCÉDESZ', image: '', html: 85, css_scss: 81, javascript: 65, angular: 50, git: '' },
    { id: 5, fullName: 'SZŰCS TAMÁS', image: '../assets/img/faces/SzT.jpg', html: 85, css_scss: 75, javascript: 65, angular: 50, git: 'https://github.com/Oborsil/' },
    { id: 6, fullName: 'TAKÁCS BÁLINT', image: '', html: 66, css_scss: 75, javascript: 65, angular: 50, git: '' },
    { id: 7, fullName: 'VILLÁNYI ÁGNES', image: '../assets/img/faces/Agi.jpg', html: 85, css_scss: 80, javascript: 60, angular: 50, git: '' },
    { id: 8, fullName: 'GONDA VALÉR', image: '../assets/img/faces/GV.jpg', html: 70, css_scss: 40, javascript: 85, angular: 90, git: '' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
