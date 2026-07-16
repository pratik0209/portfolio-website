import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
export class App implements OnInit {

  // =========================
  // Hero Typing Effect
  // =========================

  typedText = '';

  private fullText =
    'Java Full Stack Developer | Angular | Spring Boot | MySQL';

  private index = 0;

  // =========================
  // Navbar
  // =========================

  scrolled = false;

  activeSection = 'home';

  // =========================
  // GitHub Stats
  // =========================

  hideStats = false;

  // =========================
  // Contact Form
  // =========================

  contactName = '';

  contactEmail = '';

  contactMessage = '';

  submitting = false;

  submitStatus = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.typeEffect();
  }

  // =========================
  // Typing Animation
  // =========================

  typeEffect() {

    if (this.index <= this.fullText.length) {

      this.typedText = this.fullText.substring(
        0,
        this.index
      );

      this.index++;

      setTimeout(() => {

        this.typeEffect();

      }, 70);

    }

  }

  // =========================
  // Smooth Scroll
  // =========================

  scrollTo(section: string): void {

    document.getElementById(section)?.scrollIntoView({

      behavior: 'smooth'

    });

  }

  // =========================
  // Navbar Active Link
  // =========================

  @HostListener('window:scroll')

  onScroll(): void {

    this.scrolled = window.scrollY > 30;

    const sections = [

      'home',

      'about',

      'skills',

      'experience',

      'coding',

      'work',

      'education',

      'achievements',

      'contact'

    ];

    for (const id of sections) {

      const element = document.getElementById(id);

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (rect.top <= 150 && rect.bottom >= 150) {

        this.activeSection = id;

      }

    }

  }

  // =========================
  // Contact Form Submit
  // =========================

 submitContact() {
  this.submitting = true;
  this.submitStatus = '';

  this.http.post('http://localhost:9090/api/contact', {
    name: this.contactName,
    email: this.contactEmail,
    message: this.contactMessage
  }).subscribe({
    next: () => {
      this.submitStatus = 'Message sent successfully!';
      this.contactName = '';
      this.contactEmail = '';
      this.contactMessage = '';
      this.submitting = false;
    },
    error: (err) => {
      console.error(err);
      this.submitStatus = 'Something went wrong!';
      this.submitting = false;
    }
  });
 }}