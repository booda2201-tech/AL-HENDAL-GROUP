import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
currentLang: string = 'en'; // اللغة الافتراضية

  constructor(private translate: TranslateService) {
    // تحديد اللغة الحالية عند بداية تشغيل البرنامج
    this.currentLang = this.translate.currentLang || 'en';
  }

brandsList = [
  { id: 'alamana', name: 'Al-Amana', nameAr: 'الامانة', image: 'assets/imges/a22.png', textColor: 'text-purple-400', translateKey: 'BRANDS.alamana_DESC' },
  { id: 'bubble-hope', name: 'Bubble Hope', nameAr: 'بابل هوب', image: 'assets/imges/b10.png', textColor: 'text-orange-500', translateKey: 'BRANDS.BUBBLE_DESC' },
  { id: 't4-tea', name: 'T4 TEA', nameAr: 'تي فور تي', image: 'assets/imges/p4.jpg', textColor: 'text-white', translateKey: 'BRANDS.T4_DESC' },
  { id: 'saidy-tea', name: 'Saidy Tea', nameAr: 'شاي الصعيد', image: 'assets/imges/33.jpg', textColor: 'text-white', translateKey: 'BRANDS.SAIDY_DESC' },
  { id: 'forto', name: 'FORTO', nameAr: 'فورتو', image: 'assets/imges/2.jpg', textColor: 'text-orange-400', translateKey: 'BRANDS.FORTO_DESC' },
  { id: 'dall', name: 'DALL', nameAr: 'دال للبرمجية', image: 'assets/imges/dal-logo2.png', textColor: 'text-white', translateKey: 'BRANDS.DALL_DESC' },
];



  ngOnInit() {
this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
    AOS.init({
      duration: 1000, // مدة الحركة بالملي ثانية
      once: true,     // تجعل الحركة تحدث مرة واحدة فقط أثناء التمرير لأسفل
      offset: 100     // تبدأ الحركة قبل وصول العنصر لمنتصف الشاشة بـ 100 بكسل
    });

  }

}
