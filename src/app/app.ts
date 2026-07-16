import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  typedText = '';
  activeSection = 'home';
  private fullText = 'cat about.txt';
  private i = 0;

  ngOnInit() {
    this.typeChar();
  }

  typeChar() {
    if (this.i <= this.fullText.length) {
      this.typedText = this.fullText.slice(0, this.i);
      this.i++;
      setTimeout(() => this.typeChar(), 90);
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.activeSection = id;
  }

  @HostListener('window:scroll')
  onScroll() {
   const sections = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = id;
        }
      }
    }
  }
}