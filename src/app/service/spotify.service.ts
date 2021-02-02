import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {

    constructor(private http: HttpClient) {}


    // Funcion para centralizar los query

    getQuery(query: string){

        const url = `https://api.spotify.com/v1/${query}`;

        const headers = new HttpHeaders({
            Authorization:
                'Bearer BQC-wtY-wzzMBBxkumU0-M92JODUSJexjlyluTFaHJVDGzR0nf3NJ1CUXTn5SXwcctdgDWOwMHDmknPHajo',
        });

        return this.http.get(url,{headers});
    }

    // Servicio para obtener nuevas canciones
    getNewRelases() {
       
        return this.getQuery('browse/new-releases').pipe(map(data => data['albums'].items));
       
       
        /* Otra forma de hacerlo 

         const headers = new HttpHeaders({
            Authorization:
                'Bearer BQDSCCWwFkLths5KN1Xx_yV4ySZmvSqr7TwZQjEkEjeXiqRY-HCq_WKs4apAOhZ-uIhlO2boA-P0Wa1ElE4',
        });
        
        return this.http
            .get('https://api.spotify.com/v1/browse/new-releases', {
                headers,
            })
            .pipe(map((data) => data['albums'].items)); */
    }   

    // Servicio para obtener artistas
    getArtistas(termino: string) {
        
        return this.getQuery(`search?q=${termino}&type=artist&limit=20`).pipe(map((data) => data['artists'].items));

    }


    // Servicio para obtener detalle de artista
    getArtist(id: string) {
        
        return this.getQuery(`artists/${id}`);

    }

    getTopTracks( id: string){

        return this.getQuery(`artists/${id}/top-tracks?market=ES`).pipe( map( data => data['tracks']));
        
    }
}
