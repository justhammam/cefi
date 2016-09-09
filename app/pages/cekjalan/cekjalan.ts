import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddPage} from "../add/add";

@Component({
    templateUrl: 'build/pages/cekjalan/cekjalan.html'
})
export class CekJalanPage {

    public cekJalan: Array<[Array<number>, Array<number>]>;
    public total: number;
    constructor(private nav: NavController) {}

    onPageDidEnter(){
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));
        if(!this.cekJalan){
            this.cekJalan = [];
        }
        this.total = this.volume();         
    }

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

    delete(index: number){
        this.cekJalan.splice(index, 1);
        localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
        this.total = this.volume();
    }

    add(){
        this.nav.push(AddPage);
    }
}