import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddPage} from "../add/add";

@Component({
    templateUrl: 'build/pages/cekjalan/cekjalan.html'
})
export class CekJalanPage {

    public cekJalan: Array<[string, number, number, number, number]>;

    constructor(private nav: NavController) {}

    onPageDidEnter(){
        this.cekJalan = JSON.parse(localStorage.getItem("cekjalan"));
        if(!this.cekJalan){
            this.cekJalan = [];
        }
    }

    delete(index: number){
        this.cekJalan.splice(index, 1);
        localStorage.setItem("cekjalan", JSON.stringify(this.cekJalan));
    }

    add(){
        this.nav.push(AddPage);
    }
}