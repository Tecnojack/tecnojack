
function GalleriesScreen({nav,setActiveGallery}:{nav:(s:Screen)=>void;setActiveGallery:(id:string)=>void}) {
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState('all');
  const [showCreate,setShowCreate]=useState(false);
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({nombre:'',evento:'',cliente:'',tipo:'Wedding',descripcion:'',access:'Private link',password:'',expiry:'',allowDownloads:true,allowFavorites:true,allowSelections:true});
  const [collections,setCollections]=useState([{id:'new-c1',nombre:'Getting Ready'},{id:'new-c2',nombre:'Ceremonia'},{id:'new-c3',nombre:'Recepción'}]);
  const [newCol,setNewCol]=useState('');
  const filtered=GALLERIES_DATA.filter(g=>{
    const q=search.toLowerCase();
    const matchSearch=g.nombre.toLowerCase().includes(q)||g.cliente.toLowerCase().includes(q);
    const matchFilter=filter==='all'||(filter==='published'&&g.estado==='Published')||(filter==='draft'&&g.estado==='Draft')||(filter==='selection'&&g.estado==='Selection Required');
    return matchSearch&&matchFilter;
  });
  const openGallery=(id:string)=>{setActiveGallery(id);nav('galleryBuilder');};
  const openClientGallery=(id:string)=>{setActiveGallery(id);nav('clientGallery');};

  const createGallery=()=>{
    toast.success(`Galería "${form.nombre}" creada`);
    setShowCreate(false);
    setStep(1);
  };

  return (
    <div style={{padding:24,display:'flex',flexDirection:'column',gap:18,maxWidth:1200,margin:'0 auto',width:'100%'}}>
      {/* Header */}
      <div>
        <div style={{fontSize:20,fontWeight:800,color:T.text,fontFamily:'Montserrat',marginBottom:2}}>Galerías</div>
        <div style={{fontSize:12,color:T.muted}}>Crea, organiza y entrega experiencias fotográficas privadas a tus clientes.</div>
      </div>
      {/* KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
        <KPI label='Total' value={String(GALLERIES_DATA.length)} icon={<Image size={15}/>} color='cyan'/>
        <KPI label='Publicadas' value={String(GALLERIES_DATA.filter(g=>g.estado==='Published'||g.estado==='Delivered').length)} icon={<Globe size={15}/>} color='success'/>
        <KPI label='Selección pendiente' value={String(GALLERIES_DATA.filter(g=>g.estado==='Selection Required').length)} icon={<AlertTriangle size={15}/>} color='warning'/>
        <KPI label='Total fotos' value={String(GALLERIES_DATA.reduce((a,g)=>a+g.totalPhotos,0))} icon={<Camera size={15}/>} color='muted'/>
      </div>
      {/* Toolbar */}
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <Srch value={search} onChange={setSearch} placeholder='Buscar galería, cliente...'/>
        <select value={filter} onChange={e=>setFilter(e.target.value)} style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,padding:'7px 10px',color:T.text,fontSize:12,outline:'none'}}>
          <option value='all'>Todos los estados</option>
          <option value='published'>Publicadas</option>
          <option value='draft'>Borrador</option>
          <option value='selection'>Selección requerida</option>
        </select>
        <div style={{marginLeft:'auto'}}>
          <Btn size='sm' icon={<Plus size={12}/>} onClick={()=>{setShowCreate(true);setStep(1);}}>Nueva Galería</Btn>
        </div>
      </div>
      {/* Gallery Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>
        {filtered.map(g=>(
          <div key={g.id} style={{background:T.card,borderRadius:14,overflow:'hidden',border:`1px solid ${T.border}`,cursor:'pointer',transition:'border-color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderHover} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border} onClick={()=>openGallery(g.id)}>
            {/* Cover photo */}
            <div style={{height:200,position:'relative',overflow:'hidden'}}>
              <img src={g.cover} alt={g.nombre} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent 40%, rgba(4,18,23,0.85) 100%)'}}/>
              <div style={{position:'absolute',top:12,right:12}}><Bdg label={g.estado} color={stColGallery(g.estado)} size='xs'/></div>
              {g.estado==='Selection Required'&&<div style={{position:'absolute',top:12,left:12,background:T.warning,borderRadius:6,padding:'3px 8px',fontSize:10,fontWeight:700,color:'#041217',display:'flex',alignItems:'center',gap:4}}><AlertTriangle size={9}/>Selección requerida</div>}
              <div style={{position:'absolute',bottom:14,left:16,right:16}}>
                <div style={{fontSize:16,fontWeight:800,color:'#fff',fontFamily:'Montserrat',lineHeight:1.2,marginBottom:2}}>{g.nombre}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.65)',display:'flex',gap:10}}>
                  <span style={{display:'flex',alignItems:'center',gap:3}}><Image size={9}/>{g.totalPhotos} fotos · {g.collections.length} colecciones</span>
                  <span style={{display:'flex',alignItems:'center',gap:3}}><Eye size={9}/>{g.views}</span>
                </div>
              </div>
            </div>
            {/* Card body */}
            <div style={{padding:'12px 16px 14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{fontSize:11,color:T.muted,display:'flex',gap:8}}><span style={{display:'flex',alignItems:'center',gap:3}}><Calendar size={9}/>{g.fecha}</span><span style={{color:T.subtle}}>·</span><span>{g.tipo}</span></div>
                <span style={{fontSize:10,color:T.subtle}}>{g.cliente}</span>
              </div>
              {/* Collection previews */}
              <div style={{display:'flex',gap:4,marginBottom:12}}>
                {g.collections.slice(0,5).map((c,i)=>(
                  <div key={c.id} title={c.nombre} style={{width:34,height:28,borderRadius:5,overflow:'hidden',flexShrink:0,border:'2px solid rgba(4,18,23,0.8)'}}>
                    <img src={c.cover} alt={c.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                ))}
                {g.collections.length>5&&<div style={{width:34,height:28,borderRadius:5,background:T.surface2,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:T.muted,fontWeight:700}}>+{g.collections.length-5}</div>}
              </div>
              <div style={{display:'flex',gap:6}} onClick={e=>e.stopPropagation()}>
                <Btn size='sm' icon={<FolderOpen size={11}/>} onClick={()=>openGallery(g.id)}>Abrir</Btn>
                <Btn variant='secondary' size='sm' icon={<Eye size={11}/>} onClick={()=>openClientGallery(g.id)}>Vista cliente</Btn>
                <Btn variant='secondary' size='sm' icon={<Share2 size={11}/>} onClick={()=>{navigator.clipboard?.writeText(`tecnojack.co/g/${g.id}`);toast.success('Enlace copiado');}}>
                  <Share2 size={10}/>
                </Btn>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Gallery Wizard */}
      <Modal open={showCreate} onClose={()=>{setShowCreate(false);setStep(1);}} title={`Nueva Galería — Paso ${step} de 4`} width={560}>
        {/* Progress */}
        <div style={{display:'flex',gap:4,marginBottom:20}}>
          {[1,2,3,4].map(s=>(
            <div key={s} style={{flex:1,height:3,borderRadius:2,background:step>=s?T.cyan:T.surface2,transition:'background 0.2s'}}/>
          ))}
        </div>
        {step===1&&(
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:4}}>Información general</div>
            <Inp label='Nombre de la galería*' value={form.nombre} onChange={v=>setForm(p=>({...p,nombre:v}))} placeholder='Ej: Boda Marcela & Andrés'/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <Sel label='Evento relacionado' value={form.evento} onChange={v=>setForm(p=>({...p,evento:v}))} options={[{value:'',label:'Ninguno'},...EVENTS.map(e=>({value:e.id,label:e.nombre}))]}/>
              <Sel label='Tipo' value={form.tipo} onChange={v=>setForm(p=>({...p,tipo:v}))} options={['Wedding','Quinceañera','Graduation','Portrait','Corporate','Music','Other'].map(t=>({value:t,label:t}))}/>
            </div>
            <Sel label='Cliente' value={form.cliente} onChange={v=>setForm(p=>({...p,cliente:v}))} options={[{value:'',label:'Seleccionar cliente...'},...CONTACTS.map(c=>({value:c.id,label:c.nombre}))]}/>
            <Textarea label='Descripción (opcional)' value={form.descripcion} onChange={v=>setForm(p=>({...p,descripcion:v}))} rows={2} placeholder='Mensaje personalizado para el cliente...'/>
          </div>
        )}
        {step===2&&(
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:4}}>Fotografía de portada</div>
            <div style={{border:`2px dashed ${T.border}`,borderRadius:10,padding:32,textAlign:'center',cursor:'pointer',background:T.surface2}} onClick={()=>toast.info('Seleccionar archivo')}>
              <Upload size={28} style={{display:'block',margin:'0 auto 8px',color:T.muted,opacity:0.5}}/>
              <div style={{fontSize:13,color:T.muted,marginBottom:4}}>Arrastra una foto aquí o haz clic para seleccionar</div>
              <div style={{fontSize:11,color:T.subtle}}>JPG, WEBP · Mín 1200×800px</div>
            </div>
            <div style={{textAlign:'center',color:T.muted,fontSize:11}}>— o —</div>
            <Btn variant='secondary' icon={<FolderOpen size={12}/>} full onClick={()=>toast.info('Media Library')}>Elegir de Media Library</Btn>
            <div style={{background:T.surface2,borderRadius:8,padding:12}}>
              <div style={{fontSize:11,fontWeight:600,color:T.text,marginBottom:6}}>Recorte de portada</div>
              <div style={{display:'flex',gap:8}}>
                {['16:9 Desktop','9:16 Mobile'].map(r=>(
                  <div key={r} style={{flex:1,border:`1px solid ${T.border}`,borderRadius:6,padding:'7px 10px',textAlign:'center',fontSize:11,color:T.muted,cursor:'pointer'}}>{r}</div>
                ))}
              </div>
            </div>
          </div>
        )}
        {step===3&&(
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:4}}>Acceso y permisos</div>
            <Sel label='Tipo de acceso' value={form.access} onChange={v=>setForm(p=>({...p,access:v}))} options={['Private link','Password protected','Client account','Public'].map(a=>({value:a,label:a}))}/>
            {form.access==='Password protected'&&<Inp label='Contraseña' value={form.password} onChange={v=>setForm(p=>({...p,password:v}))} placeholder='Mín 6 caracteres'/>}
            <Inp label='Fecha de expiración' value={form.expiry} onChange={v=>setForm(p=>({...p,expiry:v}))} placeholder='Ej: 2026-10-18'/>
            <div style={{fontSize:12,fontWeight:600,color:T.text,marginBottom:-6}}>Acciones del cliente</div>
            {[{k:'allowFavorites',l:'Permitir favoritos'},{k:'allowSelections',l:'Permitir selección de fotos'},{k:'allowDownloads',l:'Permitir descargas'}].map(item=>(
              <label key={item.k} style={{display:'flex',gap:10,alignItems:'center',cursor:'pointer'}}>
                <input type='checkbox' checked={(form as any)[item.k]} onChange={e=>setForm(p=>({...p,[item.k]:e.target.checked}))} style={{width:14,height:14,accentColor:T.cyan}}/>
                <span style={{fontSize:12,color:T.text}}>{item.l}</span>
              </label>
            ))}
          </div>
        )}
        {step===4&&(
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:4}}>Colecciones iniciales</div>
            <div style={{fontSize:11,color:T.muted}}>Crea las secciones de tu galería. Puedes añadir y reordenar más tarde.</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {collections.map((c,i)=>(
                <div key={c.id} style={{display:'flex',gap:8,alignItems:'center',background:T.surface2,borderRadius:7,padding:'9px 12px'}}>
                  <Menu size={13} style={{color:T.subtle,cursor:'grab'}}/>
                  <span style={{flex:1,fontSize:12,color:T.text}}>{c.nombre}</span>
                  <button onClick={()=>setCollections(p=>p.filter(x=>x.id!==c.id))} style={{background:'none',border:'none',cursor:'pointer',color:T.danger}}><X size={13}/></button>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <input value={newCol} onChange={e=>setNewCol(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&newCol.trim()){setCollections(p=>[...p,{id:`new-${Date.now()}`,nombre:newCol.trim()}]);setNewCol('');}}} placeholder='Nombre de la colección...' style={{flex:1,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,padding:'8px 12px',fontSize:12,color:T.text,outline:'none'}}/>
              <Btn variant='secondary' size='sm' icon={<Plus size={12}/>} onClick={()=>{if(newCol.trim()){setCollections(p=>[...p,{id:`new-${Date.now()}`,nombre:newCol.trim()}]);setNewCol('');}}} disabled={!newCol.trim()}>Añadir</Btn>
            </div>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
          <Btn variant='secondary' onClick={()=>step===1?setShowCreate(false):setStep(p=>p-1)} icon={step>1?<ArrowLeft size={12}/>:undefined}>{step===1?'Cancelar':'Anterior'}</Btn>
          <Btn onClick={()=>step<4?setStep(p=>p+1):createGallery()} icon={step<4?<ArrowRight size={12}/>:<CheckCircle size={12}/>} disabled={step===1&&!form.nombre}>{step<4?'Siguiente':'Crear Galería'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

function DeliverablesScreen() {
  const items=[
