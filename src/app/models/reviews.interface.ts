export interface ReviewsList {
    reviews: Review[];
}

export interface Review {
    id:          number;
    fecha:       Date;
    puntuacion:  number;
    comentarios: string;
    usuario:     number;
    libro:       number;
}
