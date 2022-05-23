import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { User } from './User';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: User[] = [];

  constructor(private platform: Platform) {}

  async myCreateConnection() {
    try {
      if(!this.platform.is('cordova')) {
        await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            User
          ],
        });
      } else {
        console.log("CONEXÃO CORDOVA")
        await createConnection({
          type: 'cordova',
          database: 'myCustomDB',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            User
          ],
        });
      }
      
    } catch (e) {
      alert(JSON.stringify(e))
    }
      
    }
  
    async insert() {
      const user = new User();
      user.name = new Date().getTime().toString();
      await getConnection().manager.save(user);
    }
  
    async getAllUsers() {
      try {
        console.log( await getRepository(User).find({}) )
        this.users = await getRepository(User).find({});    
      } catch (e) {
        alert(JSON.stringify(e))
      }
    }

}
