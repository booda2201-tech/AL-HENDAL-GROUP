import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  currentLang = 'en';
  mediaReleases = [
    {
      date: 'APR 2026',
      title: 'Al Hendal Group Expands Its Regional Operations',
      desc: 'New strategic partnerships and branch expansions strengthen the group\'s presence across Egypt and international markets.',
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1974'
    },
    {
      date: 'MAR 2026',
      title: 'Bubble Hope Launches New Experience-Based Branch Concept',
      desc: 'The new concept combines modern cafe culture, entertainment, and premium beverage experiences for Gen Z audiences.',
      image: '../../../assets/imges/11.jpeg'
    },
    {
      date: 'FEB 2026',
      title: 'ALAMANA Introduces Advanced Waterproofing Solutions',
      desc: 'The company launches a new range of construction chemicals and waterproofing systems designed for large-scale projects.',
      image: '../../../assets/imges/al-3.png'
    },
    {
      date: 'JAN 2026',
      title: 'Forto Car Care Continues Expansion Across New Locations',
      desc: 'Forto announces the opening of new detailing and automotive care centers with upgraded customer experiences.',
      image: '../../../assets/imges/1.jpg'
    },
    {
      date: 'DEC 2025',
      title: 'Al Hendal Group Signs New International Trading Agreements',
      desc: 'The group strengthens its global supply network through partnerships with regional and international manufacturers.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071'
    },
    {
      date: 'NOV 2025',
      title: 'T4 Tea Expands Premium Tea Product Line',
      desc: 'New specialty tea collections inspired by global tea culture are introduced to the Egyptian market.',
      image: '../../../assets/imges/about.jpg'
    },
    {
      date: 'OCT 2025',
      title: 'Al Hendal Group Reaches New Growth Milestone',
      desc: 'The group achieves significant growth across its diversified sectors including retail, hospitality, and construction materials.',
      image: 'https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=1974'
    },
    {
      date: 'SEP 2025',
      title: 'Bubble Hope Announces New Seasonal Beverage Collection',
      desc: 'Limited-edition drinks and creative flavor concepts are introduced as part of the brand\'s innovation strategy.',
      image: '../../../assets/imges/02.jpg'
    },
    {
      date: 'AUG 2025',
      title: 'ALAMANA Supports Major Construction Projects',
      desc: 'ALAMANA products continue to be utilized in residential, commercial, and hospitality developments across the region.',
      image: '../../../assets/imges/al-2.png'
    },
    {
      date: 'JUL 2025',
      title: 'Al Hendal Group Accelerates Digital Transformation',
      desc: 'The company invests in modern digital solutions and technology systems to improve operational efficiency across all brands.',
      image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1974'
    }
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }
}
