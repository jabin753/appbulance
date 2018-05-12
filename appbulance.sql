--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

-- Started on 2018-05-12 11:38:12 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2297 (class 1262 OID 25784)
-- Name: appbulance; Type: DATABASE; Schema: -; Owner: appbulance
--

CREATE DATABASE appbulance WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE appbulance OWNER TO appbulance;

\connect appbulance

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 10 (class 2615 OID 34095)
-- Name: administracion; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA administracion;


ALTER SCHEMA administracion OWNER TO appbulance;

--
-- TOC entry 8 (class 2615 OID 34093)
-- Name: configuraciones; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA configuraciones;


ALTER SCHEMA configuraciones OWNER TO appbulance;

--
-- TOC entry 12 (class 2615 OID 34101)
-- Name: pacientes; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA pacientes;


ALTER SCHEMA pacientes OWNER TO appbulance;

--
-- TOC entry 9 (class 2615 OID 34094)
-- Name: perfiles; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA perfiles;


ALTER SCHEMA perfiles OWNER TO appbulance;

--
-- TOC entry 11 (class 2615 OID 34096)
-- Name: peticiones; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA peticiones;


ALTER SCHEMA peticiones OWNER TO appbulance;

--
-- TOC entry 1 (class 3079 OID 12395)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2300 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 226 (class 1255 OID 34217)
-- Name: newconfiguration(integer); Type: FUNCTION; Schema: configuraciones; Owner: appbulance
--

CREATE FUNCTION configuraciones.newconfiguration(id_usr integer) RETURNS integer
    LANGUAGE plpgsql
    AS $_$
BEGIN
         INSERT INTO configuraciones.navegacion(id_usr,nav_style,body_style)
         VALUES($1,DEFAULT,DEFAULT);
    RETURN $1;
END;
$_$;


ALTER FUNCTION configuraciones.newconfiguration(id_usr integer) OWNER TO appbulance;

--
-- TOC entry 227 (class 1255 OID 34219)
-- Name: adduserpacientes(json); Type: FUNCTION; Schema: perfiles; Owner: appbulance
--

CREATE FUNCTION perfiles.adduserpacientes(datos json) RETURNS integer
    LANGUAGE sql
    AS $$

INSERT INTO perfiles.pacientes(
tipo_usr,
email_usr,
contrasena_usr,
telefono_usr,
nombre_prs,
fecha_registro_usr,
apellido_paterno_prs,
apellido_materno_prs,
sexo_prs,
fecha_nacimiento_prs,
ocupacion_prs,
id_p,
tipo_sangre_p
) VALUES (
2,
json_extract_path_text(datos, 'email_usr'::character varying),
md5(json_extract_path_text(datos, 'contrasena_usr')::character varying),
json_extract_path_text(datos, 'telefono_usr')::character varying,
json_extract_path_text(datos, 'nombre_prs')::character varying,
now(),
json_extract_path_text(datos, 'apellido_paterno_prs')::character varying,
json_extract_path_text(datos, 'apellido_materno_prs')::character varying,
json_extract_path_text(datos, 'sexo_prs')::character varying,
json_extract_path_text(datos, 'fecha_nacimiento_prs')::date,
json_extract_path_text(datos, 'ocupacion_prs')::character varying,
DEFAULT,
json_extract_path_text(datos, 'tipo_sangre_p')::character varying
);

INSERT INTO configuraciones.navegacion(id_usr) VALUES(currval('perfiles.usuarios_id_usr_seq'::regclass))
RETURNING id_usr
$$;


ALTER FUNCTION perfiles.adduserpacientes(datos json) OWNER TO appbulance;

--
-- TOC entry 225 (class 1255 OID 34231)
-- Name: authuser(json); Type: FUNCTION; Schema: perfiles; Owner: appbulance
--

CREATE FUNCTION perfiles.authuser(datos json) RETURNS integer
    LANGUAGE sql
    AS $$
SELECT id_usr FROM perfiles.usuarios WHERE 
email_usr = json_extract_path_text(datos, 'email') AND contrasena_usr = md5(json_extract_path_text(datos, 'contra')) 
$$;


