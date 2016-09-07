import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/add/add.html'
})
export class AddPage {

    private cekJalan: Array<[string, number, number, number, number]>;
    public jalanItem: [string, number, number, number, number];
    public sta: string;
    public panjang: number;
    public lebar: number;
    public tebal: number;
    public volume: number;

    constructor(private nav: NavController){
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));
        if(!this.cekJalan){
            this.cekJalan = [];
        }
        this.jalanItem = ["", 0, 0, 0, 0];
    }

    avarage(){
        
    }

    save(){
        this.volume = this.panjang*this.lebar*(this.tebal/100);
        this.jalanItem = [this.sta, this.panjang, this.lebar, this.tebal, this.volume];
        if(this.jalanItem != ["", 0, 0, 0, 0]){
            this.cekJalan.push(this.jalanItem);
            localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
            this.nav.pop();
        }
    }
}