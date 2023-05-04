import { AppOptions } from 'firebase-admin';

export type FirebaseModuleOptions = Omit<AppOptions, 'credential'>;
