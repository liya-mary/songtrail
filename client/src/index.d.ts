declare module '*.png';

interface Tag {
     artist: string;
     coordinates: number[];
     src: string;
     timestamp: number;
     title: string;
}

interface Track {
     name: string;
     artists: { name: string; }[];
     artist: string;
     album: { images: { url: string }[] };
     id: number;
     uri: string;
   }