import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    // currentLang = 'ar';

    // constructor(private translate: TranslateService) {
    //   this.translate.use(this.currentLang);
    // }


  brandsList = [
  { id: 'bubble-hope', name: 'Bubble Hope', image: 'assets/imges/11.jpeg', textColor: 'text-orange-500', translateKey: 'BRANDS.BUBBLE_DESC' },
  { id: 't4-tea', name: 'T4 TEA', image: 'assets/imges/p4.jpg', textColor: 'text-white', translateKey: 'BRANDS.T4_DESC' },
  { id: 'saidy-tea', name: 'شاي الصعيد', image: 'assets/imges/33.jpg', textColor: 'text-white', translateKey: 'BRANDS.SAIDY_DESC' },
  { id: 'dal', name: 'دال', image: 'assets/imges/55.png', textColor: 'text-purple-400', translateKey: 'BRANDS.DAL_DESC' },
  { id: 'forto', name: 'FORTO', image: 'assets/imges/2.jpg', textColor: 'text-orange-400', translateKey: 'BRANDS.FORTO_DESC' },
  { id: 'fruity-hope', name: 'Fruity Hope', image: 'assets/imges/44.avif', textColor: 'text-pink-400', translateKey: 'BRANDS.FRUITY_DESC' }
];




  ngOnInit() {
    // this.translate.onLangChange.subscribe(event => {
    //   this.currentLang = event.lang;
    // });
    // this.currentLang = this.translate.currentLang || 'en';

    AOS.init({
      duration: 1000, // مدة الحركة بالملي ثانية
      once: true,     // تجعل الحركة تحدث مرة واحدة فقط أثناء التمرير لأسفل
      offset: 100     // تبدأ الحركة قبل وصول العنصر لمنتصف الشاشة بـ 100 بكسل
    });

  }

}
