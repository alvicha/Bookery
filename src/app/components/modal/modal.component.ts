import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookInfo } from '../../models/books.interface';

@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() book!: BookInfo; // el "!" evita error de null
  @Input() modal: string = 'modal';
  @Input() response: string | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
