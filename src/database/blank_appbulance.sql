--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 9.6.9

-- Started on 2018-05-19 18:26:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 17561)
-- Name: administracion; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA administracion;


ALTER SCHEMA administracion OWNER TO appbulance;

--
-- TOC entry 4 (class 2615 OID 17562)
-- Name: configuraciones; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA auditorias;


ALTER SCHEMA auditorias OWNER TO postgres;


CREATE SCHEMA configuraciones;


ALTER SCHEMA configuraciones OWNER TO appbulance;

--
-- TOC entry 10 (class 2615 OID 17563)
-- Name: pacientes; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA pacientes;


ALTER SCHEMA pacientes OWNER TO appbulance;

--
-- TOC entry 5 (class 2615 OID 17564)
-- Name: perfiles; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA perfiles;


ALTER SCHEMA perfiles OWNER TO appbulance;

--
-- TOC entry 11 (class 2615 OID 17565)
-- Name: peticiones; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA peticiones;


ALTER SCHEMA peticiones OWNER TO appbulance;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2286 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 217 (class 1255 OID 17566)
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
-- TOC entry 230 (class 1255 OID 17567)
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
tipo_sangre_p,
nss_p,
id_sm
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
json_extract_path_text(datos, 'tipo_sangre_p')::character varying,
json_extract_path_text(datos, 'nss_p')::character varying,
json_extract_path_text(datos, 'id_sm')::integer
);

INSERT INTO configuraciones.navegacion(id_usr) VALUES(currval('perfiles.usuarios_id_usr_seq'::regclass))
RETURNING id_usr
$$;


ALTER FUNCTION perfiles.adduserpacientes(datos json) OWNER TO appbulance;

--
-- TOC entry 231 (class 1255 OID 17769)
-- Name: authuser(json); Type: FUNCTION; Schema: perfiles; Owner: appbulance
--

CREATE FUNCTION perfiles.authuser(datos json) RETURNS TABLE(id_usr integer, tipo_usr integer, nav_style character varying, body_style character varying)
    LANGUAGE sql
    AS $$
SELECT usuarios.id_usr,usuarios.tipo_usr,navegacion.nav_style, navegacion.body_style FROM perfiles.usuarios, configuraciones.navegacion WHERE 
usuarios.id_usr = navegacion.id_usr
--Obtencion de datos del json
AND email_usr = json_extract_path_text(datos, 'email') AND contrasena_usr = md5(json_extract_path_text(datos, 'contra')) 

$$;


ALTER FUNCTION perfiles.authuser(datos json) OWNER TO appbulance;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 190 (class 1259 OID 17569)
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
-- TOC entry 191 (class 1259 OID 17577)
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
-- TOC entry 2287 (class 0 OID 0)
-- Dependencies: 191
-- Name: ambulancias_id_a_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: appbulance
--

ALTER SEQUENCE administracion.ambulancias_id_a_seq OWNED BY administracion.ambulancias.id_a;


CREATE TABLE auditorias.ambulancia_audit (
    id_a_audit integer,
    operacion_a_audit character(1),
    fecha_operacion_a_audit timestamp with time zone,
    id_a integer,
    id_usr integer
);


ALTER TABLE auditorias.ambulancia_audit OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32992)
-- Name: frap_audit; Type: TABLE; Schema: auditorias; Owner: postgres
--

CREATE TABLE auditorias.frap_audit (
    id_frp_audit integer,
    operacion_frp_audit character(1),
    fecha_operacion_frp_audit time with time zone,
    id_frp integer,
    id_usr integer
);


ALTER TABLE auditorias.frap_audit OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32989)
-- Name: usuario_audit; Type: TABLE; Schema: auditorias; Owner: appbulance
--

CREATE TABLE auditorias.usuario_audit (
    id_usr_audit integer,
    operacion_usr_audit character(1),
    fecha_operacion_usr_audit timestamp with time zone,
    id_usr integer
);


ALTER TABLE auditorias.usuario_audit OWNER TO appbulance;


--
-- TOC entry 192 (class 1259 OID 17579)
-- Name: navegacion; Type: TABLE; Schema: configuraciones; Owner: appbulance
--

CREATE TABLE configuraciones.navegacion (
    id_usr integer NOT NULL,
    nav_style character varying(50) DEFAULT 'navbar-dark bg-dark'::character varying,
    body_style character varying(50) DEFAULT 'bg-dark'::character varying,
    CONSTRAINT body_chk CHECK (((body_style)::text = ANY ((ARRAY['bg-light'::character varying, 'bg-dark'::character varying])::text[]))),
    CONSTRAINT navbar_chk CHECK (((nav_style)::text = ANY (ARRAY[('navbar-dark bg-dark'::character varying)::text, ('navbar-light bg-light'::character varying)::text])))
);


