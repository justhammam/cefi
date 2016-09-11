import { EditPage } from './../edit/edit';
import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
import { AlertController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/cekjalan/cekjalan.html'
})
export class CekJalanPage {

    public cekJalan: Array<[Array<number>, Array<number>]>; //array satu mau diisi sta, lebar, tebal. array kedua opsi tebal lebih dari satu
    public total: number; //menyimpan nilai total Volume
    public leng : number; //menyimpan panjang array cekJalan, untuk memunculkan petunjuk penggunaan.
    
    constructor(private nav: NavController, public alertCtrl: AlertController) {}

    onPageDidEnter(){
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));
        if(!this.cekJalan){
            this.cekJalan = [];
        }
        this.total = this.volume();
        this.leng = this.cekJalan.length;
    }

    //fungsi menghitung total volume
    volume(){
        let sum = 0;
        for (let i = 1; i < this.cekJalan.length; i++) {
            let p = this.cekJalan[i][0][0] - this.cekJalan[i-1][0][0];
            let l = ((1*this.cekJalan[i][0][1]) + (1*this.cekJalan[i-1][0][1]))/2;
            let t = ((1*this.cekJalan[i][0][2]) + (1*this.cekJalan[i-1][0][2]))/2;
            sum = (sum*1) + (p*l*(t/100));
        }
        return sum;
    }

    //fungsi navigasi ke halaman untuk menambah record
    add(){
        this.nav.push(AddPage);
    }
    
    
    //fungsi navigasi ke halaman edit. index untuk menyimpan index dari yang mau diedit.
    edit(index: number){
        this.nav.push(EditPage, {
            index : index
        });
    }

    //fungsi menghapus seluruh record
    deleteAll() {
        let confirm = this.alertCtrl.create({
        title: 'Hapus Semua?',
        message: 'Anda akan menghapus semua data. Hal ini perlu jika Anda ingin mengukur jalan yang lain. Apakah Anda setuju?',
        buttons: [
            {
            text: 'Tidak',
            handler: () => {
            }
            },
            {
            text: 'Setuju',
            handler: () => {
                this.cekJalan.splice(0, this.leng);
                localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
                this.leng = this.cekJalan.length;
            }
            }
        ]
        });
        confirm.present();
    }
  
}