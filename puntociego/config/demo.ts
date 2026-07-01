export const DEMO_MODE = true;
export const DEMO_SKIP_LOCATION_CHECKS = DEMO_MODE;

export const demoAutoUnlocks: Record<
  string,
  {
    recuerdoId?: string;
    lugarId?: string;
  }
> = {
  cel_pista_comedor: {
    lugarId: 'comedor-sanmarquino',
  },
  cap4_pista1: {
    recuerdoId: 'cap4_recuerdo1',
    lugarId: 'fcm',
  },
  cap5_pista1: {
    recuerdoId: 'cap5_recuerdo1',
    lugarId: 'parque-asmaticos',
  },
  cap6_pista1: {
    recuerdoId: 'cap6_recuerdo1',
    lugarId: 'huaca',
  },
};
