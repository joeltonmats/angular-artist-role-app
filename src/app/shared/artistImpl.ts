import { Artist } from 'src/app/shared/artist';

export class ArtistImpl implements Artist {
    name: string;
    short_description: string;
    description: string;
    img: string;

    constructor() { }
}
