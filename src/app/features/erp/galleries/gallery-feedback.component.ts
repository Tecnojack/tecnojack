import { CommonModule } from '@angular/common';
import { Component, Injectable, signal } from '@angular/core';

export type GalleryFeedbackKind = 'success'|'info'|'warning'|'error';
export interface GalleryFeedbackMessage { id:number; kind:GalleryFeedbackKind; text:string; }

@Injectable({providedIn:'root'})
export class GalleryFeedbackService {
  readonly messages = signal<GalleryFeedbackMessage[]>([]);
  show(text:string, kind:GalleryFeedbackKind='success', duration=2400):void {
    const id=Date.now()+Math.floor(Math.random()*1000);
    this.messages.update(items=>[...items,{id,kind,text}]);
    window.setTimeout(()=>this.dismiss(id),duration);
  }
  dismiss(id:number):void { this.messages.update(items=>items.filter(item=>item.id!==id)); }
}

@Component({
  selector:'tj-gallery-feedback',
  standalone:true,
  imports:[CommonModule],
  template:`
    <div class="gallery-feedback-stack" aria-live="polite" aria-atomic="true">
      <button *ngFor="let item of feedback.messages()" type="button"
        class="gallery-feedback" [attr.data-kind]="item.kind"
        (click)="feedback.dismiss(item.id)">
        <span class="gallery-feedback__dot"></span><span>{{item.text}}</span><b>×</b>
      </button>
    </div>`,
  styles:[`
    .gallery-feedback-stack{position:fixed;top:72px;right:20px;z-index:7000;display:grid;gap:8px;width:min(360px,calc(100vw - 32px))}
    .gallery-feedback{width:100%;padding:11px 12px;display:grid;grid-template-columns:8px 1fr auto;align-items:center;gap:9px;border:1px solid var(--gallery-border,rgba(157,188,198,.16));border-radius:8px;background:#091b21;color:#f4f7f8;box-shadow:0 14px 34px rgba(0,0,0,.34);font:500 11px/1.35 Inter,sans-serif;text-align:left;cursor:pointer}
    .gallery-feedback__dot{width:7px;height:7px;border-radius:999px;background:#39bdd1}.gallery-feedback[data-kind=success] .gallery-feedback__dot{background:#55d98b}.gallery-feedback[data-kind=warning] .gallery-feedback__dot{background:#f2b84b}.gallery-feedback[data-kind=error] .gallery-feedback__dot{background:#f46f64}
    .gallery-feedback b{font-size:14px;color:#9dbcc6;font-weight:400}
  `]
})
export class GalleryFeedbackComponent { constructor(readonly feedback:GalleryFeedbackService){} }
