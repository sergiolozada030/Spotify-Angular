import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: [],
})
export class HomeComponent implements OnInit {

    // Constantes
    mensaje: any = 'Algo salío mal, '

    nuevasCanciones: any[] = [];
    loading: boolean;
    error: boolean;
    msjError: any;

    constructor(private spotify: SpotifyService) {

        this.loading = true;
        this.error = false;

        this.spotify.getNewRelases().subscribe((data: any) => {
            this.nuevasCanciones = data;
            this.loading = false;
        }, ( err ) => {

            this.loading = false;
            this.error = true;
            this.msjError = err.error.error.message;
               
        });
    }

    ngOnInit() {}
}
