import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector:'tj-gallery-state',
  standalone:true,
  imports:[CommonModule],
  template:`
    <section class="gallery-state" [attr.data-state]="state" role="status">
      <div class="gallery-state__visual" aria-hidden="true">{{ state==='loading'?'···':state==='error'?'!':'+' }}</div>
      <h3>{{title}}</h3><p>{{message}}</p>
      <button *ngIf="action" type="button" (click)="actionClick.emit()">{{action}}</button>
    </section>`,
  styles:[`
    .gallery-state{min-height:220px;padding:34px;display:grid;place-items:center;align-content:center;gap:7px;border:1px dashed var(--gallery-border,rgba(157,188,198,.16));border-radius:12px;background:rgba(23,39,45,.32);text-align:center}
    .gallery-state__visual{width:44px;height:44px;display:grid;place-items:center;border-radius:999px;background:rgba(57,189,209,.08);color:#39bdd1;font:800 18px Montserrat,sans-serif}.gallery-state h3{margin:4px 0 0;color:var(--gallery-text,#f4f7f8);font:700 14px Montserrat,sans-serif}.gallery-state p{max-width:380px;margin:0;color:var(--gallery-muted,#9dbcc6);font:400 11px/1.5 Inter,sans-serif}.gallery-state button{margin-top:6px;padding:8px 12px;border:1px solid rgba(57,189,209,.25);border-radius:7px;background:rgba(57,189,209,.12);color:#39bdd1;font-size:11px;cursor:pointer}
  `]
})
export class GalleryStateComponent{
  @Input() state:'empty'|'loading'|'error'='empty'; @Input() title='Sin contenido'; @Input() message=''; @Input() action='';
  @Output() actionClick=new EventEmitter<void>();
}
