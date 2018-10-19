import { Component } from '@angular/core';


import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireAuth }  from 'angularfire2/auth';
import { AngularFireDatabase ,AngularFireList ,AngularFireAction } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';
import { AdditemPage } from '../additem/additem';

import { ShowpagePage } from '../showpage/showpage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  itemsRef: AngularFireList<any>;
  employees: Observable<any[]>;
  
  
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>; //added
  size$: BehaviorSubject<string|null>;//added


  constructor(private toast:ToastController, public afAuth:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,public af: AngularFireDatabase ) {

      this.itemsRef =  af.list(`/Post`)
      this.employees = this.itemsRef.valueChanges() ;
   
   //added
   this.afAuth.authState.take(1).subscribe(auth =>{
      this.size$ = new BehaviorSubject(null); //added
      this.items$ = this.size$.switchMap(size =>  //added
        this.af.list(`/Post/${auth.uid}`, ref =>  //added
          size ? ref.orderByChild('size').equalTo(size) : ref  //added
        ).snapshotChanges() //added
      );
    
      this.items$.subscribe(actions => {
       actions.forEach(action => {
         // console.log(action.type);
         // console.log(action.key);
         console.log(action.payload.val());
       })  ; 
    
     });

    })


  }
  ionViewDidLoad(){
    // console.log('ionViewDidLoad HomePage');

    // this.afAuth.authState.subscribe(data => {
    //   if(data && data.email && data.uid){
    //     this.toast.create({
    //       message: 'Wellcom,'+data.email,
    //       duration:3500
    //     }).present();
    // }else{
    //   this.toast.create({
    //     message: 'NO authentication',
    //     duration:3500
    //   }).present();
    // }
    // });

    console.log(this.afAuth.auth.currentUser.toJSON); 

    
  }


  itemSelected(key, firstName, lastName, country, city, phone, salary, email){
    // console.log(key, firstName, lastName, country, city, phone, salary, email);
    this.navCtrl.push(ShowpagePage,{
      key : key,
      firstName : firstName,
      lastName : lastName,
      country : country,
      city : city , 
      phone : phone , 
      salary : salary , 
      email : email 
          });
   }

   GoToAddPage(){
     this.navCtrl.setRoot(AdditemPage);
   }


}
