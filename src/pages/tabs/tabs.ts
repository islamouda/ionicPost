import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AdditemPage } from '../additem/additem';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private toast:ToastController, public afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {

  }


}