ALTER FUNCTION perfiles.authuser(datos json) OWNER TO appbulance;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 187 (class 1259 OID 25798)
-- Name: ambulancias; Type: TABLE; Schema: administracion; Owner: appbulance
--

CREATE TABLE administracion.ambulancias (
    id_a integer NOT NULL,
    num_placa_a character varying(10),
    num_economico_a character varying(20),
    id_cm integer NOT NULL,
    estado_a integer DEFAULT 0 NOT NULL,
    posicion_actual_a point[],
    CONSTRAINT estado_a_chk CHECK ((estado_a = ANY (ARRAY[0, 1, 2, 3])))
);


ALTER TABLE administracion.ambulancias OWNER TO appbulance;

--
-- TOC entry 186 (class 1259 OID 25796)
-- Name: ambulancias_id_a_seq; Type: SEQUENCE; Schema: administracion; Owner: appbulance
--

CREATE SEQUENCE administracion.ambulancias_id_a_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE administracion.ambulancias_id_a_seq OWNER TO appbulance;

--
-- TOC entry 2301 (class 0 OID 0)
-- Dependencies: 186
-- Name: ambulancias_id_a_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: appbulance
--

ALTER SEQUENCE administracion.ambulancias_id_a_seq OWNED BY administracion.ambulancias.id_a;


--
-- TOC entry 212 (class 1259 OID 34201)
-- Name: navegacion; Type: TABLE; Schema: configuraciones; Owner: appbulance
--

CREATE TABLE configuraciones.navegacion (
    id_usr integer NOT NULL,
    nav_style character varying(50) DEFAULT 'navbar-dark bg-dark'::character varying,
    body_style character varying(50) DEFAULT 'bg-dark'::character varying,
    CONSTRAINT body_chk CHECK (((body_style)::text = ANY ((ARRAY['bg-dark'::character varying, ' bg-light'::character varying])::text[]))),
    CONSTRAINT navbar_chk CHECK (((nav_style)::text = ANY ((ARRAY['navbar-dark bg-dark'::character varying, 'navbar-light bg-light'::character varying])::text[])))
);


ALTER TABLE configuraciones.navegacion OWNER TO appbulance;

--
-- TOC entry 205 (class 1259 OID 34136)
-- Name: alergias; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.alergias (
    id integer NOT NULL,
    descripcion_alergia text,
    id_p integer
);


ALTER TABLE pacientes.alergias OWNER TO appbulance;

--
-- TOC entry 204 (class 1259 OID 34134)
-- Name: alergias_id_seq; Type: SEQUENCE; Schema: pacientes; Owner: appbulance
--

CREATE SEQUENCE pacientes.alergias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pacientes.alergias_id_seq OWNER TO appbulance;

--
-- TOC entry 2302 (class 0 OID 0)
-- Dependencies: 204
-- Name: alergias_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.alergias_id_seq OWNED BY pacientes.alergias.id;


--
-- TOC entry 203 (class 1259 OID 34120)
-- Name: enfermedad_cardiovascular; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.enfermedad_cardiovascular (
    id integer NOT NULL,
    descripcion_ecardio text,
    id_p integer
);


ALTER TABLE pacientes.enfermedad_cardiovascular OWNER TO appbulance;

--
-- TOC entry 202 (class 1259 OID 34118)
-- Name: enfermedad_cardiovascular_id_seq; Type: SEQUENCE; Schema: pacientes; Owner: appbulance
--

CREATE SEQUENCE pacientes.enfermedad_cardiovascular_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pacientes.enfermedad_cardiovascular_id_seq OWNER TO appbulance;

--
-- TOC entry 2303 (class 0 OID 0)
-- Dependencies: 202
-- Name: enfermedad_cardiovascular_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.enfermedad_cardiovascular_id_seq OWNED BY pacientes.enfermedad_cardiovascular.id;


--
-- TOC entry 209 (class 1259 OID 34168)
-- Name: medicamentos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.medicamentos (
    id integer NOT NULL,
    descripcion_medicamento text,
    id_p integer
);


