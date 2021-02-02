import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/service/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  loading: boolean;
  artist: any = {};
  topTracks: any[] = [];

  constructor( private router: ActivatedRoute, private spotify: SpotifyService) {
    
    this.loading = true;
    this.router.params.subscribe( ( params ) => {

      this.getArtist(params['id']);
      this.getTopTrack(params['id']);
      
    });

  }

  getArtist( id: any){

   this.spotify.getArtist(id).subscribe(
      artista => { 
        this.artist = artista;
        this.loading = false;
       });
      
  }

  getTopTrack( id: string ){

    this.spotify.getTopTracks( id )
      .subscribe( topTracks => {
        this.topTracks = topTracks;    
    })
    
  }

  ngOnInit() {
  }

  

}
