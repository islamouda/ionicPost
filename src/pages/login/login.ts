import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user'
import { RegisterPage } from '../register/register';
import { AngularFireAuth }  from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  async login(user:User){
    try {
   const result = this.afAuth.auth.signInWithEmailAndPassword(user.email ,user.password);
   if (result){
    this.navCtrl.push(TabsPage);
  }
   console.log(this.afAuth.auth.currentUser.uid); 
  }
  catch(e){
    console.error(e);
  }
}

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
