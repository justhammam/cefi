import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/edit/edit.html',
})
export class EditPage {

    private cekJalan: Array<[Array<number>, Array<number>]>; 
    //sta, lebar, tebal, tebalItem
    public jalanItem: [Array<number>, Array<number>];
    public sta: number;
    public lebar: number;

    private tebal: number;
    public tebalItem: Array<number>;
    public tItem: number;
    private index: number; 

    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));

        if(!this.cekJalan){
            this.cekJalan = [];
        }
        this.index = navParams.get('index');
        this.tebalItem = this.cekJalan[this.index][1];
        [this.sta, this.lebar, this.tebal] = this.cekJalan[this.index][0];
        this.jalanItem = [[this.sta, this.lebar, this.tebal],this.tebalItem];        
   }

   update(index: number){
      this.jalanItem = [[this.sta, this.lebar, this.tebal],this.tebalItem];
      index = this.index
      this.cekJalan.splice(index, 1, this.jalanItem);
      localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
      this.navCtrl.pop();
   }

   addTebal(){
        if(this.tItem != undefined){
            this.tebalItem.push(this.tItem);
        }
        this.tItem = undefined;
    }

   delete(index: number){
      index = this.index
      this.cekJalan.splice(index, 1);
      localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
      this.navCtrl.pop();
   }

}
