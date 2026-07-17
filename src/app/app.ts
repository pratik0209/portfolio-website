import {
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {

  // ======================================================
  // Platform (SSR Safe)
  // ======================================================

  private platformId = inject(PLATFORM_ID);

  // ======================================================
  // Hero Typing Animation
  // ======================================================

  typedText = '';

  private fullText =
    'Java Full Stack Developer | Angular | Spring Boot | MySQL';

  private typingIndex = 0;

  // ======================================================
  // Navbar
  // ======================================================

  scrolled = false;

  activeSection = 'home';

  // ======================================================
  // Contact Form
  // ======================================================

  contactName = '';

  contactEmail = '';

  contactMessage = '';

  submitting = false;

  submitStatus = '';

  // ======================================================
  // Constructor
  // ======================================================

  constructor(
    private http: HttpClient
  ) {}

  // ======================================================
  // On Init
  // ======================================================

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.startTyping();

    }

  }

  // ======================================================
  // After View Init
  // ======================================================

  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      setTimeout(() => {

        this.observeSections();

      }, 100);

    }

  }
    // ======================================================
  // Typing Animation
  // ======================================================

  startTyping(): void {

    if (this.typingIndex < this.fullText.length) {

      this.typedText += this.fullText.charAt(this.typingIndex);

      this.typingIndex++;

      setTimeout(() => {

        this.startTyping();

      }, 70);

    }

  }

  // ======================================================
  // Smooth Scroll
  // ======================================================

  scrollTo(section: string): void {

    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(section);

    if (element) {

      element.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

    }

  }

  // ======================================================
  // Navbar Scroll Effect
  // ======================================================

  @HostListener('window:scroll')

  onWindowScroll(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    this.scrolled = window.scrollY > 40;

    this.updateActiveSection();

  }

  // ======================================================
  // Active Navbar Section
  // ======================================================

  updateActiveSection(): void {

    const sections = [

      'home',

      'about',

      'skills',

      'education',

      'experience',

      'projects',

      'certifications',

      'contact'

    ];

    for (const id of sections) {

      const element = document.getElementById(id);

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (

        rect.top <= 120 &&

        rect.bottom >= 120

      ) {

        this.activeSection = id;

      }

    }

  }

  // ======================================================
  // Reveal Animation (SSR Safe)
  // ======================================================

  observeSections(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add('active');

          }

        });

      },

      {

        threshold: 0.15

      }

    );

    document

      .querySelectorAll('.reveal')

      .forEach(section => {

        observer.observe(section);

      });

  }
    // ======================================================
  // Contact Form Submit
  // ======================================================

  submitContact(): void {

    this.submitting = true;

    this.submitStatus = '';

    // ------------------------------------------------------
    // If backend is not running, show success locally.
    // Replace this with your Spring Boot API later.
    // ------------------------------------------------------

    setTimeout(() => {

      this.submitStatus = '✅ Message sent successfully!';

      this.contactName = '';

      this.contactEmail = '';

      this.contactMessage = '';

      this.submitting = false;

    }, 1500);



    /*
    // Uncomment this when your Spring Boot backend is ready.

    this.http.post('http://localhost:9090/api/contact',{

      name:this.contactName,

      email:this.contactEmail,

      message:this.contactMessage

    }).subscribe({

      next:()=>{

        this.submitStatus='✅ Message sent successfully!';

        this.contactName='';

        this.contactEmail='';

        this.contactMessage='';

        this.submitting=false;

      },

      error:()=>{

        this.submitStatus='❌ Unable to send message.';

        this.submitting=false;

      }

    });

    */

  }

}