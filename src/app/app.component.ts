import { AuthService } from './core/services/auth.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.me()
  }
}
