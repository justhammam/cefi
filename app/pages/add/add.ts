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
    private staBefore: number;
    public lebar: number;
    private lebarBefore: number;

    private tebal: number;
    private tebalBefore: number;
    public tebalItem: Array<number>;
    public tItem: number;
    
    private panjang: number;
    private avLebar: number;
    private avTebal: number; 
    public volume: number;
    
    constructor(private nav: NavController){
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));

        if(!this.cekJalan){
            this.cekJalan = [];
        }
        this.jalanItem = [[],[]];
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
        let n = this.cekJalan.length;
        if(n < 1){
            this.panjang = 0;
            this.avLebar = 0;
            this.avTebal = 0;
            this.volume = 0;
            this.staBefore = 0;
            this.lebarBefore = 0;
            this.tebalBefore = 0;
        }
        if(n >= 1){
            this.staBefore = this.cekJalan[n-1][0][0];
            this.lebarBefore = this.cekJalan[n-1][0][1];
            this.tebalBefore = this.cekJalan[n-1][0][2];

            this.panjang = this.sta - this.staBefore;
            this.avLebar = ((1*this.lebar) + (1*this.lebarBefore))/2;
            this.avTebal = ((1*this.tebal) + (1*this.tebalBefore))/2;
            this.volume = this.panjang*this.avLebar*(this.avTebal/100);
        }
        this.jalanItem = [[this.sta, this.lebar, this.tebal, 
          this.panjang, this.avLebar, this.avTebal, this.volume,
          this.staBefore, this.lebarBefore, this.tebalBefore],this.tebalItem];
        if(this.lebar != 0 && this.tebal != 0){
            this.cekJalan.push(this.jalanItem);
            localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
            this.nav.pop();
        }
    }
}