import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faCamera, faCheckCircle, faExclamationTriangle, faPlus, faTools, faVideo } from '@fortawesome/free-solid-svg-icons';
@Component({selector:'tj-equipment-inventory',standalone:true,imports:[CommonModule,FontAwesomeModule],templateUrl:'./equipment-inventory.component.html',styleUrl:'./equipment-inventory.component.scss'})
export class EquipmentInventoryComponent {
  readonly icons={camera:faCamera,video:faVideo,box:faBox,check:faCheckCircle,warning:faExclamationTriangle,tools:faTools,plus:faPlus};
  readonly gearList=signal([
    {name:'Sony A7 IV',category:'Cámara',serial:'SN-A74-001234',status:'available',assignedTo:'—',value:12000000},
    {name:'Canon EOS R5',category:'Cámara',serial:'SN-R5-005678',status:'in_use',assignedTo:'Juan Pablo V.',value:14500000},
    {name:'DJI Mavic 3 Pro',category:'Drone',serial:'SN-M3P-009012',status:'in_use',assignedTo:'Ricardo G.',value:9800000},
    {name:'Godox AD600 Pro',category:'Flash',serial:'SN-AD600-3456',status:'available',assignedTo:'—',value:3200000},
    {name:'Sony 24-70mm f/2.8 GM',category:'Lente',serial:'SN-2470-7890',status:'in_use',assignedTo:'Camila H.',value:7500000},
    {name:'Steadicam Merlin',category:'Estabilizador',serial:'SN-MRL-2345',status:'maintenance',assignedTo:'—',value:2800000}
  ]);
}
