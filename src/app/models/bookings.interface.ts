export interface BookingsList {
    bookings: Booking[];
}

export interface Booking {
    id:         number;
    fecha:      Fecha;
    hora:       Fecha;
    estado:     string;
    usuario_id: number;
}

export interface Fecha {
    date:          Date;
    timezone_type: number;
    timezone:      string;
}