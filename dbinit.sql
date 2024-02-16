CREATE TABLE Color (
    id SERIAL PRIMARY KEY,
    nombre_color VARCHAR(255) NOT NULL,
    codigo_color VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    state BOOLEAN NOT NULL
);

CREATE TABLE MotosMarca (
    id SERIAL PRIMARY KEY,
    nombre_marca VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    state BOOLEAN NOT NULL
);

CREATE TABLE MotosTransmision (
    id SERIAL PRIMARY KEY,
    nombre_transmision VARCHAR(255) NOT NULL,
    tipo_filtro VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL
);


CREATE TABLE MotosFreno (
    id SERIAL PRIMARY KEY,
    nombre_freno VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    state BOOLEAN NOT NULL
);


CREATE TABLE MotosSuspension (
    id SERIAL PRIMARY KEY,
    nombre_suspension VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    state BOOLEAN NOT NULL
);

CREATE TABLE MotosTipoArranque (
    id SERIAL PRIMARY KEY,
    nombre_tipo_arranque VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    state BOOLEAN NOT NULL
);



CREATE TABLE Moto (
    id SERIAL PRIMARY KEY,
    id_api INT,
    nombre VARCHAR(255) NOT NULL,
    descripcion_corta VARCHAR(255) NOT NULL,
    url_img_header VARCHAR(255),
    modelo INT NOT NULL,
    url_foto VARCHAR(255),
    precio_moto NUMERIC(10,2) NOT NULL,
    precio_papeles NUMERIC(10,2) NOT NULL,
    id_estilo INT NOT NULL,
    cilindraje INT NOT NULL,
    tipo_motor VARCHAR(255) NOT NULL,
    potencia_maxima_hp INT NOT NULL,
    potencia_maxima_rpm INT NOT NULL,
    torque_maximo_nm INT NOT NULL,
    torque_maximo_rpm INT NOT NULL,
    relacion_compresion VARCHAR(255) NOT NULL,
    id_tipo_transmision INT REFERENCES MotosTransmision(id),
    rueda_delantera VARCHAR(255) NOT NULL,
    rueda_trasera VARCHAR(255) NOT NULL,
    dimension_total VARCHAR(255) NOT NULL,
    distancia_entre_ejes VARCHAR(255) NOT NULL,
    peso NUMERIC(10,2) NOT NULL,
    id_freno_delantero INT REFERENCES MotosFreno(id),
    id_freno_trasero INT REFERENCES MotosFreno(id),
    id_suspension_delantera INT REFERENCES MotosSuspension(id),
    id_suspension_trasera INT REFERENCES MotosSuspension(id),
    id_arranque INT REFERENCES MotosTipoArranque(id),
    certificacion VARCHAR(255) NOT NULL,
    url_fotos_360 VARCHAR(255) NOT NULL,
    mostrar_ocultar BOOLEAN NOT NULL,
    slug_moto VARCHAR(255) NOT NULL,
    seo_titulo VARCHAR(255) NOT NULL,
    seo_descripcion VARCHAR(255) NOT NULL,
    canAdvance BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_marca INT REFERENCES MotosMarca(id)
);

CREATE TABLE MotoColor (
    id SERIAL PRIMARY KEY,
    url_foto_color_peque VARCHAR(255),
    url_foto_color_grande VARCHAR(255),
    id_moto INT REFERENCES Moto(id),
    id_color INT REFERENCES Color(id)
);



