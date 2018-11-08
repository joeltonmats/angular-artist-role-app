import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { Artist } from 'src/app/shared/artist';
import { Movie } from 'src/app/shared/movie';
import { ArtistImpl } from 'src/app/shared/artistImpl';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit, OnDestroy {

  public artist: Artist;
  public artistSelected: Artist;
  public isSuccess: boolean;

  artistsCollection: AngularFirestoreCollection<Artist>;
  artitsObservable: Observable<Artist[]>;
  artistSubscription: Subscription;

  moviesCollection: AngularFirestoreCollection<Movie>;
  moviesObservable: Observable<Movie[]>;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.artist = new ArtistImpl();
    this.loadArtists();
  }

  ngOnDestroy() {
    /* this.artistSubscription.unsubscribe(); */
  }


  public add() {
    if (this.artist.name && this.artist.name.length > 0) {

      this.isSuccess = false;
      const artistToSave: Artist = {
        name: this.artist.name,
        short_description: this.artist.short_description,
        description: this.artist.description,
        img: this.artist.img
      };

      this.artistsCollection.add(artistToSave)
        .then(() => {
          this.artist = new ArtistImpl();
          this.isSuccess = true;
        })
        .catch(err => alert(err));
    }
  }

  public edit() {
    this.isSuccess = false;

    const artistsCollection = this.afs.doc(`artists/${this.artist['id']}`);
    const artistToSave: Artist = {
      name: this.artist.name,
      short_description: this.artist.short_description,
      description: this.artist.description,
      img: this.artist.img
    };

    artistsCollection
      .update(artistToSave)
      .then(() => {
        this.isSuccess = true;
        this.artist = new ArtistImpl();
      })
      .catch(err => console.log(err));
  }

  public onClickArtist(artist: Artist) {
    this.artistSelected = artist;
    this.artist = artist;
  }

  public randomColor() {
    const number = Math.floor(Math.random() * 15) + 1;
    const isEnabled = true;

    switch (number) {
      case 1:
        return { 'Blue-Grey': isEnabled };
      case 2:
        return { 'Grey': isEnabled };
      case 3:
        return { 'Brown': isEnabled };
      case 4:
        return { 'Deep-Orange': isEnabled };
      case 5:
        return { 'Orange': isEnabled };
      case 6:
        return { 'Amber': isEnabled };
      case 7:
        return { 'Yellow': isEnabled };
      case 8:
        return { 'Lime': isEnabled };
      case 9:
        return { 'Light-Green': isEnabled };
      case 10:
        return { 'Green': isEnabled };
      case 11:
        return { 'Teal': isEnabled };
      case 12:
        return { 'Light-Blue': isEnabled };
      case 13:
        return { 'Blue': isEnabled };
      case 14:
        return { 'Deep-Purple': isEnabled };
      case 15:
        return { 'Pink': isEnabled };
      default:
        return { 'Black': isEnabled };
    }
  }

  private loadArtists() {
    this.artistsCollection = this.afs.collection('artists');
    this.artitsObservable = this.artistsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    // this.artitsObservable = this.artistsCollection.valueChanges();
    // this.artistSubscription = this.artitsObservable.subscribe(artists => {console.log('=========== artists =============', artists);});
  }

  /*  private joinDocuments(artist: Artist) {
     if (artist.name.toLowerCase() === 'robert de niro'.toLowerCase()) {
       this.moviesCollection = this.afs.collection('movies');
       this.moviesObservable = this.moviesCollection.snapshotChanges().pipe(
         map(actions => actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         }))
       );
       this.moviesObservable.subscribe(movie => {
         console.log("moviw", movie);
       });
     }
   } */

}
