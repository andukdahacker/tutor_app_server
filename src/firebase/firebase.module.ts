import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';
import { FIREBASE } from './firebase.constants';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [ConfigModule],
  exports: [FirebaseService, FIREBASE],
  providers: [
    {
      provide: FIREBASE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const serviceAccount = {
          type: 'service_account',
          project_id: configService.get('FIREBASE_PROJECT_ID'),
          private_key_id: configService.get('FIREBASE_PRIVATE_KEY_ID'),
          private_key: configService
            .get('FIREBASE_PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          client_email: configService.get('FIREBASE_CLIENT_EMAIL'),
          client_id: configService.get('FIREBASE_CLIENT_ID'),
          auth_uri: configService.get('FIREBASE_AUTH_URI'),
          token_uri: configService.get('FIREBASE_TOKEN_URI'),
          auth_provider_x509_cert_url: configService.get(
            'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
          ),
          client_x509_cert_url: configService.get(
            'FIREBASE_CLIENT_X509_CERT_URL',
          ),
        } as firebaseAdmin.ServiceAccount;

        const firebase = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
        });
        return firebase;
      },
    },
    FirebaseService,
  ],
})
export class FirebaseModule {}
