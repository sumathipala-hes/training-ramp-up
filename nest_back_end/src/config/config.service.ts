import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import serviceAccount from './firebase.config.json';

@Injectable()
export class ConfigService {
  private readonly serviceAccount: admin.ServiceAccount;

  constructor() {
    // Load Firebase service account credentials
    this.serviceAccount = serviceAccount as admin.ServiceAccount;
  }

  getFirebaseAdminConfig(): admin.ServiceAccount {
    return this.serviceAccount;
  }
}
