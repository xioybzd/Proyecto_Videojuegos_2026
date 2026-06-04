export const DEMO_MODE = true;
export const DEMO_SKIP_LOCATION_CHECKS = DEMO_MODE;

export const demoAutoUnlocks: Record<
  string,
  {
    recuerdoId: string;
    lugarId?: string;
  }
> = {
  cap1_pista1: {
    recuerdoId: 'cap1_recuerdo1',
    lugarId: 'biblioteca-central',
  },
};
