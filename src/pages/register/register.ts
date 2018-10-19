import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { User } from '../../model/user';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(public afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
 async loginRe(user:User){
    try {
   const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
   if (result){
     this.navCtrl.push(TabsPage);
   }
   console.log(result);
   console.log(result.user.uid) 
  }
  catch(e){
    console.error(e);
  }
}
}
