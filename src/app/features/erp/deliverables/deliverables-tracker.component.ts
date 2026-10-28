import { CommonModule } from '@angular/common';import { Component,signal } from '@angular/core';import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';import { faBoxOpen,faCheckCircle,faClock,faFilm,faImages,faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({selector:'tj-deliverables-tracker',standalone:true,imports:[CommonModule,FontAwesomeModule],templateUrl:'./deliverables-tracker.component.html',styleUrl:'./deliverables-tracker.component.scss'})
export class DeliverablesTrackerComponent{readonly icons={box:faBoxOpen,check:faCheckCircle,clock:faClock,film:faFilm,images:faImages,plus:faPlus};readonly deliverables=signal([
{name:'250 fotos editadas JPEG',client:'Laura M.',type:'Fotos',owner:'Camila H.',dueDate:'2026-09-07',status:'En progreso'},
{name:'Video boda 4-8 min 4K',client:'Laura M.',type:'Video',owner:'Sebastián R.',dueDate:'2026-09-14',status:'Pendiente'},
{name:'Pack completo Nike — 1247 fotos',client:'Nike S.A.',type:'Fotos',owner:'Camila H.',dueDate:'2026-09-05',status:'Entregado'},
{name:'Video 4K Nike Launch',client:'Nike S.A.',type:'Video',owner:'Andrés M.',dueDate:'2026-09-10',status:'Entregado'},
{name:'Álbum digital Quinceañera',client:'Familia Cano',type:'Álbum',owner:'Daniela R.',dueDate:'2026-09-28',status:'Pendiente'}]);}
