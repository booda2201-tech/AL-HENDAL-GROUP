import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss']
})
export class BrandDetailComponent implements OnInit {
  brand: any;
  currentHeroIndex = 0;
  intervalId: any;

  brandsData: any = {
    'alamana': {
      name: 'BRAND_DETAILS.alamana.NAME',
      id: 'alamana',
      tagline: 'BRAND_DETAILS.alamana.TAGLINE',
      fullDescription: 'BRAND_DETAILS.alamana.DESC',
      mission: 'BRAND_DETAILS.alamana.MISSION',
      vision: 'BRAND_DETAILS.alamana.VISION',
      heroImages: [
        '../../../assets/imges/al-1.png',
        '../../../assets/imges/al-2.png',
        '../../../assets/imges/al-3.png',
        '../../../assets/imges/al-4.png',
        '../../../assets/imges/al-8.jpg',
      ],
      features: [
        { title: 'FEATURES.RANGE', value: 'FEATURES.VALUES.COMPREHENSIVE' },
        { title: 'FEATURES.QUALITY', value: 'FEATURES.VALUES.BUILDING_EXCELLENCE' },
        { title: 'FEATURES.PREMIUM', value: 'FEATURES.VALUES.GOLD_STANDARD' },
        { title: 'FEATURES.GLOBAL', value: 'FEATURES.VALUES.PREMIUM_SOLUTIONS' }
      ],
      socialLinks: {
        facebook: 'https://www.facebook.com/share/1NEJBjjVnP/',
        instagram: 'https://www.instagram.com/alamana.building.materials?igsh=MzQ0ODg5ODg3Nw==',
        whatsapp: 'https://wa.me/yournumber',
        tiktok: 'https://www.tiktok.com/@bubblehope.eg?_r=1&_t=ZS-94jUtf7alIC'
      },
      gallery: [
        '../../../assets/imges/al-5.png',
        '../../../assets/imges/al-6.png',
        '../../../assets/imges/al-7.png'
      ],

    },
    'bubble-hope': {
      name: 'BRAND_DETAILS.BUBBLE_HOPE.NAME',
      id: 'BUBBLE_HOPE',
      heroImages: [
        '../../../assets/imges/b4.jpg',
        '../../../assets/imges/02.jpg',
        '../../../assets/imges/b6.jpg'
      ],
      tagline: 'BRAND_DETAILS.BUBBLE_HOPE.TAGLINE',
      fullDescription: 'BRAND_DETAILS.BUBBLE_HOPE.DESC',
      features: [
        { title: 'FEATURES.NATURE', value: 'FEATURES.VALUES.PREMIUM_INGREDIENTS' },
        { title: 'FEATURES.VIBE', value: 'FEATURES.VALUES.MODERN_REFRESH' }
      ],
      socialLinks: {
        facebook: 'https://www.facebook.com/share/1NEJBjjVnP/',
        instagram: 'https://www.instagram.com/bubblehope.eg?igsh=MWE1eWdtb3N0NzNndA==',
        whatsapp: 'https://wa.me/yournumber',
        tiktok: 'https://www.tiktok.com/@bubblehope.eg?_r=1&_t=ZS-94jUtf7alIC'
      },
      website: 'https://www.bubblehope.com/home',
      gallery: [
        'assets/imges/b6.jpg',
        '../../../assets/imges/02.jpg',
        '../../../assets/imges/b3.jpg'
      ]
    },
    'forto': {
      name: 'BRAND_DETAILS.FORTO.NAME',
      id: 'FORTO',
      heroImages: [
        'assets/imges/1.jpg',
        'assets/imges/2.jpg',
        'assets/imges/3.jpg',
        'assets/imges/4.jpg'
      ],
      tagline: 'BRAND_DETAILS.FORTO.TAGLINE',
      fullDescription: 'BRAND_DETAILS.FORTO.DESC',
      features: [
        { title: 'FEATURES.ENERGY', value: 'FEATURES.VALUES.POWER_BOOST' },
        { title: 'FEATURES.QUALITY', value: 'FEATURES.VALUES.GOLD_STANDARD' }
      ],
      socialLinks: {
        facebook: 'https://www.facebook.com/share/14aFPLyoorz/',
        instagram: 'https://www.instagram.com/forto.car.care?igsh=ZHhxMWN6aHhuNGk0',
        whatsapp: 'https://wa.me/yournumber',
        tiktok: 'https://tiktok.com/@yourpage'
      },
      gallery: [
        'assets/imges/2.jpg',
        'assets/imges/1.jpg',
        'assets/imges/f4.png',

      ]
    },
    't4-tea': {
      name: 'BRAND_DETAILS.T4_TEA.NAME',
      id: 'T4_TEA',
      heroImages: [
          '../../../assets/imges/p4.jpg',
          'assets/imges/about.jpg',
          'assets/imges/login.jpg'
      ] ,
      tagline: 'BRAND_DETAILS.T4_TEA.TAGLINE',
      fullDescription: 'BRAND_DETAILS.T4_TEA.DESC',
      features: [
        { title: 'FEATURES.BREW', value: 'FEATURES.VALUES.TRADITIONAL_METHOD' },
        { title: 'FEATURES.ORIGIN', value: 'FEATURES.VALUES.HAND_PICKED' }
      ],
      socialLinks: {
        facebook: 'https://facebook.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        whatsapp: 'https://wa.me/yournumber',
        tiktok: 'https://tiktok.com/@yourpage'
      },
          website: 'https://darkslateblue-dove-147065.hostingersite.com/home',
      gallery: ['assets/imges/p4.jpg','assets/imges/about.jpg']
    },
    'saidy-tea': {
      name: 'BRAND_DETAILS.SAIDY.NAME',
      id: 'SAIDY',
      heroImages: [
        'assets/imges/33.jpg',
      ],
      tagline: 'BRAND_DETAILS.SAIDY.TAGLINE',
      fullDescription: 'BRAND_DETAILS.SAIDY.DESC',
      features: [
        { title: 'FEATURES.AUTHENTICITY', value: 'FEATURES.VALUES.EGYPTIAN_HERITAGE' },
        { title: 'FEATURES.TASTE', value: 'FEATURES.VALUES.STRONG_BOLD' }
      ],
      socialLinks: {
        facebook: 'https://facebook.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        whatsapp: 'https://wa.me/yournumber',
        tiktok: 'https://tiktok.com/@yourpage'
      },
      gallery: [
        'assets/imges/p4.jpg',
        'assets/imges/33.jpg'
      ]
    },
    'dall': {
      name: 'BRAND_DETAILS.DALL.NAME',
      id: 'dall',
      heroImages: [
          '../../../assets/imges/d-1.png',
          'assets/imges/d-2.png',
      ] ,
      tagline: 'BRAND_DETAILS.DALL.TAGLINE',
      fullDescription: 'BRAND_DETAILS.DALL.DESC',
      features: [
        { title: 'FEATURES.STANDARDS', value: 'FEATURES.VALUES.INT_QUALITY' },
        { title: 'FEATURES.VISION', value: 'FEATURES.VALUES.PREMIUM_SOLUTIONS1' }
      ],
      socialLinks: {
        facebook: 'https://facebook.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        whatsapp: 'https://wa.me/yournumber',
        tiktok: 'https://tiktok.com/@yourpage'
      },
      website: 'https://dal-solution.com/', // الرابط الجديد اللي ضفته
      gallery: [
        'assets/imges/55.png',
        'assets/imges/d-1.png',
        'assets/imges/d-2.png'
      ]
    }
  };


  constructor(
    private route: ActivatedRoute,
    private location: Location

  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.brand = this.brandsData[id || 'bubble-hope'];

    if (this.brand && this.brand.heroImages && this.brand.heroImages.length > 1) {
      this.intervalId = setInterval(() => {
        this.currentHeroIndex = (this.currentHeroIndex + 1) % this.brand.heroImages.length;
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
