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

    private cekJalan: Array<[Array<number>, Array<number>]>;  //array pertama untuk sta, lebar, tebal. aray kedua untuk tebalItem
    public jalanItem: [Array<number>, Array<number>];   //idem atas, untuk menyimpan sementara yang mau diinput
    public sta: number;
    public lebar: number;

    private tebal: number;
    public tebalItem: Array<number>;
    public tItem: number;
    private index: number; 

    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));
        
        this.index = this.navParams.get('index');    //mengambil nomor index yang mau diedit
        this.value();
   }

   //fungsi memasukkan value yang terekam ke form edit 
    value(){
        this.tebalItem = this.cekJalan[this.index][1];  
        [this.sta, this.lebar, this.tebal] = this.cekJalan[this.index][0];
        this.jalanItem = [[this.sta, this.lebar, this.tebal],this.tebalItem];
    }

    //fungsi menjumlahkan array
    sum(ukuran: number[]){
        let sum = 0;
        for (let i = 0; i < ukuran.length; i++) {
            sum = (sum*1) + (ukuran[i]*1);
        }
        return sum;
    }

    //fungsi menghitung rata2 array
    average(angka: number[]){
        let average = this.sum(angka)/angka.length;
        return average;        
    }

   //fungsi mengganti record terkait
   update(){
        this.addTebal();
        this.tebal = this.average(this.tebalItem);
        this.jalanItem = [[this.sta, this.lebar, this.tebal],this.tebalItem];
        this.cekJalan.splice(this.index, 1, this.jalanItem);
        localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
        this.navCtrl.pop();
   }

   //fungsi menambah input tebal
   addTebal(){
        if(this.tItem != undefined){
            this.tebalItem.push(this.tItem);
        }
        this.tItem = undefined;
    }

    //fungsi menghapus record terkait
    delete(){
      this.cekJalan.splice(this.index, 1);
      localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
      this.navCtrl.pop();
    }

    //fungsi menghapus input tebal 
    deleteTebal(){}
}