ALTER TABLE configuraciones.navegacion OWNER TO appbulance;

--
-- TOC entry 193 (class 1259 OID 17586)
-- Name: alergias; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.alergias (
    id integer NOT NULL,
    descripcion_alergia text,
    id_p integer
);


ALTER TABLE pacientes.alergias OWNER TO appbulance;

--
-- TOC entry 194 (class 1259 OID 17592)
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
-- TOC entry 2288 (class 0 OID 0)
-- Dependencies: 194
-- Name: alergias_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.alergias_id_seq OWNED BY pacientes.alergias.id;


--
-- TOC entry 195 (class 1259 OID 17594)
-- Name: enfermedad_cardiovascular; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.enfermedad_cardiovascular (
    id integer NOT NULL,
    descripcion_ecardio text,
    id_p integer
);


ALTER TABLE pacientes.enfermedad_cardiovascular OWNER TO appbulance;

--
-- TOC entry 196 (class 1259 OID 17600)
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
-- TOC entry 2289 (class 0 OID 0)
-- Dependencies: 196
-- Name: enfermedad_cardiovascular_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.enfermedad_cardiovascular_id_seq OWNED BY pacientes.enfermedad_cardiovascular.id;


--
-- TOC entry 197 (class 1259 OID 17602)
-- Name: medicamentos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.medicamentos (
    id integer NOT NULL,
    descripcion_medicamento text,
    id_p integer
);


ALTER TABLE pacientes.medicamentos OWNER TO appbulance;

--
-- TOC entry 198 (class 1259 OID 17608)
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
-- TOC entry 2290 (class 0 OID 0)
-- Dependencies: 198
-- Name: medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.medicamentos_id_seq OWNED BY pacientes.medicamentos.id;


--
-- TOC entry 199 (class 1259 OID 17610)
-- Name: padecimientos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.padecimientos (
    id integer NOT NULL,
    descripcion_padecimiento text,
    id_p integer
);


ALTER TABLE pacientes.padecimientos OWNER TO appbulance;

--
-- TOC entry 200 (class 1259 OID 17616)
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
-- TOC entry 2291 (class 0 OID 0)
-- Dependencies: 200
-- Name: padecimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.padecimientos_id_seq OWNED BY pacientes.padecimientos.id;


--
-- TOC entry 201 (class 1259 OID 17618)
-- Name: seguro_medico; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.seguro_medico (
    id_sm integer NOT NULL,
    descripcion_sm text
);


ALTER TABLE pacientes.seguro_medico OWNER TO appbulance;

--
-- TOC entry 202 (class 1259 OID 17624)
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
-- TOC entry 2292 (class 0 OID 0)
-- Dependencies: 202
-- Name: seguro_medico_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.seguro_medico_id_seq OWNED BY pacientes.seguro_medico.id_sm;


--
-- TOC entry 203 (class 1259 OID 17626)
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
-- TOC entry 2293 (class 0 OID 0)
-- Dependencies: 203
-- Name: COLUMN usuarios.tipo_usr; Type: COMMENT; Schema: perfiles; Owner: appbulance
--

COMMENT ON COLUMN perfiles.usuarios.tipo_usr IS '
1: Para CRUMS
2: Para pacientes
3: Para Tamps';


--
-- TOC entry 204 (class 1259 OID 17629)
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
-- TOC entry 205 (class 1259 OID 17635)
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
-- TOC entry 2294 (class 0 OID 0)
-- Dependencies: 205
-- Name: crums_id_cm_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.crums_id_cm_seq OWNED BY perfiles.crums.id_cm;


--
-- TOC entry 206 (class 1259 OID 17637)
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
-- TOC entry 207 (class 1259 OID 17644)
-- Name: pacientes; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.pacientes (
    id_p integer NOT NULL,
    tipo_sangre_p character varying(3),
    nss_p character varying(12),
    id_sm integer,
    CONSTRAINT tipo_sangre_chk CHECK (((tipo_sangre_p)::text = ANY (ARRAY[('A+'::character varying)::text, ('A-'::character varying)::text, ('B+'::character varying)::text, ('B-'::character varying)::text, ('O+'::character varying)::text, ('O-'::character varying)::text, ('AB+'::character varying)::text, ('AB-'::character varying)::text])))
)
INHERITS (perfiles.personas);


ALTER TABLE perfiles.pacientes OWNER TO appbulance;

--
-- TOC entry 208 (class 1259 OID 17652)
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
-- TOC entry 2295 (class 0 OID 0)
-- Dependencies: 208
-- Name: pacientes_id_p_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.pacientes_id_p_seq OWNED BY perfiles.pacientes.id_p;


--
-- TOC entry 209 (class 1259 OID 17654)
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
-- TOC entry 2296 (class 0 OID 0)
-- Dependencies: 209
-- Name: personas_id_prs_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.personas_id_prs_seq OWNED BY perfiles.personas.id_prs;


