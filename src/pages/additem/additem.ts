import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Thitem } from '../../model/item';
import { HomePage } from '../home/home';

/**
 * Generated class for the AdditemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html',
})
export class AdditemPage {
  thitem = {} as Thitem
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public afdb:AngularFireDatabase ,public afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditemPage');
  }


  createitem(){


    this.afAuth.authState.take(1).subscribe(auth =>{
      this.afdb.list(`/Post/${auth.uid}`).push(this.thitem)
      .then(() => this.navCtrl.setRoot(HomePage))
    })
  }

}
