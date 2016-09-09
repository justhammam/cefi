import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/add/add.html'
})
export class AddPage {

    private cekJalan: Array<[Array<number>, Array<number>]>; 
    //sta, lebar, tebal, panjang, av lebar, av tebal, volume, staBefore, lebarBefore, tebalBefore, tebalItem
    public jalanItem: [Array<number>, Array<number>];
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

    sum(ukuran: number[]){
        let sum = 0;
        for (let i = 0; i < ukuran.length; i++) {
            sum = (sum*1) + (ukuran[i]*1);
        }
        return sum;
    }

    average(angka: number[]){
        let average = this.sum(angka)/angka.length;
        return average;        
    }

    addTebal(){
        if(this.tItem != undefined){
            this.tebalItem.push(this.tItem);
        }
        this.tItem = undefined;
    }

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