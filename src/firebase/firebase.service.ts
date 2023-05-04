import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE } from './firebase.constants';
import { AppFirebase, AppFirebaseMessage } from './types/app-firebase.type';

@Injectable()
export class FirebaseService {
  private readonly messageService: AppFirebaseMessage;
  constructor(@Inject(FIREBASE) private readonly firebase: AppFirebase) {
    this.messageService = firebase.messaging();
  }
}