ALTER TABLE pacientes.medicamentos OWNER TO appbulance;

--
-- TOC entry 208 (class 1259 OID 34166)
-- Name: medicamentos_id_seq; Type: SEQUENCE; Schema: pacientes; Owner: appbulance
--

CREATE SEQUENCE pacientes.medicamentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pacientes.medicamentos_id_seq OWNER TO appbulance;

--
-- TOC entry 2304 (class 0 OID 0)
-- Dependencies: 208
-- Name: medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.medicamentos_id_seq OWNED BY pacientes.medicamentos.id;


--
-- TOC entry 207 (class 1259 OID 34152)
-- Name: padecimientos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.padecimientos (
    id integer NOT NULL,
    descripcion_padecimiento text,
    id_p integer
);


ALTER TABLE pacientes.padecimientos OWNER TO appbulance;

--
-- TOC entry 206 (class 1259 OID 34150)
-- Name: padecimientos_id_seq; Type: SEQUENCE; Schema: pacientes; Owner: appbulance
--

CREATE SEQUENCE pacientes.padecimientos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pacientes.padecimientos_id_seq OWNER TO appbulance;

--
-- TOC entry 2305 (class 0 OID 0)
-- Dependencies: 206
-- Name: padecimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.padecimientos_id_seq OWNED BY pacientes.padecimientos.id;


--
-- TOC entry 211 (class 1259 OID 34184)
-- Name: seguro_medico; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.seguro_medico (
    id integer NOT NULL,
    descripcion_seguro_medico text,
    id_p integer
);


ALTER TABLE pacientes.seguro_medico OWNER TO appbulance;

--
-- TOC entry 210 (class 1259 OID 34182)
-- Name: seguro_medico_id_seq; Type: SEQUENCE; Schema: pacientes; Owner: appbulance
--

CREATE SEQUENCE pacientes.seguro_medico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pacientes.seguro_medico_id_seq OWNER TO appbulance;

--
-- TOC entry 2306 (class 0 OID 0)
-- Dependencies: 210
-- Name: seguro_medico_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.seguro_medico_id_seq OWNED BY pacientes.seguro_medico.id;


--
-- TOC entry 189 (class 1259 OID 25811)
-- Name: usuarios; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.usuarios (
    id_usr integer NOT NULL,
    email_usr character varying(100) NOT NULL,
    telefono_usr character varying(13),
    contrasena_usr character varying(255) NOT NULL,
    tipo_usr integer,
    fecha_registro_usr date,
    fecha_ultimo_acceso_usr date,
    ip_ultimo_acceso_usr character varying(15)
);


ALTER TABLE perfiles.usuarios OWNER TO appbulance;

--
-- TOC entry 2307 (class 0 OID 0)
-- Dependencies: 189
-- Name: COLUMN usuarios.tipo_usr; Type: COMMENT; Schema: perfiles; Owner: appbulance
--

COMMENT ON COLUMN perfiles.usuarios.tipo_usr IS '
1: Para CRUMS
2: Para pacientes
3: Para Tamps';


--
-- TOC entry 191 (class 1259 OID 25819)
-- Name: crums; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.crums (
    id_cm integer NOT NULL,
    nombre_cm character varying(80),
    direccion_cm character varying(50),
    coordenadas_cm point,
    rango_servicio_cm point[]
)
INHERITS (perfiles.usuarios);


ALTER TABLE perfiles.crums OWNER TO appbulance;

--
-- TOC entry 190 (class 1259 OID 25817)
-- Name: crums_id_cm_seq; Type: SEQUENCE; Schema: perfiles; Owner: appbulance
--

CREATE SEQUENCE perfiles.crums_id_cm_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perfiles.crums_id_cm_seq OWNER TO appbulance;

--
-- TOC entry 2308 (class 0 OID 0)
-- Dependencies: 190
-- Name: crums_id_cm_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.crums_id_cm_seq OWNED BY perfiles.crums.id_cm;