--
-- TOC entry 210 (class 1259 OID 17656)
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
-- TOC entry 211 (class 1259 OID 17663)
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
-- TOC entry 2297 (class 0 OID 0)
-- Dependencies: 211
-- Name: tamps_id_tmp_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.tamps_id_tmp_seq OWNED BY perfiles.tamps.id_tmp;


--
-- TOC entry 212 (class 1259 OID 17665)
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
-- TOC entry 2298 (class 0 OID 0)
-- Dependencies: 212
-- Name: usuarios_id_usr_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.usuarios_id_usr_seq OWNED BY perfiles.usuarios.id_usr;


--
-- TOC entry 213 (class 1259 OID 17667)
-- Name: fraps; Type: TABLE; Schema: peticiones; Owner: appbulance
--

CREATE TABLE peticiones.fraps (
    id_frp integer NOT NULL,
    id_pt integer NOT NULL,
    hrllamada_frp timestamp with time zone NOT NULL,
    hrsalida_frp timestamp with time zone NOT NULL,
    hrllegada_frp timestamp with time zone,
    hrtraslado_frp timestamp with time zone,
    hrhospital_frp time with time zone,
    hrbase_frp time with time zone,
    motivo_atencion_frp character varying(30),
    lg_ocurrencia_frp character varying(30),
    id_a integer
);


ALTER TABLE peticiones.fraps OWNER TO appbulance;

--
-- TOC entry 214 (class 1259 OID 17670)
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
-- TOC entry 2299 (class 0 OID 0)
-- Dependencies: 214
-- Name: fraps_id_frp_seq; Type: SEQUENCE OWNED BY; Schema: peticiones; Owner: appbulance
--

ALTER SEQUENCE peticiones.fraps_id_frp_seq OWNED BY peticiones.fraps.id_frp;


--
-- TOC entry 215 (class 1259 OID 17672)
-- Name: peticiones; Type: TABLE; Schema: peticiones; Owner: appbulance
--

CREATE TABLE peticiones.peticiones (
    id_pt integer NOT NULL,
    ubicacion_pt point,
    direccion_pt character varying(255),
    id_p integer,
    id_cm integer
);


ALTER TABLE peticiones.peticiones OWNER TO appbulance;

--
-- TOC entry 216 (class 1259 OID 17675)
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
-- TOC entry 2300 (class 0 OID 0)
-- Dependencies: 216
-- Name: peticiones_id_pt_seq; Type: SEQUENCE OWNED BY; Schema: peticiones; Owner: appbulance
--

ALTER SEQUENCE peticiones.peticiones_id_pt_seq OWNED BY peticiones.peticiones.id_pt;


--
-- TOC entry 2096 (class 2604 OID 17677)
-- Name: ambulancias id_a; Type: DEFAULT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias ALTER COLUMN id_a SET DEFAULT nextval('administracion.ambulancias_id_a_seq'::regclass);


--
-- TOC entry 2102 (class 2604 OID 17678)
-- Name: alergias id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias ALTER COLUMN id SET DEFAULT nextval('pacientes.alergias_id_seq'::regclass);


--
-- TOC entry 2103 (class 2604 OID 17679)
-- Name: enfermedad_cardiovascular id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular ALTER COLUMN id SET DEFAULT nextval('pacientes.enfermedad_cardiovascular_id_seq'::regclass);


--
-- TOC entry 2104 (class 2604 OID 17680)
-- Name: medicamentos id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos ALTER COLUMN id SET DEFAULT nextval('pacientes.medicamentos_id_seq'::regclass);


--
-- TOC entry 2105 (class 2604 OID 17681)
-- Name: padecimientos id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos ALTER COLUMN id SET DEFAULT nextval('pacientes.padecimientos_id_seq'::regclass);


--
-- TOC entry 2106 (class 2604 OID 17682)
-- Name: seguro_medico id_sm; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico ALTER COLUMN id_sm SET DEFAULT nextval('pacientes.seguro_medico_id_seq'::regclass);


--
-- TOC entry 2108 (class 2604 OID 17683)
-- Name: crums id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2109 (class 2604 OID 17684)
-- Name: crums id_cm; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_cm SET DEFAULT nextval('perfiles.crums_id_cm_seq'::regclass);


--
-- TOC entry 2113 (class 2604 OID 17685)
-- Name: pacientes id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2114 (class 2604 OID 17686)
-- Name: pacientes id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- TOC entry 2115 (class 2604 OID 17687)
-- Name: pacientes id_p; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_p SET DEFAULT nextval('perfiles.pacientes_id_p_seq'::regclass);


