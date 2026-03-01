export interface GrupoInvitado {
  id_grupo: number;
  grupo: 'Novia' | 'Novio';
  tipo: 'Familia' | 'Amigos';
  invitados: Invitado[];
}

export interface Invitado {
  nombre: string;
  parentesco: string;
  adultos: number;
  ninos: number;
  total: number;
}