--
-- TOC entry 193 (class 1259 OID 25831)
-- Name: personas; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.personas (
    id_prs integer NOT NULL,
    nombre_prs character varying(50) NOT NULL,
    apellido_paterno_prs character varying(50) NOT NULL,
    apellido_materno_prs character varying(50) NOT NULL,
    fecha_nacimiento_prs date,
    sexo_prs character(1),
    ocupacion_prs text,
    CONSTRAINT sexo_chk CHECK ((sexo_prs = ANY (ARRAY['M'::bpchar, 'F'::bpchar])))
)
INHERITS (perfiles.usuarios);


ALTER TABLE perfiles.personas OWNER TO appbulance;

--
-- TOC entry 195 (class 1259 OID 25844)
-- Name: pacientes; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.pacientes (
    id_p integer NOT NULL,
    tipo_sangre_p character varying(3),
    CONSTRAINT tipo_sangre_chk CHECK (((tipo_sangre_p)::text = ANY (ARRAY[('A+'::character varying)::text, ('A-'::character varying)::text, ('B+'::character varying)::text, ('B-'::character varying)::text, ('O+'::character varying)::text, ('O-'::character varying)::text, ('AB+'::character varying)::text, ('AB-'::character varying)::text])))
)
INHERITS (perfiles.personas);


ALTER TABLE perfiles.pacientes OWNER TO appbulance;

--
-- TOC entry 194 (class 1259 OID 25842)
-- Name: pacientes_id_p_seq; Type: SEQUENCE; Schema: perfiles; Owner: appbulance
--

CREATE SEQUENCE perfiles.pacientes_id_p_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perfiles.pacientes_id_p_seq OWNER TO appbulance;

--
-- TOC entry 2309 (class 0 OID 0)
-- Dependencies: 194
-- Name: pacientes_id_p_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.pacientes_id_p_seq OWNED BY perfiles.pacientes.id_p;


--
-- TOC entry 192 (class 1259 OID 25829)
-- Name: personas_id_prs_seq; Type: SEQUENCE; Schema: perfiles; Owner: appbulance
--

CREATE SEQUENCE perfiles.personas_id_prs_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perfiles.personas_id_prs_seq OWNER TO appbulance;

--
-- TOC entry 2310 (class 0 OID 0)
-- Dependencies: 192
-- Name: personas_id_prs_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.personas_id_prs_seq OWNED BY perfiles.personas.id_prs;


--
-- TOC entry 197 (class 1259 OID 25859)
-- Name: tamps; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.tamps (
    id_tmp integer NOT NULL,
    grado_tmp text,
    experiencia_tmp text,
    fecha_ingreso_tmp date
)
INHERITS (perfiles.personas);


ALTER TABLE perfiles.tamps OWNER TO appbulance;

--
-- TOC entry 196 (class 1259 OID 25857)
-- Name: tamps_id_tmp_seq; Type: SEQUENCE; Schema: perfiles; Owner: appbulance
--

CREATE SEQUENCE perfiles.tamps_id_tmp_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perfiles.tamps_id_tmp_seq OWNER TO appbulance;

--
-- TOC entry 2311 (class 0 OID 0)
-- Dependencies: 196
-- Name: tamps_id_tmp_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.tamps_id_tmp_seq OWNED BY perfiles.tamps.id_tmp;


--
-- TOC entry 188 (class 1259 OID 25809)
-- Name: usuarios_id_usr_seq; Type: SEQUENCE; Schema: perfiles; Owner: appbulance
--

CREATE SEQUENCE perfiles.usuarios_id_usr_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perfiles.usuarios_id_usr_seq OWNER TO appbulance;

--
-- TOC entry 2312 (class 0 OID 0)
-- Dependencies: 188
-- Name: usuarios_id_usr_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.usuarios_id_usr_seq OWNED BY perfiles.usuarios.id_usr;


--
-- TOC entry 201 (class 1259 OID 25883)
-- Name: fraps; Type: TABLE; Schema: peticiones; Owner: appbulance
--

CREATE TABLE peticiones.fraps (
    id_frp integer NOT NULL,
    id_pt integer NOT NULL
);


ALTER TABLE peticiones.fraps OWNER TO appbulance;

