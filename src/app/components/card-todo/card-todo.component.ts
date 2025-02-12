import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-todo',
  standalone: false,
  templateUrl: './card-todo.component.html',
  styleUrl: './card-todo.component.css'
})
export class CardTodoComponent {
  @Input() subject: string = 'Physics';
  @Input() chapter: string = 'Chapter 3: Force';
  @Input() time: string = '09:30';
  @Input() teacher: string = 'Alex Bruno';
  @Input() platform: string = 'Google Meet';
}
