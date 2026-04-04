import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { LanguageService } from './Service/language.service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(private langService: LanguageService) {}

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
}
