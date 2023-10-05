import { test as setup, expect, type Page } from '@playwright/test';
import {STORAGE_STATE} from './playwright.config';
import dotenv from 'dotenv';

dotenv.config();
setup('authenticate', async ({ request }) => {
  // Send authentication request. 
  await request.post('auth/login', {
    data: {
      'user': process.env.UserName,
      'password': process.env.Password
    }
  });
  await request.storageState({ path: STORAGE_STATE });
});