--
-- TOC entry 2110 (class 2604 OID 17688)
-- Name: personas id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2111 (class 2604 OID 17689)
-- Name: personas id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- TOC entry 2118 (class 2604 OID 17690)
-- Name: tamps id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2119 (class 2604 OID 17691)
-- Name: tamps id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- TOC entry 2120 (class 2604 OID 17692)
-- Name: tamps id_tmp; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_tmp SET DEFAULT nextval('perfiles.tamps_id_tmp_seq'::regclass);


--
-- TOC entry 2107 (class 2604 OID 17693)
-- Name: usuarios id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- TOC entry 2122 (class 2604 OID 17694)
-- Name: fraps id_frp; Type: DEFAULT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps ALTER COLUMN id_frp SET DEFAULT nextval('peticiones.fraps_id_frp_seq'::regclass);


--
-- TOC entry 2123 (class 2604 OID 17695)
-- Name: peticiones id_pt; Type: DEFAULT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones ALTER COLUMN id_pt SET DEFAULT nextval('peticiones.peticiones_id_pt_seq'::regclass);


--
-- TOC entry 2125 (class 2606 OID 17697)
-- Name: ambulancias ambulancias_pkey; Type: CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT ambulancias_pkey PRIMARY KEY (id_a);


--
-- TOC entry 2127 (class 2606 OID 17699)
-- Name: navegacion navegacion_pk; Type: CONSTRAINT; Schema: configuraciones; Owner: appbulance
--

ALTER TABLE ONLY configuraciones.navegacion
    ADD CONSTRAINT navegacion_pk PRIMARY KEY (id_usr);


--
-- TOC entry 2129 (class 2606 OID 17701)
-- Name: alergias alergias_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_pk PRIMARY KEY (id);


--
-- TOC entry 2131 (class 2606 OID 17703)
-- Name: enfermedad_cardiovascular enfermedad_cardiovascular_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_pk PRIMARY KEY (id);


--
-- TOC entry 2133 (class 2606 OID 17705)
-- Name: medicamentos medicamentos_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_pk PRIMARY KEY (id);


--
-- TOC entry 2135 (class 2606 OID 17707)
-- Name: padecimientos padecimientos_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_pk PRIMARY KEY (id);


--
-- TOC entry 2137 (class 2606 OID 17709)
-- Name: seguro_medico seguro_medico_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico
    ADD CONSTRAINT seguro_medico_pk PRIMARY KEY (id_sm);


--
-- TOC entry 2145 (class 2606 OID 17711)
-- Name: crums crums_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums
    ADD CONSTRAINT crums_pkey PRIMARY KEY (id_cm);


--
-- TOC entry 2139 (class 2606 OID 17713)
-- Name: usuarios email_uc; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT email_uc UNIQUE (email_usr);


--
-- TOC entry 2149 (class 2606 OID 17715)
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id_p);


--
-- TOC entry 2147 (class 2606 OID 17717)
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id_prs);


--
-- TOC entry 2151 (class 2606 OID 17719)
-- Name: tamps tamps_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps
    ADD CONSTRAINT tamps_pkey PRIMARY KEY (id_tmp);


--
-- TOC entry 2141 (class 2606 OID 17721)
-- Name: usuarios telefono_uc; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT telefono_uc UNIQUE (telefono_usr);


--
-- TOC entry 2143 (class 2606 OID 17723)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usr);


--
-- TOC entry 2153 (class 2606 OID 17725)
-- Name: fraps fraps_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps
    ADD CONSTRAINT fraps_pkey PRIMARY KEY (id_frp);


--
-- TOC entry 2155 (class 2606 OID 17727)
-- Name: peticiones peticiones_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones
    ADD CONSTRAINT peticiones_pkey PRIMARY KEY (id_pt);


--
-- TOC entry 2156 (class 2606 OID 17728)
-- Name: ambulancias id_cm_fk; Type: FK CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT id_cm_fk FOREIGN KEY (id_cm) REFERENCES perfiles.crums(id_cm) ON UPDATE CASCADE;


--
-- TOC entry 2157 (class 2606 OID 17733)
-- Name: alergias alergias_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2158 (class 2606 OID 17738)
-- Name: enfermedad_cardiovascular enfermedad_cardiovascular_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2159 (class 2606 OID 17743)
-- Name: medicamentos medicamentos_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2160 (class 2606 OID 17748)
-- Name: padecimientos padecimientos_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- TOC entry 2161 (class 2606 OID 17753)
-- Name: fraps fraps_id_pt_fkey; Type: FK CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps
    ADD CONSTRAINT fraps_id_pt_fkey FOREIGN KEY (id_pt) REFERENCES peticiones.peticiones(id_pt) ON UPDATE CASCADE;


-- Completed on 2018-05-19 18:26:43

--
-- PostgreSQL database dump complete
--
