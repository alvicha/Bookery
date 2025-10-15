export interface Books {
    results: BookInfo[];
}

export interface BookInfo {
    id:               number;
    titulo:           string;
    autor:            string;
    editorial:        string;
    anyo_publicacion: string;
    descripcion:      string;
    imagen:           string;
    isbn:             string;
    num_paginas:      number;
    idioma:           string;
    precio:           number;
}