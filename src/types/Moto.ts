interface Color {
    id: number;
    nombre_color: string;
    codigo_color: string;
    slug: string | null;
    state: boolean;
}

interface MotoColor {
    id: number;
    url_foto_color_peque: string | null;
    url_foto_color_grande: string | null;
    id_moto: number;
    id_color: number;
    Colore: Color;
}

interface MotosMarca {
    id: number;
    nombre_marca: string;
    slug: string;
    state: boolean;
}

interface MotosTransmision {
    id: number;
    nombre_transmision: string;
    tipo_filtro: string;
    slug: string;
}

interface MotosFreno {
    id: number;
    nombre_freno: string;
    slug: string;
    state: boolean;
}

interface MotosSuspension {
    id: number;
    nombre_suspension: string;
    slug: string;
    state: boolean;
}

interface MotosTipoArranque {
    id: number;
    nombre_tipo_arranque: string;
    slug: string;
    state: boolean;
}

export interface Moto {
    id: number;
    id_api: number | null;
    nombre: string;
    descripcion_corta: string;
    url_img_header: string | null;
    modelo: number;
    url_foto: string | null;
    precio_moto: number;
    precio_papeles: number;
    id_estilo: number;
    cilindraje: number;
    tipo_motor: string;
    potencia_maxima_hp: number;
    potencia_maxima_rpm: number;
    torque_maximo_nm: number;
    torque_maximo_rpm: number;
    relacion_compresion: string;
    id_tipo_transmision: number;
    rueda_delantera: string;
    rueda_trasera: string;
    dimension_total: string;
    distancia_entre_ejes: string;
    peso: number;
    id_freno_delantero: number;
    id_freno_trasero: number;
    id_suspension_delantera: number;
    id_suspension_trasera: number;
    id_arranque: number;
    certificacion: string;
    url_fotos_360: string;
    mostrar_ocultar: boolean;
    slug_moto: string;
    seo_titulo: string;
    seo_descripcion: string;
    canAdvance: boolean;
    createdAt: string;
    updatedAt: string;
    id_marca: number;
    MotosColores: MotoColor[];
    MotosMarca: MotosMarca;
    MotosTransmision: MotosTransmision;
    MotosFrenoDelantero: MotosFreno;
    MotosFrenoTrasero: MotosFreno;
    MotosSuspensionDelantera: MotosSuspension;
    MotosSuspensionTrasera: MotosSuspension;
    MotosTipoArranque: MotosTipoArranque;
}