--
-- TOC entry 200 (class 1259 OID 25881)
-- Name: fraps_id_frp_seq; Type: SEQUENCE; Schema: peticiones; Owner: appbulance
--

CREATE SEQUENCE peticiones.fraps_id_frp_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE peticiones.fraps_id_frp_seq OWNER TO appbulance;

--
-- TOC entry 2313 (class 0 OID 0)
-- Dependencies: 200
-- Name: fraps_id_frp_seq; Type: SEQUENCE OWNED BY; Schema: peticiones; Owner: appbulance
--

ALTER SEQUENCE peticiones.fraps_id_frp_seq OWNED BY peticiones.fraps.id_frp;


--
-- TOC entry 199 (class 1259 OID 25873)
-- Name: peticiones; Type: TABLE; Schema: peticiones; Owner: appbulance
--

CREATE TABLE peticiones.peticiones (
    id_pt integer NOT NULL,
    timestamp_pt timestamp with time zone DEFAULT now(),
    ubicacion_pt point,
    direccion_pt character varying(255),
    id_p integer,
    id_cm integer,
    id_a integer
);


ALTER TABLE peticiones.peticiones OWNER TO appbulance;

--
-- TOC entry 198 (class 1259 OID 25871)
-- Name: peticiones_id_pt_seq; Type: SEQUENCE; Schema: peticiones; Owner: appbulance
--

CREATE SEQUENCE peticiones.peticiones_id_pt_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE peticiones.peticiones_id_pt_seq OWNER TO appbulance;

--
-- TOC entry 2314 (class 0 OID 0)
-- Dependencies: 198
-- Name: peticiones_id_pt_seq; Type: SEQUENCE OWNED BY; Schema: peticiones; Owner: appbulance
--

ALTER SEQUENCE peticiones.peticiones_id_pt_seq OWNED BY peticiones.peticiones.id_pt;


--
-- TOC entry 2113 (class 2604 OID 25801)
-- Name: id_a; Type: DEFAULT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias ALTER COLUMN id_a SET DEFAULT nextval('administracion.ambulancias_id_a_seq'::regclass);


--
-- TOC entry 2135 (class 2604 OID 34139)
-- Name: id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias ALTER COLUMN id SET DEFAULT nextval('pacientes.alergias_id_seq'::regclass);


--
-- TOC entry 2134 (class 2604 OID 34123)
-- Name: id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular ALTER COLUMN id SET DEFAULT nextval('pacientes.enfermedad_cardiovascular_id_seq'::regclass);


--
-- TOC entry 2137 (class 2604 OID 34171)
-- Name: id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos ALTER COLUMN id SET DEFAULT nextval('pacientes.medicamentos_id_seq'::regclass);


--
-- TOC entry 2136 (class 2604 OID 34155)
-- Name: id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos ALTER COLUMN id SET DEFAULT nextval('pacientes.padecimientos_id_seq'::regclass);


--
-- TOC entry 2138 (class 2604 OID 34187)
-- Name: id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico ALTER COLUMN id SET DEFAULT nextval('pacientes.seguro_medico_id_seq'::regclass);


--
-- TOC entry 2117 (class 2604 OID 25822)
-- Name: id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2118 (class 2604 OID 25823)
-- Name: id_cm; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_cm SET DEFAULT nextval('perfiles.crums_id_cm_seq'::regclass);


--
-- TOC entry 2122 (class 2604 OID 25847)
-- Name: id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2123 (class 2604 OID 25848)
-- Name: id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- TOC entry 2124 (class 2604 OID 25850)
-- Name: id_p; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_p SET DEFAULT nextval('perfiles.pacientes_id_p_seq'::regclass);


--
-- TOC entry 2119 (class 2604 OID 25834)
-- Name: id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2120 (class 2604 OID 25835)
-- Name: id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- TOC entry 2127 (class 2604 OID 25862)
-- Name: id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2128 (class 2604 OID 25863)
-- Name: id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- TOC entry 2129 (class 2604 OID 25865)
-- Name: id_tmp; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_tmp SET DEFAULT nextval('perfiles.tamps_id_tmp_seq'::regclass);


