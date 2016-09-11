import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/add/add.html'
})
export class AddPage {

    private cekJalan: Array<[Array<number>, Array<number>]>;     //array pertama untuk sta, lebar, tebal. aray kedua untuk tebalItem
    public jalanItem: [Array<number>, Array<number>];   //idem atas, untuk menyimpan sementara yang mau diinput
    public sta: number;
    public lebar: number;

    private tebal: number;
    public tebalItem: Array<number>;
    public tItem: number;
    
    
    constructor(private nav: NavController){
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));

        if(!this.cekJalan){
            this.cekJalan = [];
        }
        this.jalanItem = [[],[],[]];
        this.tebalItem = [];
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

    //fungsi penambahan input pengukuran tebal
    addTebal(){
        if(this.tItem != undefined){
            this.tebalItem.push(this.tItem);
        }
        this.tItem = undefined;
    }

    deleteTebal(i: number){
        this.tebalItem.splice(i, 1);
    }

    //fungsi menyimpan data yang diinput ke localStorage
    save(){
        this.addTebal();
        this.tebal = this.average(this.tebalItem);
        this.jalanItem = [[this.sta, this.lebar, this.tebal],this.tebalItem];
        if(this.lebar != 0 && this.tebal != 0){
            this.cekJalan.push(this.jalanItem);
            localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
            this.nav.pop();
        }
    }
}