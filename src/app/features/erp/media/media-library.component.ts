import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudUploadAlt, faFolder, faImage, faPlus, faSearch, faVideo } from '@fortawesome/free-solid-svg-icons';
@Component({selector:'tj-media-library',standalone:true,imports:[CommonModule,FontAwesomeModule],templateUrl:'./media-library.component.html',styleUrl:'./media-library.component.scss'})
export class MediaLibraryComponent {
  readonly icons={folder:faFolder,image:faImage,video:faVideo,upload:faCloudUploadAlt,search:faSearch,plus:faPlus};
  readonly filter=signal('todos');
  readonly files=signal([
    {name:'Boda_Martinez_Highlights.mp4',type:'video',size:'2.4 GB',status:'procesado'},
    {name:'Nike_Launch_Final.mov',type:'video',size:'4.8 GB',status:'procesando'},
    {name:'Carolina_Mateo_RAW',type:'foto',size:'24.2 GB',status:'procesado'},
    {name:'Quince_Isabella_Entrega',type:'entrega',size:'8.1 GB',status:'pendiente'},
    {name:'Maluma_BTS_Proyecto',type:'proyecto',size:'18.6 GB',status:'procesado'}
  ]);
}