--
-- TOC entry 2116 (class 2604 OID 25814)
-- Name: id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2133 (class 2604 OID 25886)
-- Name: id_frp; Type: DEFAULT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps ALTER COLUMN id_frp SET DEFAULT nextval('peticiones.fraps_id_frp_seq'::regclass);


--
-- TOC entry 2131 (class 2604 OID 25876)
-- Name: id_pt; Type: DEFAULT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones ALTER COLUMN id_pt SET DEFAULT nextval('peticiones.peticiones_id_pt_seq'::regclass);


--
-- TOC entry 2144 (class 2606 OID 25808)
-- Name: ambulancias_pkey; Type: CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT ambulancias_pkey PRIMARY KEY (id_a);


--
-- TOC entry 2170 (class 2606 OID 34207)
-- Name: navegacion_pk; Type: CONSTRAINT; Schema: configuraciones; Owner: appbulance
--

ALTER TABLE ONLY configuraciones.navegacion
    ADD CONSTRAINT navegacion_pk PRIMARY KEY (id_usr);


--
-- TOC entry 2162 (class 2606 OID 34144)
-- Name: alergias_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_pk PRIMARY KEY (id);


--
-- TOC entry 2160 (class 2606 OID 34128)
-- Name: enfermedad_cardiovascular_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_pk PRIMARY KEY (id);


--
-- TOC entry 2166 (class 2606 OID 34176)
-- Name: medicamentos_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_pk PRIMARY KEY (id);


--
-- TOC entry 2164 (class 2606 OID 34160)
-- Name: padecimientos_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_pk PRIMARY KEY (id);


--
-- TOC entry 2168 (class 2606 OID 34192)
-- Name: seguro_medico_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico
    ADD CONSTRAINT seguro_medico_pk PRIMARY KEY (id);


--
-- TOC entry 2148 (class 2606 OID 25828)
-- Name: crums_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums
    ADD CONSTRAINT crums_pkey PRIMARY KEY (id_cm);


--
-- TOC entry 2152 (class 2606 OID 25856)
-- Name: pacientes_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id_p);


--
-- TOC entry 2150 (class 2606 OID 25841)
-- Name: personas_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id_prs);


--
-- TOC entry 2154 (class 2606 OID 25870)
-- Name: tamps_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps
    ADD CONSTRAINT tamps_pkey PRIMARY KEY (id_tmp);


--
-- TOC entry 2146 (class 2606 OID 25816)
-- Name: usuarios_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usr);


--
-- TOC entry 2158 (class 2606 OID 25888)
-- Name: fraps_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps
    ADD CONSTRAINT fraps_pkey PRIMARY KEY (id_frp);


--
-- TOC entry 2156 (class 2606 OID 25879)
-- Name: peticiones_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones
    ADD CONSTRAINT peticiones_pkey PRIMARY KEY (id_pt);


--
-- TOC entry 2171 (class 2606 OID 25900)
-- Name: id_cm_fk; Type: FK CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT id_cm_fk FOREIGN KEY (id_cm) REFERENCES perfiles.crums(id_cm) ON UPDATE CASCADE;


--
-- TOC entry 2174 (class 2606 OID 34145)
-- Name: alergias_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2173 (class 2606 OID 34129)
-- Name: enfermedad_cardiovascular_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2176 (class 2606 OID 34177)
-- Name: medicamentos_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2175 (class 2606 OID 34161)
-- Name: padecimientos_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2177 (class 2606 OID 34193)
-- Name: seguro_medico_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico
    ADD CONSTRAINT seguro_medico_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2172 (class 2606 OID 25910)
-- Name: fraps_id_pt_fkey; Type: FK CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps
    ADD CONSTRAINT fraps_id_pt_fkey FOREIGN KEY (id_pt) REFERENCES peticiones.peticiones(id_pt) ON UPDATE CASCADE;


--
-- TOC entry 2299 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-05-12 11:38:13 CDT

--
-- PostgreSQL database dump complete
--

