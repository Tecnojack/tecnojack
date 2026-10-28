          </div>
          <div style={{columns:4,columnGap:8}}>
            {photos.slice(0,gallery.selectionTarget).map((ph,i)=>(
              <div key={ph.id} style={{breakInside:'avoid',marginBottom:8,borderRadius:6,overflow:'hidden',position:'relative'}}>
                <img src={ph.url} alt='' style={{width:'100%',display:'block',aspectRatio:ph.ratio==='portrait'?'2/3':'3/2',objectFit:'cover'}}/>
                <div style={{position:'absolute',top:4,left:4,width:16,height:16,borderRadius:999,background:T.cyan,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700,color:'#041217'}}>{i+1}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:8}}>
            <Btn variant='secondary' icon={<Download size={12}/>} onClick={()=>toast.success('Exportando nombres de archivo...')}>Export filenames</Btn>
            <Btn variant='secondary' icon={<RefreshCw size={12}/>} onClick={()=>toast.success('Solicitud de cambios enviada')}>Pedir cambios</Btn>
            <Btn icon={<CheckCircle size={12}/>} onClick={()=>{toast.success('Selección aprobada');setShowSelReview(false);}}>Aprobar selección</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: Client Gallery (external, cinematic)
// ══════════════════════════════════════════════════════════════════════════════
function ClientGalleryScreen({galleryId,onBack}:{galleryId:string;onBack:()=>void}) {
  const gallery=GALLERIES_DATA.find(g=>g.id===galleryId)??GALLERIES_DATA[0];
  const [phase,setPhase]=useState<'cover'|'gallery'|'selection-done'>('cover');
  const [activeCol,setActiveCol]=useState<string>('all');
  const [lightbox,setLightbox]=useState<{photo:GPhoto;index:number}|null>(null);
  const [favorites,setFavorites]=useState<string[]>([]);
  const [selections,setSelections]=useState<string[]>([]);
  const [showFavs,setShowFavs]=useState(false);
  const [showSel,setShowSel]=useState(false);
  const [showReview,setShowReview]=useState(false);
  const [showSubmit,setShowSubmit]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [showDownload,setShowDownload]=useState<string|null>(null);
  const [downloading,setDownloading]=useState(false);
  const [downloadReady,setDownloadReady]=useState(false);
  const allPhotos=GALLERY_PHOTOS;
  const visiblePhotos=showFavs?allPhotos.filter(p=>favorites.includes(p.id)):activeCol==='all'?allPhotos:allPhotos.filter(p=>p.col===activeCol);
  const target=gallery.selectionTarget;

  const toggleFav=(id:string)=>setFavorites(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const toggleSel=(id:string)=>{
    if(selections.includes(id))setSelections(p=>p.filter(x=>x!==id));
    else if(selections.length<target)setSelections(p=>[...p,id]);
    else toast.error(`Ya seleccionaste ${target} fotos`);
  };
  const nextPhoto=()=>{if(!lightbox)return;const idx=lightbox.index;const next=(idx+1)%visiblePhotos.length;setLightbox({photo:visiblePhotos[next],index:next});};
  const prevPhoto=()=>{if(!lightbox)return;const idx=lightbox.index;const prev=(idx-1+visiblePhotos.length)%visiblePhotos.length;setLightbox({photo:visiblePhotos[prev],index:prev});};

  useEffect(()=>{
    if(!lightbox)return;
    const handler=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')nextPhoto();if(e.key==='ArrowLeft')prevPhoto();if(e.key==='Escape')setLightbox(null);};
    window.addEventListener('keydown',handler);
    return()=>window.removeEventListener('keydown',handler);
  },[lightbox,visiblePhotos]);

  const startDownload=(scope:string)=>{setDownloading(true);setShowDownload(null);setTimeout(()=>{setDownloading(false);setDownloadReady(true);},2000);};

  // COVER
  if(phase==='cover') return (
    <div style={{height:'100vh',position:'relative',overflow:'hidden',fontFamily:'Inter'}}>
      <img src={gallery.cover} alt='cover' style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(4,18,23,0.3) 0%,rgba(4,18,23,0.55) 60%,rgba(4,18,23,0.8) 100%)'}}/>
      {/* Logo */}
      <div style={{position:'absolute',top:24,left:0,right:0,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 32px'}}>
        <span style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.8)',letterSpacing:'0.15em',fontFamily:'Montserrat'}}>TECNOJACK</span>
        <button onClick={onBack} style={{background:'none',border:'1px solid rgba(255,255,255,0.3)',borderRadius:6,padding:'6px 12px',cursor:'pointer',color:'rgba(255,255,255,0.7)',fontSize:11}}>← ERP</button>
      </div>
      {/* Center title */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',width:'80%'}}>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',letterSpacing:'0.2em',marginBottom:16,textTransform:'uppercase'}}>{gallery.tipo}</div>
        <div style={{fontSize:52,fontWeight:800,color:'#fff',fontFamily:'Montserrat',lineHeight:1.05,marginBottom:8,textShadow:'0 2px 20px rgba(0,0,0,0.4)'}}>{gallery.nombre.toUpperCase()}</div>
        <div style={{fontSize:14,color:'rgba(255,255,255,0.55)',letterSpacing:'0.15em',marginBottom:40}}>{gallery.fecha.split(' ').join(' · ')}</div>
        <button onClick={()=>setPhase('gallery')} style={{background:'rgba(255,255,255,0.12)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.3)',borderRadius:8,padding:'14px 40px',cursor:'pointer',color:'#fff',fontSize:13,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',transition:'background 0.2s'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.2)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.12)'}>
          VER GALERÍA →
        </button>
      </div>
      {/* Scroll indicator */}
      <div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',color:'rgba(255,255,255,0.4)',fontSize:10,letterSpacing:'0.1em',textAlign:'center'}}>
        <div style={{width:1,height:32,background:'rgba(255,255,255,0.3)',margin:'0 auto 6px'}}/>
        SCROLL
      </div>
    </div>
  );

  // SUBMITTED SUCCESS
  if(submitted) return (
    <div style={{background:'#f8f6f2',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'#fff',borderRadius:16,padding:48,maxWidth:480,textAlign:'center',boxShadow:'0 4px 40px rgba(0,0,0,0.08)'}}>
        <div style={{width:64,height:64,background:'#f0fdf4',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}><CheckCircle size={32} style={{color:'#22c55e'}}/></div>
        <div style={{fontSize:22,fontWeight:800,color:'#1a1a1a',marginBottom:8,fontFamily:'Montserrat'}}>Selección enviada</div>
        <div style={{fontSize:14,color:'#666',marginBottom:24,lineHeight:1.6}}>{selections.length} fotografías · Enviada el 11 agosto 2026</div>
        <div style={{background:'#f8f6f2',borderRadius:8,padding:16,marginBottom:20,textAlign:'left'}}>
          <p style={{fontSize:12,color:'#888',lineHeight:1.7,margin:0}}>TECNOJACK ha recibido tu selección y comenzará a preparar tu álbum. Te contactarán si tienen alguna pregunta.</p>
        </div>
        <button onClick={()=>setPhase('gallery')} style={{width:'100%',background:'#1a1a1a',color:'#fff',border:'none',borderRadius:8,padding:'13px 24px',cursor:'pointer',fontSize:13,fontWeight:600}}>Volver a la galería</button>
      </div>
    </div>
  );

  // MAIN GALLERY
  const bg='#f0ece8';
  const textDark='#1a1a1a';
  const textMid='#555';
  const textLight='#999';
  const accent='#1a1a1a';

  return (
    <div style={{background:bg,minHeight:'100vh',fontFamily:'Inter'}}>
      {/* Sticky nav */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(240,236,232,0.92)',backdropFilter:'blur(14px)',borderBottom:'1px solid rgba(0,0,0,0.06)',padding:'0 32px',display:'flex',alignItems:'center',gap:16,height:58}}>
        <span style={{fontSize:11,fontWeight:700,color:textDark,letterSpacing:'0.15em',fontFamily:'Montserrat',marginRight:'auto'}}>TECNOJACK</span>
        <span style={{fontSize:13,fontWeight:600,color:textDark,position:'absolute',left:'50%',transform:'translateX(-50%)'}}>
          {gallery.nombre}
        </span>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          {gallery.allowFavorites&&<button onClick={()=>{setShowFavs(p=>!p);setShowSel(false);}} style={{background:showFavs?textDark:'transparent',border:`1px solid ${showFavs?textDark:'rgba(0,0,0,0.15)'}`,borderRadius:8,padding:'7px 14px',cursor:'pointer',fontSize:12,fontWeight:500,color:showFavs?'#fff':textDark,display:'flex',alignItems:'center',gap:5}}><Heart size={13} style={{fill:showFavs?'#fff':'none'}}/>{showFavs?'Todas':'Favoritas'}{favorites.length>0&&<span style={{background:showFavs?'rgba(255,255,255,0.25)':textDark,color:showFavs?'#fff':'#fff',borderRadius:999,padding:'1px 6px',fontSize:10,fontWeight:700}}>{favorites.length}</span>}</button>}
          {gallery.allowSelections&&!submitted&&<button onClick={()=>{setShowSel(p=>!p);setShowFavs(false);}} style={{background:showSel?textDark:'transparent',border:`1px solid ${showSel?textDark:'rgba(0,0,0,0.15)'}`,borderRadius:8,padding:'7px 14px',cursor:'pointer',fontSize:12,fontWeight:500,color:showSel?'#fff':textDark,display:'flex',alignItems:'center',gap:5}}><CheckCircle size={13}/>{selections.length}/{target}{showSel?' · Finalizar':''}</button>}
          {gallery.allowDownloads&&<button onClick={()=>setShowDownload('gallery')} style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',borderRadius:8,padding:'7px 14px',cursor:'pointer',fontSize:12,fontWeight:500,color:textDark,display:'flex',alignItems:'center',gap:5}}><Download size={13}/>Descargar</button>}
          <button onClick={onBack} style={{background:'transparent',border:'1px solid rgba(0,0,0,0.12)',borderRadius:8,padding:'7px 12px',cursor:'pointer',fontSize:11,color:textMid}}>← ERP</button>
        </div>
      </div>

      {/* Collection tabs */}
      <div style={{overflowX:'auto',whiteSpace:'nowrap',padding:'0 32px',borderBottom:'1px solid rgba(0,0,0,0.06)',background:'rgba(240,236,232,0.6)'}}>
        <div style={{display:'inline-flex',gap:0}}>
          {[{id:'all',nombre:'Todas'},...gallery.collections].map(c=>(
            <button key={c.id} onClick={()=>{setActiveCol(c.id);setShowFavs(false);}} style={{background:'none',border:'none',borderBottom:`2px solid ${activeCol===c.id&&!showFavs?textDark:'transparent'}`,padding:'14px 20px',cursor:'pointer',fontSize:12,fontWeight:activeCol===c.id&&!showFavs?700:400,color:activeCol===c.id&&!showFavs?textDark:textLight,whiteSpace:'nowrap',transition:'all 0.15s'}}>
              {c.nombre}{c.id!=='all'&&<span style={{marginLeft:6,fontSize:10,color:textLight}}>{('count' in c)?c.count:''}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Collection intro */}
      {activeCol!=='all'&&!showFavs&&(()=>{const col=gallery.collections.find(c=>c.id===activeCol);return col&&col.tagline?(<div style={{padding:'40px 32px 0',textAlign:'center'}}><div style={{fontSize:10,letterSpacing:'0.2em',color:textLight,textTransform:'uppercase',marginBottom:8}}>{col.nombre}</div><div style={{fontSize:18,fontStyle:'italic',color:textDark,fontWeight:300}}>&ldquo;{col.tagline}&rdquo;</div><div style={{fontSize:12,color:textLight,marginTop:4}}>{col.count} fotografías</div></div>):null;})()}

      {/* Selection banner */}
      {showSel&&gallery.allowSelections&&!submitted&&(
        <div style={{background:textDark,padding:'12px 32px',display:'flex',alignItems:'center',gap:16}}>
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.9)',fontWeight:600}}>Seleccionando fotos para tu álbum</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:2}}>{target-selections.length>0?`Puedes seleccionar ${target-selections.length} más`:`Límite alcanzado — haz clic en "Revisar" cuando estés listo`}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>{selections.length}<span style={{color:'rgba(255,255,255,0.4)'}}>/{target}</span></div>
            <div style={{width:80,height:4,background:'rgba(255,255,255,0.15)',borderRadius:2}}><div style={{width:`${(selections.length/target)*100}%`,height:'100%',background:'#fff',borderRadius:2,transition:'width 0.3s'}}/></div>
          </div>
          {selections.length>0&&<button onClick={()=>setShowReview(true)} style={{background:'#fff',color:textDark,border:'none',borderRadius:7,padding:'9px 20px',cursor:'pointer',fontSize:12,fontWeight:600}}>Revisar selección</button>}
        </div>
      )}

      {/* Photo grid */}
      <div style={{padding:'28px 28px 60px',columns:'3 280px',columnGap:12}}>
        {visiblePhotos.map((ph,i)=>(
          <div key={ph.id} style={{breakInside:'avoid',marginBottom:12,position:'relative',cursor:'zoom-in',borderRadius:4,overflow:'hidden',}} onClick={()=>setLightbox({photo:ph,index:i})}>
            <img src={ph.url} alt='' style={{width:'100%',display:'block',borderRadius:4,aspectRatio:ph.ratio==='portrait'?'2/3':ph.ratio==='square'?'1/1':'3/2',objectFit:'cover',transition:'transform 0.3s'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.01)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
            {/* Hover overlay */}
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 50%)',opacity:0,transition:'opacity 0.2s',borderRadius:4}} onMouseEnter={e=>e.currentTarget.style.opacity='1'} onMouseLeave={e=>e.currentTarget.style.opacity='0'} onClick={e=>e.stopPropagation()}>
              <div style={{position:'absolute',bottom:10,left:10,display:'flex',gap:8}}>
                {gallery.allowFavorites&&<button onClick={e=>{e.stopPropagation();toggleFav(ph.id);}} style={{background:'rgba(0,0,0,0.5)',border:'none',borderRadius:999,padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Heart size={14} style={{color:'#fff',fill:favorites.includes(ph.id)?'#fff':'none'}}/></button>}
                {showSel&&gallery.allowSelections&&<button onClick={e=>{e.stopPropagation();toggleSel(ph.id);}} style={{background:selections.includes(ph.id)?'#fff':'rgba(0,0,0,0.5)',border:'none',borderRadius:999,padding:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Check size={14} style={{color:selections.includes(ph.id)?textDark:'#fff'}}/></button>}
              </div>
            </div>
            {selections.includes(ph.id)&&<div style={{position:'absolute',top:8,left:8,width:22,height:22,background:textDark,borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center'}}><Check size={11} style={{color:'#fff'}}/></div>}
            {favorites.includes(ph.id)&&!selections.includes(ph.id)&&<div style={{position:'absolute',top:8,right:8}}><Heart size={14} style={{color:'#fff',filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.8)',fill:'#fff'}}/></div>}
          </div>
        ))}
        {visiblePhotos.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:textLight,fontSize:14}}>Sin fotografías en esta vista.</div>}
      </div>

      {/* LIGHTBOX */}
      {lightbox&&(
        <div style={{position:'fixed',inset:0,zIndex:100,background:'#050708',display:'flex',flexDirection:'column'}} onClick={()=>setLightbox(null)}>
          {/* Lightbox header */}
          <div style={{position:'absolute',top:0,left:0,right:0,padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'linear-gradient(to bottom,rgba(5,7,8,0.8),transparent)',zIndex:101}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.7)'}}>{gallery.nombre} <span style={{color:'rgba(255,255,255,0.35)'}}>·</span> {gallery.collections.find(c=>c.id===lightbox.photo.col)?.nombre??'All'}</div>
            <div style={{display:'flex',gap:8}}>
              {gallery.allowFavorites&&<button onClick={()=>toggleFav(lightbox.photo.id)} style={{background:'none',border:'none',cursor:'pointer',padding:'6px',color:'rgba(255,255,255,0.7)'}}><Heart size={18} style={{fill:favorites.includes(lightbox.photo.id)?'#fff':'none',color:'#fff'}}/></button>}
              {showSel&&gallery.allowSelections&&<button onClick={()=>toggleSel(lightbox.photo.id)} style={{background:selections.includes(lightbox.photo.id)?'#fff':'none',border:'1px solid rgba(255,255,255,0.4)',borderRadius:6,cursor:'pointer',padding:'5px 12px',color:selections.includes(lightbox.photo.id)?'#050708':'#fff',fontSize:12}}>{selections.includes(lightbox.photo.id)?'✓ Seleccionada':'Seleccionar'}</button>}
              {gallery.allowDownloads&&<button onClick={()=>{setShowDownload('photo');}} style={{background:'none',border:'1px solid rgba(255,255,255,0.3)',borderRadius:6,padding:'5px 12px',cursor:'pointer',color:'rgba(255,255,255,0.7)',fontSize:12,display:'flex',alignItems:'center',gap:4}}><Download size={13}/>Descargar</button>}
              <button onClick={()=>setLightbox(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',padding:'6px'}}><X size={20}/></button>
            </div>
          </div>
          {/* Photo */}
          <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 70px'}} onClick={()=>setLightbox(null)}>
            <img src={lightbox.photo.url.replace('w=800','w=1400')} alt='' onClick={e=>e.stopPropagation()} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',borderRadius:2,display:'block'}}/>
          </div>
          {/* Prev/Next */}
          <button onClick={e=>{e.stopPropagation();prevPhoto();}} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,0.08)',border:'none',borderRadius:999,width:44,height:44,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><ChevronLeft size={20}/></button>
          <button onClick={e=>{e.stopPropagation();nextPhoto();}} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,0.08)',border:'none',borderRadius:999,width:44,height:44,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><ChevronRight size={20}/></button>
          {/* Counter */}
          <div style={{position:'absolute',bottom:16,left:'50%',transform:'translateX(-50%)',fontSize:11,color:'rgba(255,255,255,0.35)'}}>{lightbox.index+1} / {visiblePhotos.length}</div>
        </div>
      )}

      {/* Selection Review Modal */}
      {showReview&&(
        <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'flex-end',justifyContent:'center'}} onClick={()=>setShowReview(false)}>
          <div style={{background:'#fff',borderRadius:'16px 16px 0 0',width:'100%',maxWidth:680,maxHeight:'90vh',overflow:'auto',padding:28}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div><div style={{fontSize:16,fontWeight:800,color:textDark,fontFamily:'Montserrat'}}>Tu selección</div><div style={{fontSize:12,color:textMid,marginTop:2}}>{selections.length} de {target} fotografías</div></div>
              <button onClick={()=>setShowReview(false)} style={{background:'none',border:'none',cursor:'pointer',color:textMid}}><X size={20}/></button>
            </div>
            {selections.length<target&&<div style={{background:'#fff8e1',border:'1px solid #fbbf24',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#92400e',marginBottom:16}}>Aún puedes seleccionar {target-selections.length} fotos más antes de enviar.</div>}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:20}}>
              {allPhotos.filter(p=>selections.includes(p.id)).map((ph,i)=>(
                <div key={ph.id} style={{position:'relative',borderRadius:6,overflow:'hidden'}}>
                  <img src={ph.url} alt='' style={{width:'100%',aspectRatio:ph.ratio==='portrait'?'2/3':'1/1',objectFit:'cover',display:'block',borderRadius:6}}/>
                  <button onClick={()=>setSelections(p=>p.filter(x=>x!==ph.id))} style={{position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.65)',border:'none',borderRadius:999,width:20,height:20,cursor:'pointer',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}><X size={10}/></button>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setShowReview(false)} style={{flex:1,background:'transparent',border:'1px solid rgba(0,0,0,0.15)',borderRadius:8,padding:'12px',cursor:'pointer',fontSize:13,fontWeight:500,color:textDark}}>Seguir editando</button>
              <button onClick={()=>{setShowReview(false);setShowSubmit(true);}} style={{flex:2,background:textDark,color:'#fff',border:'none',borderRadius:8,padding:'12px',cursor:'pointer',fontSize:13,fontWeight:700}}>Enviar selección →</button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirm */}
      {showSubmit&&(
        <div style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setShowSubmit(false)}>
          <div style={{background:'#fff',borderRadius:16,padding:32,maxWidth:440,width:'100%'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:800,color:textDark,fontFamily:'Montserrat',marginBottom:8}}>¿Enviar tu selección?</div>
            <p style={{fontSize:13,color:textMid,lineHeight:1.6,marginBottom:20}}>TECNOJACK recibirá estas <strong>{selections.length}</strong> fotografías para preparar tu álbum. Podrás solicitar cambios únicamente si el estudio habilita una nueva revisión.</p>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setShowSubmit(false)} style={{flex:1,background:'transparent',border:'1px solid rgba(0,0,0,0.15)',borderRadius:8,padding:'12px',cursor:'pointer',fontSize:13,color:textDark}}>Cancelar</button>
              <button onClick={()=>{setShowSubmit(false);setSubmitted(true);}} style={{flex:2,background:textDark,color:'#fff',border:'none',borderRadius:8,padding:'12px',cursor:'pointer',fontSize:13,fontWeight:700}}>Enviar selección</button>
            </div>
          </div>
        </div>
      )}

      {/* Download modal */}
      {showDownload&&(
        <div style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setShowDownload(null)}>
          <div style={{background:'#fff',borderRadius:16,padding:28,maxWidth:360,width:'100%'}} onClick={e=>e.stopPropagation()}>
            {!downloadReady?(
              <>
                <div style={{fontSize:14,fontWeight:700,color:textDark,marginBottom:16}}>{downloading?'Preparando tus fotografías...':'Descargar'}</div>
                {downloading?(
                  <div style={{textAlign:'center',padding:'20px 0'}}>
                    <div style={{width:48,height:48,border:`3px solid rgba(0,0,0,0.08)`,borderTop:`3px solid ${textDark}`,borderRadius:999,margin:'0 auto 14px',animation:'spin 0.8s linear infinite'}}/>
                    <div style={{fontSize:12,color:textMid}}>Preparando tu descarga...</div>
                  </div>
                ):(
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {showDownload==='photo'&&<button onClick={()=>startDownload('web')} style={{padding:'12px 16px',border:'1px solid rgba(0,0,0,0.1)',borderRadius:8,cursor:'pointer',textAlign:'left',fontSize:13,color:textDark,background:'transparent'}}>📸 Esta fotografía — Web Size</button>}
                    {showDownload==='photo'&&<button onClick={()=>startDownload('hires')} style={{padding:'12px 16px',border:'1px solid rgba(0,0,0,0.1)',borderRadius:8,cursor:'pointer',textAlign:'left',fontSize:13,color:textDark,background:'transparent'}}>🖼️ Esta fotografía — Alta resolución</button>}
                    <button onClick={()=>startDownload('gallery')} style={{padding:'12px 16px',border:'1px solid rgba(0,0,0,0.1)',borderRadius:8,cursor:'pointer',textAlign:'left',fontSize:13,color:textDark,background:'transparent'}}>📦 Galería completa — ZIP</button>
                  </div>
                )}
              </>
            ):(
              <div style={{textAlign:'center',padding:'10px 0'}}>
                <div style={{fontSize:28,marginBottom:12}}>✅</div>
                <div style={{fontSize:14,fontWeight:700,color:textDark,marginBottom:6}}>Tu descarga está lista</div>
                <button onClick={()=>{setDownloadReady(false);toast.success('Descargando...');setShowDownload(null);}} style={{width:'100%',background:textDark,color:'#fff',border:'none',borderRadius:8,padding:'13px',cursor:'pointer',fontSize:13,fontWeight:700,marginTop:12}}>Descargar ZIP</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN: QuotationBuilder (full 3-panel)
// ══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  {id:'S001',nombre:'Fotografía Boda Full Day',precio:4500000,categoria:'Foto'},
  {id:'S002',nombre:'Videografía Cinematográfica',precio:3500000,categoria:'Video'},
  {id:'S003',nombre:'Drone Cinematográfico',precio:800000,categoria:'Drone'},
  {id:'S004',nombre:'Álbum Digital Premium',precio:700000,categoria:'Entregable'},
  {id:'S005',nombre:'Fotografía Corporativa (4h)',precio:2800000,categoria:'Foto'},
  {id:'S006',nombre:'Video Institucional 2-4 min',precio:5500000,categoria:'Video'},
  {id:'S007',nombre:'Sesión de Marca (2h)',precio:1800000,categoria:'Foto'},
  {id:'S008',nombre:'Foto + Video Quinceañera',precio:3800000,categoria:'Combo'},
  {id:'S009',nombre:'BTS fotografía',precio:1200000,categoria:'Foto'},
  {id:'S010',nombre:'Color grading premium',precio:900000,categoria:'Post'},
];

type QuoteItem = {id:string;nombre:string;precio:number;cant:number;desc:number};

function QuotationBuilder({onBack}:{onBack:()=>void}) {
  const [cliente,setCliente]=useState('');
  const [servicio,setServicio]=useState('Foto + Video Boda');
  const [validez,setValidez]=useState('30');
  const [anticipo,setAnticipo]=useState('50');
  const [items,setItems]=useState<QuoteItem[]>([
    {id:'S001',nombre:'Fotografía Boda Full Day',precio:4500000,cant:1,desc:0},
    {id:'S002',nombre:'Videografía Cinematográfica',precio:3500000,cant:1,desc:0},
    {id:'S003',nombre:'Drone Cinematográfico',precio:800000,cant:1,desc:0},
  ]);
  const [nota,setNota]=useState('');
  const [tab,setTab]=useState<'servicios'|'preview'|'enviar'>('servicios');
  const [sending,setSending]=useState(false);

  const addItem=(s:typeof SERVICES[0])=>{
    if(items.find(i=>i.id===s.id)){toast.info('Ya está en la cotización');return;}
    setItems(p=>[...p,{id:s.id,nombre:s.nombre,precio:s.precio,cant:1,desc:0}]);
  };
  const removeItem=(id:string)=>setItems(p=>p.filter(i=>i.id!==id));
  const updateItem=(id:string,k:'cant'|'desc',v:number)=>setItems(p=>p.map(i=>i.id===id?{...i,[k]:v}:i));

  const subtotal=items.reduce((a,i)=>a+i.precio*i.cant*(1-i.desc/100),0);
