function GalleryBuilder({galleryId,onBack,onClientView}:{galleryId:string;onBack:()=>void;onClientView:()=>void}) {
  const gallery=GALLERIES_DATA.find(g=>g.id===galleryId)??GALLERIES_DATA[0];
  const [activeCol,setActiveCol]=useState<string|null>(null);
  const [collections,setCollections]=useState(gallery.collections);
  const [status,setStatus]=useState<GalleryStatus>(gallery.estado);
  const [photos,setPhotos]=useState<GPhoto[]>(GALLERY_PHOTOS);
  const [selected,setSelected]=useState<string[]>([]);
  const [showUpload,setShowUpload]=useState(false);
  const [showPublish,setShowPublish]=useState(false);
  const [published,setPublished]=useState(false);
  const [newColName,setNewColName]=useState('');
  const [inspTab,setInspTab]=useState<'general'|'access'|'delivery'>('general');
  const [showSelReview,setShowSelReview]=useState(false);

  const displayPhotos=activeCol?photos.filter(p=>p.col===activeCol):photos;
  const activeColData=collections.find(c=>c.id===activeCol)??null;
  const clientSubmitted=gallery.estado==='Selection Submitted';

  const toggleSel=(id:string)=>setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const addCollection=()=>{if(!newColName.trim())return;setCollections(p=>[...p,{id:`NC-${Date.now()}`,nombre:newColName.trim(),count:0,cover:'',visible:true,tagline:''}]);setNewColName('');};
  const deleteCol=(id:string)=>setCollections(p=>p.filter(c=>c.id!==id));

  const doPublish=()=>{setStatus('Published');setPublished(true);setShowPublish(false);toast.success('¡Galería publicada!');};

  return (
    <div style={{height:'calc(100vh - 60px)',display:'flex',flexDirection:'column',background:T.bg}}>
      {/* TOP TOOLBAR */}
      <div style={{background:T.card,borderBottom:`1px solid ${T.border}`,padding:'9px 18px',display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',color:T.muted,display:'flex',alignItems:'center',gap:4,fontSize:12}}><ArrowLeft size={13}/>Galerías</button>
        <span style={{color:T.border}}>|</span>
        <span style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:'Montserrat'}}>{gallery.nombre}</span>
        <Bdg label={status} color={stColGallery(status)}/>
        {clientSubmitted&&<div style={{display:'flex',alignItems:'center',gap:6,background:`${T.warning}18`,border:`1px solid ${T.warning}44`,borderRadius:6,padding:'4px 10px',cursor:'pointer'}} onClick={()=>setShowSelReview(true)}><AlertTriangle size={11} style={{color:T.warning}}/><span style={{fontSize:11,color:T.warning,fontWeight:600}}>Selección enviada — {gallery.selectionTarget} fotos</span></div>}
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          <Btn variant='secondary' size='sm' icon={<Eye size={12}/>} onClick={onClientView}>Preview cliente</Btn>
          <Btn variant='secondary' size='sm' icon={<Share2 size={12}/>} onClick={()=>{navigator.clipboard?.writeText(`tecnojack.co/g/${gallery.id}`);toast.success('Enlace copiado');}}>Compartir</Btn>
          {status!=='Published'?<Btn size='sm' icon={<Globe size={12}/>} onClick={()=>setShowPublish(true)}>Publicar</Btn>:<Btn variant='secondary' size='sm' icon={<Globe size={12}/>} onClick={()=>toast.success('Galería despublicada')}>Despublicar</Btn>}
        </div>
      </div>

      <div style={{flex:1,display:'grid',gridTemplateColumns:'220px 1fr 260px',overflow:'hidden'}}>
        {/* LEFT: Collections */}
        <div style={{background:T.surface2,borderRight:`1px solid ${T.border}`,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{padding:'12px 14px 8px',fontSize:10,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em'}}>Colecciones</div>
          <div style={{flex:1,overflow:'auto',padding:'0 10px 10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'8px 8px',borderRadius:7,cursor:'pointer',marginBottom:2,background:activeCol===null?T.activeBg:'transparent'}} onClick={()=>setActiveCol(null)}>
              <Image size={12} style={{color:activeCol===null?T.cyan:T.muted}}/>
              <span style={{fontSize:12,color:activeCol===null?T.text:T.muted,fontWeight:activeCol===null?600:400}}>Todas las fotos</span>
              <span style={{marginLeft:'auto',fontSize:10,color:T.subtle}}>{photos.length}</span>
            </div>
            {collections.map(c=>(
              <div key={c.id} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 8px',borderRadius:7,cursor:'pointer',marginBottom:2,background:activeCol===c.id?T.activeBg:'transparent'}} onClick={()=>setActiveCol(c.id)} onMouseEnter={e=>e.currentTarget.style.background=activeCol===c.id?T.activeBg:T.hoverBg} onMouseLeave={e=>e.currentTarget.style.background=activeCol===c.id?T.activeBg:'transparent'}>
                {c.cover?<img src={c.cover} alt={c.nombre} style={{width:20,height:16,borderRadius:3,objectFit:'cover',flexShrink:0}}/>:<FolderOpen size={12} style={{color:T.subtle}}/>}
                <span style={{flex:1,fontSize:12,color:activeCol===c.id?T.text:T.muted,fontWeight:activeCol===c.id?600:400,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.nombre}</span>
                <span style={{fontSize:10,color:T.subtle,flexShrink:0}}>{c.count}</span>
                <button onClick={e=>{e.stopPropagation();deleteCol(c.id);}} style={{background:'none',border:'none',cursor:'pointer',color:T.danger,padding:0,opacity:0,flexShrink:0}} className='del-col'><X size={10}/></button>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 14px',borderTop:`1px solid ${T.border}`}}>
            <div style={{display:'flex',gap:6}}>
              <input value={newColName} onChange={e=>setNewColName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addCollection()} placeholder='Nueva colección...' style={{flex:1,background:T.card,border:`1px solid ${T.border}`,borderRadius:6,padding:'7px 10px',fontSize:11,color:T.text,outline:'none'}}/>
              <button onClick={addCollection} disabled={!newColName.trim()} style={{background:T.cyan,border:'none',borderRadius:6,padding:'7px 9px',cursor:'pointer',opacity:newColName.trim()?1:0.4}}><Plus size={12} style={{color:'#041217'}}/></button>
            </div>
          </div>
        </div>

        {/* CENTER: Photo grid */}
        <div style={{overflow:'auto',display:'flex',flexDirection:'column'}}>
          {/* Collection header */}
          <div style={{padding:'14px 20px 10px',borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',gap:10,flexShrink:0,background:T.bg}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:T.text}}>{activeColData?activeColData.nombre:'Todas las fotos'}</div>
              <div style={{fontSize:11,color:T.muted}}>{displayPhotos.length} fotografías</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',gap:8}}>
              {selected.length>0&&(
                <div style={{display:'flex',alignItems:'center',gap:8,background:T.surface2,borderRadius:8,padding:'6px 12px'}}>
                  <span style={{fontSize:12,color:T.text,fontWeight:600}}>{selected.length} seleccionadas</span>
                  <Btn variant='secondary' size='sm' onClick={()=>toast.success('Moviéndose...')}>Mover a...</Btn>
                  <Btn variant='secondary' size='sm' onClick={()=>toast.success('Portada establecida')}>Portada</Btn>
                  <Btn variant='secondary' size='sm' icon={<Trash2 size={11}/>} onClick={()=>{setPhotos(p=>p.filter(ph=>!selected.includes(ph.id)));setSelected([]);}}>Eliminar</Btn>
                  <button onClick={()=>setSelected([])} style={{background:'none',border:'none',cursor:'pointer',color:T.muted}}><X size={12}/></button>
                </div>
              )}
              <Btn size='sm' icon={<Plus size={12}/>} onClick={()=>setShowUpload(true)}>Añadir fotos</Btn>
            </div>
          </div>
          {/* Masonry grid */}
          <div style={{padding:16,overflow:'auto',flex:1}}>
            {displayPhotos.length===0?(
              <EmptyState icon={<Image size={40}/>} title='Sin fotografías' sub='Añade fotos a esta colección' action='Añadir fotos' onAction={()=>setShowUpload(true)}/>
            ):(
              <div style={{columns:3,columnGap:10}}>
                {displayPhotos.map(ph=>(
                  <div key={ph.id} style={{breakInside:'avoid',marginBottom:10,position:'relative',borderRadius:8,overflow:'hidden',cursor:'pointer'}} onClick={()=>toggleSel(ph.id)}>
                    <img src={ph.url} alt='' style={{width:'100%',display:'block',borderRadius:8,aspectRatio:ph.ratio==='portrait'?'2/3':ph.ratio==='square'?'1/1':'3/2',objectFit:'cover'}}/>
                    <div style={{position:'absolute',inset:0,borderRadius:8,border:`2px solid ${selected.includes(ph.id)?T.cyan:'transparent'}`,transition:'border-color 0.15s'}}/>
                    {selected.includes(ph.id)&&<div style={{position:'absolute',top:8,left:8,width:20,height:20,borderRadius:999,background:T.cyan,display:'flex',alignItems:'center',justifyContent:'center'}}><Check size={11} style={{color:'#041217'}}/></div>}
                    <div style={{position:'absolute',top:8,right:8,opacity:0,transition:'opacity 0.15s'}} className='photo-actions'>
                      <button style={{background:'rgba(4,18,23,0.8)',border:'none',borderRadius:5,padding:'4px 6px',cursor:'pointer',color:'#fff'}}><MoreHorizontal size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Inspector */}
        <div style={{background:T.surface2,borderLeft:`1px solid ${T.border}`,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{padding:'12px 14px',borderBottom:`1px solid ${T.border}`,display:'flex',gap:8}}>
            {[{id:'general',l:'General'},{id:'access',l:'Acceso'},{id:'delivery',l:'Entrega'}].map(t=>(
              <button key={t.id} onClick={()=>setInspTab(t.id as any)} style={{background:inspTab===t.id?T.activeBg:'transparent',border:'none',borderRadius:6,padding:'5px 10px',cursor:'pointer',fontSize:11,color:inspTab===t.id?T.cyan:T.muted,fontWeight:inspTab===t.id?600:400}}>
                {t.l}
              </button>
            ))}
          </div>
          <div style={{flex:1,overflow:'auto',padding:16}}>
            {inspTab==='general'&&(
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em'}}>GENERAL</div>
                <div style={{fontSize:11,color:T.muted,marginBottom:-8}}>Nombre</div>
                <div style={{fontSize:13,fontWeight:600,color:T.text}}>{gallery.nombre}</div>
                <div style={{height:1,background:T.border}}/>
                <div style={{fontSize:11,color:T.muted}}>Tipo</div>
                <Bdg label={gallery.tipo} color='muted'/>
                <div style={{height:1,background:T.border}}/>
                <div style={{fontSize:11,color:T.muted,marginBottom:2}}>Estadísticas</div>
                {[['Fotos',gallery.totalPhotos],['Colecciones',collections.length],['Vistas',gallery.views]].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:T.muted}}>{k}</span><span style={{color:T.text,fontWeight:600}}>{v}</span></div>
                ))}
                <div style={{height:1,background:T.border}}/>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em'}}>PORTADA</div>
                <div style={{borderRadius:8,overflow:'hidden',height:100}}>
                  <img src={gallery.cover} alt='cover' style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
                <Btn variant='secondary' size='sm' full icon={<RefreshCw size={11}/>} onClick={()=>toast.info('Cambiar portada')}>Cambiar portada</Btn>
              </div>
            )}
            {inspTab==='access'&&(
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em'}}>ACCESO</div>
                {[['Tipo',gallery.access],['Expira',gallery.expiry||'Sin expiración']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'8px 0',borderBottom:`1px solid ${T.border}`}}><span style={{color:T.muted}}>{k}</span><span style={{color:T.text,fontWeight:500}}>{v}</span></div>
                ))}
                <div style={{height:1,background:T.border}}/>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em'}}>ACCIONES CLIENTE</div>
                {[{l:'Favoritos',v:gallery.allowFavorites},{l:'Selección',v:gallery.allowSelections},{l:'Descargas',v:gallery.allowDownloads}].map(item=>(
                  <div key={item.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:12}}>
                    <span style={{color:T.text}}>{item.l}</span>
                    <Bdg label={item.v?'Activo':'Desactivado'} color={item.v?'success':'muted'}/>
                  </div>
                ))}
                {gallery.allowSelections&&<div style={{background:T.card,borderRadius:7,padding:10,fontSize:11,color:T.muted}}>Meta de selección: <strong style={{color:T.gold}}>{gallery.selectionTarget} fotos</strong></div>}
              </div>
            )}
            {inspTab==='delivery'&&(
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em'}}>ENLACE CLIENTE</div>
                <div style={{background:T.card,borderRadius:7,padding:10,fontSize:11,color:T.cyan,wordBreak:'break-all'}}>tecnojack.co/g/{gallery.id}</div>
                <Btn variant='secondary' size='sm' full icon={<Copy size={11}/>} onClick={()=>{navigator.clipboard?.writeText(`tecnojack.co/g/${gallery.id}`);toast.success('Enlace copiado');}}>Copiar enlace</Btn>
                <div style={{height:1,background:T.border}}/>
                <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em'}}>ACCIONES</div>
                <Btn variant='secondary' size='sm' full icon={<Send size={11}/>} onClick={()=>toast.success('Notificación enviada al cliente')}>Notificar al cliente</Btn>
                <Btn variant='secondary' size='sm' full icon={<Download size={11}/>} onClick={()=>toast.success('ZIP en preparación')}>Descargar ZIP</Btn>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal open={showUpload} onClose={()=>setShowUpload(false)} title='Añadir fotografías'>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{border:`2px dashed ${T.border}`,borderRadius:10,padding:32,textAlign:'center',background:T.surface2,cursor:'pointer'}} onClick={()=>toast.info('Seleccionar archivos')}>
            <Upload size={32} style={{display:'block',margin:'0 auto 8px',color:T.muted,opacity:0.4}}/>
            <div style={{fontSize:13,color:T.muted,marginBottom:4}}>Arrastra fotografías aquí</div>
            <div style={{fontSize:11,color:T.subtle}}>JPG, WEBP, PNG · Múltiples archivos</div>
          </div>
          <div style={{textAlign:'center',color:T.subtle,fontSize:11}}>— o —</div>
          <Btn variant='secondary' icon={<FolderOpen size={12}/>} full onClick={()=>toast.info('Media Library')}>Elegir de Media Library</Btn>
          {/* Simulated upload queue */}
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {[{n:'DSC_0412.jpg',s:'4.2 MB',p:100,st:'Ready'},{n:'DSC_0413.jpg',s:'3.8 MB',p:75,st:'Uploading'},{n:'DSC_0414.jpg',s:'5.1 MB',p:0,st:'Queued'}].map((f,i)=>(
              <div key={i} style={{background:T.surface2,borderRadius:7,padding:'9px 12px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:f.p<100&&f.p>0?6:0}}>
                  <span style={{fontSize:12,color:T.text,fontWeight:500}}>{f.n}</span>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}><span style={{fontSize:10,color:T.muted}}>{f.s}</span><Bdg label={f.st} color={f.st==='Ready'?'success':f.st==='Uploading'?'cyan':'muted'} size='xs'/></div>
                </div>
                {f.p>0&&f.p<100&&<div style={{height:2,background:T.border,borderRadius:1}}><div style={{height:'100%',width:`${f.p}%`,background:T.cyan,borderRadius:1,transition:'width 0.3s'}}/></div>}
              </div>
            ))}
          </div>
          <Btn onClick={()=>{toast.success('Fotos añadidas a la colección');setShowUpload(false);}} icon={<CheckCircle size={12}/>}>Confirmar</Btn>
        </div>
      </Modal>

      {/* Publish Flow */}
      <Modal open={showPublish} onClose={()=>setShowPublish(false)} title='Publicar Galería'>
        {!published?(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{background:T.surface2,borderRadius:10,padding:16}}>
              <div style={{fontSize:14,fontWeight:700,color:T.text,fontFamily:'Montserrat',marginBottom:12}}>{gallery.nombre}</div>
              {[['Fotografías',gallery.totalPhotos],['Colecciones',collections.length],['Acceso',gallery.access],['Descargas',gallery.allowDownloads?'Alta resolución':'Desactivado'],['Favoritos',gallery.allowFavorites?'Activado':'Desactivado'],['Selección',gallery.allowSelections?`Meta: ${gallery.selectionTarget} fotos`:'Desactivado'],['Expira',gallery.expiry||'Sin expiración']].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:`1px solid ${T.border}`}}><span style={{fontSize:12,color:T.muted}}>{k}</span><span style={{fontSize:12,color:T.text,fontWeight:500}}>{v}</span></div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <Btn variant='secondary' onClick={()=>setShowPublish(false)} full>Cancelar</Btn>
              <Btn onClick={doPublish} icon={<Globe size={12}/>} full>Publicar Galería</Btn>
            </div>
          </div>
        ):(
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{width:56,height:56,background:`${T.success}22`,borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}><CheckCircle size={28} style={{color:T.success}}/></div>
            <div style={{fontSize:16,fontWeight:800,color:T.text,fontFamily:'Montserrat',marginBottom:6}}>Galería Publicada</div>
            <div style={{fontSize:12,color:T.muted,marginBottom:16}}>tecnojack.co/g/{gallery.id}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <Btn icon={<Copy size={12}/>} full onClick={()=>{navigator.clipboard?.writeText(`tecnojack.co/g/${gallery.id}`);toast.success('Enlace copiado');}}>Copiar enlace</Btn>
              <Btn variant='secondary' icon={<Eye size={12}/>} full onClick={()=>{setShowPublish(false);onClientView();}}>Abrir vista cliente</Btn>
              <Btn variant='secondary' icon={<Send size={12}/>} full onClick={()=>toast.success('Notificación enviada al cliente')}>Enviar al cliente</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* Selection Review Modal */}
      <Modal open={showSelReview} onClose={()=>setShowSelReview(false)} title='Revisión de Selección' width={600}>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:T.surface2,borderRadius:8,padding:14,display:'flex',gap:14}}>
            {[['Cliente',gallery.cliente],['Fecha envío','11 Ago 2026 · 5:42 PM'],['Selección',`${gallery.selectionTarget} de ${gallery.selectionTarget} fotos`],['Versión','v1']].map(([k,v])=>(
              <div key={k} style={{flex:1}}><div style={{fontSize:9,color:T.subtle,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:2}}>{k}</div><div style={{fontSize:12,color:T.text,fontWeight:600}}>{v}</div></div>
            ))}
          </div>
