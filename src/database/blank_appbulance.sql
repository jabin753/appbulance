--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 9.6.9

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
-- Name: administracion; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA administracion;


ALTER SCHEMA administracion OWNER TO appbulance;

--
-- Name: auditorias; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA auditorias;


ALTER SCHEMA auditorias OWNER TO postgres;

--
-- Name: configuraciones; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA configuraciones;


ALTER SCHEMA configuraciones OWNER TO appbulance;

--
-- Name: pacientes; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA pacientes;


ALTER SCHEMA pacientes OWNER TO appbulance;

--
-- Name: perfiles; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA perfiles;


ALTER SCHEMA perfiles OWNER TO appbulance;

--
-- Name: peticiones; Type: SCHEMA; Schema: -; Owner: appbulance
--

CREATE SCHEMA peticiones;


ALTER SCHEMA peticiones OWNER TO appbulance;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ambulancias; Type: TABLE; Schema: administracion; Owner: appbulance
--

CREATE TABLE administracion.ambulancias (
    id_a integer NOT NULL,
    num_placa_a character varying(10),
    num_economico_a character varying(20),
    id_cm integer NOT NULL,
    estado_a integer DEFAULT 0 NOT NULL,
    posicion_actual_a point,
    CONSTRAINT estado_a_chk CHECK ((estado_a = ANY (ARRAY[0, 1, 2, 3])))
);


ALTER TABLE administracion.ambulancias OWNER TO appbulance;

--
-- Name: get_a(integer); Type: FUNCTION; Schema: administracion; Owner: postgres
--

CREATE FUNCTION administracion.get_a(id_usr integer) RETURNS SETOF administracion.ambulancias
    LANGUAGE sql
    AS $_$
SELECT * FROM administracion.ambulancias WHERE id_cm = (SELECT id_cm FROM perfiles.get_cm($1))
$_$;


ALTER FUNCTION administracion.get_a(id_usr integer) OWNER TO postgres;

--
-- Name: adduserpacientes(json); Type: FUNCTION; Schema: perfiles; Owner: appbulance
--

CREATE FUNCTION perfiles.adduserpacientes(datos json) RETURNS void
    LANGUAGE sql
    AS $$
-- Example: SELECT * FROM perfiles.adduser('{"tipo_usr":2,"email_usr"}');
--Crea un nuevo registro:
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
$$;


ALTER FUNCTION perfiles.adduserpacientes(datos json) OWNER TO appbulance;

--
-- Name: authuser(json); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.authuser(datos json) RETURNS TABLE(id_usr integer, tipo_usr integer, id integer, nav_style character varying, body_style character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE 
	usuario RECORD;
BEGIN
	PERFORM usuarios.id_usr FROM perfiles.usuarios 
		WHERE usuarios.email_usr = json_extract_path_text(datos, 'email');
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Correo % no registrado',json_extract_path_text(datos, 'email')
			USING HINT = 'Este correo no está registrado';
	END IF;
	PERFORM usuarios.id_usr FROM perfiles.usuarios 
		WHERE usuarios.email_usr = json_extract_path_text(datos, 'email')
		AND   contrasena_usr = md5(json_extract_path_text(datos, 'contra'));
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Contraseña incorrecta'
			USING HINT = 'Contraseña incorrecta';
	END IF;
        SELECT usuarios.id_usr, usuarios.tipo_usr INTO STRICT usuario FROM perfiles.usuarios 
		WHERE email_usr = json_extract_path_text(datos, 'email') 
		AND   contrasena_usr = md5(json_extract_path_text(datos, 'contra'));
	IF FOUND THEN
		IF usuario.tipo_usr = 1 THEN
			RETURN QUERY
			SELECT usuarios.id_usr,
				usuarios.tipo_usr,
				crums.id_cm,
				navegacion.nav_style,
				navegacion.body_style FROM perfiles.usuarios, perfiles.crums, configuraciones.navegacion
				WHERE crums.id_usr = usuarios.id_usr  AND
				usuarios.id_usr = navegacion.id_usr;
		ELSEIF usuario.tipo_usr = 2 THEN
			RETURN QUERY
			SELECT usuarios.id_usr,
				usuarios.tipo_usr,
				pacientes.id_p,
				navegacion.nav_style,
				navegacion.body_style FROM perfiles.usuarios, perfiles.pacientes, configuraciones.navegacion
				WHERE pacientes.id_usr = usuarios.id_usr  AND
				usuarios.id_usr = navegacion.id_usr;
		ELSEIF usuario.tipo_usr = 3 THEN
			RETURN QUERY
			SELECT usuarios.id_usr,
				usuarios.tipo_usr,
				tamps.id_tmp,
				navegacion.nav_style,
				navegacion.body_style FROM perfiles.usuarios, perfiles.tamps, configuraciones.navegacion
				WHERE tamps.id_usr = usuarios.id_usr  AND
				usuarios.id_usr = navegacion.id_usr;
		END IF;
	END IF;
	
END;
$$;


ALTER FUNCTION perfiles.authuser(datos json) OWNER TO postgres;

--
-- Name: borrar_perfil(); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.borrar_perfil() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN
DELETE FROM configuraciones.navegacion WHERE id_usr = OLD.id_usr;
RETURN OLD;
END; $$;


ALTER FUNCTION perfiles.borrar_perfil() OWNER TO postgres;

--
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
-- Name: COLUMN usuarios.tipo_usr; Type: COMMENT; Schema: perfiles; Owner: appbulance
--

COMMENT ON COLUMN perfiles.usuarios.tipo_usr IS '
1: Para CRUMS
2: Para pacientes
3: Para Tamps';


--
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
-- Name: get_cm(integer); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.get_cm(id_usr integer) RETURNS SETOF perfiles.crums
    LANGUAGE sql
    AS $_$
SELECT * FROM perfiles.crums WHERE id_usr = $1
$_$;


ALTER FUNCTION perfiles.get_cm(id_usr integer) OWNER TO postgres;

--
-- Name: get_cm_id(integer); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.get_cm_id(id_usr integer) RETURNS SETOF integer
    LANGUAGE sql
    AS $_$
SELECT id_cm FROM perfiles.crums WHERE id_usr = $1
$_$;


ALTER FUNCTION perfiles.get_cm_id(id_usr integer) OWNER TO postgres;

--
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
-- Name: get_p(integer); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.get_p(id_usr integer) RETURNS SETOF perfiles.pacientes
    LANGUAGE sql
    AS $_$
SELECT * FROM perfiles.pacientes WHERE id_usr = $1
$_$;


ALTER FUNCTION perfiles.get_p(id_usr integer) OWNER TO postgres;

--
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
-- Name: get_tmp(integer); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.get_tmp(id_usr integer) RETURNS SETOF perfiles.tamps
    LANGUAGE sql
    AS $_$
SELECT * FROM perfiles.tamps WHERE id_usr = $1
$_$;


ALTER FUNCTION perfiles.get_tmp(id_usr integer) OWNER TO postgres;

--
-- Name: nuevo_perfil(); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.nuevo_perfil() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN
INSERT INTO configuraciones.navegacion(id_usr) VALUES (NEW.id_usr);
RETURN NEW;
END; $$;


ALTER FUNCTION perfiles.nuevo_perfil() OWNER TO postgres;

--
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
-- Name: ambulancias_id_a_seq; Type: SEQUENCE OWNED BY; Schema: administracion; Owner: appbulance
--

ALTER SEQUENCE administracion.ambulancias_id_a_seq OWNED BY administracion.ambulancias.id_a;


--
-- Name: ambulancia_audit; Type: TABLE; Schema: auditorias; Owner: postgres
--

CREATE TABLE auditorias.ambulancia_audit (
    id_a_audit integer,
    operacion_a_audit character(1),
    fecha_operacion_a_audit timestamp with time zone,
    id_a integer,
    id_usr integer
);


ALTER TABLE auditorias.ambulancia_audit OWNER TO postgres;

--
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
-- Name: navegacion; Type: TABLE; Schema: configuraciones; Owner: appbulance
--

CREATE TABLE configuraciones.navegacion (
    id_usr integer NOT NULL,
    nav_style character varying(50) DEFAULT 'navbar-dark bg-dark'::character varying,
    body_style character varying(50) DEFAULT 'bg-dark'::character varying,
    CONSTRAINT body_chk CHECK (((body_style)::text = ANY (ARRAY[('bg-light'::character varying)::text, ('bg-dark'::character varying)::text]))),
    CONSTRAINT navbar_chk CHECK (((nav_style)::text = ANY (ARRAY[('navbar-dark bg-dark'::character varying)::text, ('navbar-light bg-light'::character varying)::text])))
);


ALTER TABLE configuraciones.navegacion OWNER TO appbulance;

--
-- Name: alergias; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.alergias (
    id integer NOT NULL,
    descripcion_alergia text,
    id_p integer
);


ALTER TABLE pacientes.alergias OWNER TO appbulance;

--
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
-- Name: alergias_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.alergias_id_seq OWNED BY pacientes.alergias.id;


--
-- Name: enfermedad_cardiovascular; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.enfermedad_cardiovascular (
    id integer NOT NULL,
    descripcion_ecardio text,
    id_p integer
);


ALTER TABLE pacientes.enfermedad_cardiovascular OWNER TO appbulance;

--
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
-- Name: enfermedad_cardiovascular_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.enfermedad_cardiovascular_id_seq OWNED BY pacientes.enfermedad_cardiovascular.id;


--
-- Name: medicamentos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.medicamentos (
    id integer NOT NULL,
    descripcion_medicamento text,
    id_p integer
);


ALTER TABLE pacientes.medicamentos OWNER TO appbulance;

--
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
-- Name: medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.medicamentos_id_seq OWNED BY pacientes.medicamentos.id;


--
-- Name: padecimientos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.padecimientos (
    id integer NOT NULL,
    descripcion_padecimiento text,
    id_p integer
);


ALTER TABLE pacientes.padecimientos OWNER TO appbulance;

--
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
-- Name: padecimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.padecimientos_id_seq OWNED BY pacientes.padecimientos.id;


--
-- Name: seguro_medico; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.seguro_medico (
    id_sm integer NOT NULL,
    descripcion_sm text
);


ALTER TABLE pacientes.seguro_medico OWNER TO appbulance;

--
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
-- Name: seguro_medico_id_seq; Type: SEQUENCE OWNED BY; Schema: pacientes; Owner: appbulance
--

ALTER SEQUENCE pacientes.seguro_medico_id_seq OWNED BY pacientes.seguro_medico.id_sm;


--
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
-- Name: crums_id_cm_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.crums_id_cm_seq OWNED BY perfiles.crums.id_cm;


--
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
-- Name: pacientes_id_p_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.pacientes_id_p_seq OWNED BY perfiles.pacientes.id_p;


--
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
-- Name: personas_id_prs_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.personas_id_prs_seq OWNED BY perfiles.personas.id_prs;


--
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
-- Name: tamps_id_tmp_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.tamps_id_tmp_seq OWNED BY perfiles.tamps.id_tmp;


--
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
-- Name: usuarios_id_usr_seq; Type: SEQUENCE OWNED BY; Schema: perfiles; Owner: appbulance
--

ALTER SEQUENCE perfiles.usuarios_id_usr_seq OWNED BY perfiles.usuarios.id_usr;


--
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
-- Name: fraps_id_frp_seq; Type: SEQUENCE OWNED BY; Schema: peticiones; Owner: appbulance
--

ALTER SEQUENCE peticiones.fraps_id_frp_seq OWNED BY peticiones.fraps.id_frp;


--
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
-- Name: peticiones_id_pt_seq; Type: SEQUENCE OWNED BY; Schema: peticiones; Owner: appbulance
--

ALTER SEQUENCE peticiones.peticiones_id_pt_seq OWNED BY peticiones.peticiones.id_pt;


--
-- Name: ambulancias id_a; Type: DEFAULT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias ALTER COLUMN id_a SET DEFAULT nextval('administracion.ambulancias_id_a_seq'::regclass);


--
-- Name: alergias id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias ALTER COLUMN id SET DEFAULT nextval('pacientes.alergias_id_seq'::regclass);


--
-- Name: enfermedad_cardiovascular id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular ALTER COLUMN id SET DEFAULT nextval('pacientes.enfermedad_cardiovascular_id_seq'::regclass);


--
-- Name: medicamentos id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos ALTER COLUMN id SET DEFAULT nextval('pacientes.medicamentos_id_seq'::regclass);


--
-- Name: padecimientos id; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos ALTER COLUMN id SET DEFAULT nextval('pacientes.padecimientos_id_seq'::regclass);


--
-- Name: seguro_medico id_sm; Type: DEFAULT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico ALTER COLUMN id_sm SET DEFAULT nextval('pacientes.seguro_medico_id_seq'::regclass);


--
-- Name: crums id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- Name: crums id_cm; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_cm SET DEFAULT nextval('perfiles.crums_id_cm_seq'::regclass);


--
-- Name: pacientes id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- Name: pacientes id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- Name: pacientes id_p; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_p SET DEFAULT nextval('perfiles.pacientes_id_p_seq'::regclass);


--
-- Name: personas id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- Name: personas id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- Name: tamps id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- Name: tamps id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_prs SET DEFAULT nextval('perfiles.personas_id_prs_seq'::regclass);


--
-- Name: tamps id_tmp; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_tmp SET DEFAULT nextval('perfiles.tamps_id_tmp_seq'::regclass);


--
-- Name: usuarios id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios ALTER COLUMN id_usr SET DEFAULT nextval('perfiles.usuarios_id_usr_seq'::regclass);


--
-- Name: fraps id_frp; Type: DEFAULT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps ALTER COLUMN id_frp SET DEFAULT nextval('peticiones.fraps_id_frp_seq'::regclass);


--
-- Name: peticiones id_pt; Type: DEFAULT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones ALTER COLUMN id_pt SET DEFAULT nextval('peticiones.peticiones_id_pt_seq'::regclass);


--
-- Name: ambulancias ambulancias_pkey; Type: CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT ambulancias_pkey PRIMARY KEY (id_a);


--
-- Name: alergias alergias_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_pk PRIMARY KEY (id);


--
-- Name: enfermedad_cardiovascular enfermedad_cardiovascular_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_pk PRIMARY KEY (id);


--
-- Name: medicamentos medicamentos_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_pk PRIMARY KEY (id);


--
-- Name: padecimientos padecimientos_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_pk PRIMARY KEY (id);


--
-- Name: seguro_medico seguro_medico_pk; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico
    ADD CONSTRAINT seguro_medico_pk PRIMARY KEY (id_sm);


--
-- Name: crums crums_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums
    ADD CONSTRAINT crums_pkey PRIMARY KEY (id_cm);


--
-- Name: usuarios email_uc; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT email_uc UNIQUE (email_usr);


--
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id_p);


--
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id_prs);


--
-- Name: tamps tamps_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps
    ADD CONSTRAINT tamps_pkey PRIMARY KEY (id_tmp);


--
-- Name: usuarios telefono_uc; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT telefono_uc UNIQUE (telefono_usr);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usr);


--
-- Name: fraps fraps_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps
    ADD CONSTRAINT fraps_pkey PRIMARY KEY (id_frp);


--
-- Name: peticiones peticiones_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones
    ADD CONSTRAINT peticiones_pkey PRIMARY KEY (id_pt);


--
-- Name: id_usr_i; Type: INDEX; Schema: configuraciones; Owner: appbulance
--

CREATE UNIQUE INDEX id_usr_i ON configuraciones.navegacion USING btree (id_usr);


--
-- Name: crums borrar_perfil; Type: TRIGGER; Schema: perfiles; Owner: appbulance
--

CREATE TRIGGER borrar_perfil BEFORE DELETE ON perfiles.crums FOR EACH ROW EXECUTE PROCEDURE perfiles.borrar_perfil();


--
-- Name: pacientes borrar_perfil; Type: TRIGGER; Schema: perfiles; Owner: appbulance
--

CREATE TRIGGER borrar_perfil BEFORE DELETE ON perfiles.pacientes FOR EACH ROW EXECUTE PROCEDURE perfiles.borrar_perfil();


--
-- Name: tamps borrar_perfil; Type: TRIGGER; Schema: perfiles; Owner: appbulance
--

CREATE TRIGGER borrar_perfil BEFORE DELETE ON perfiles.tamps FOR EACH ROW EXECUTE PROCEDURE perfiles.borrar_perfil();


--
-- Name: crums nuevo_perfil; Type: TRIGGER; Schema: perfiles; Owner: appbulance
--

CREATE TRIGGER nuevo_perfil AFTER INSERT ON perfiles.crums FOR EACH ROW EXECUTE PROCEDURE perfiles.nuevo_perfil();


--
-- Name: pacientes nuevo_perfil; Type: TRIGGER; Schema: perfiles; Owner: appbulance
--

CREATE TRIGGER nuevo_perfil AFTER INSERT ON perfiles.pacientes FOR EACH ROW EXECUTE PROCEDURE perfiles.nuevo_perfil();


--
-- Name: tamps nuevo_perfil; Type: TRIGGER; Schema: perfiles; Owner: appbulance
--

CREATE TRIGGER nuevo_perfil AFTER INSERT ON perfiles.tamps FOR EACH ROW EXECUTE PROCEDURE perfiles.nuevo_perfil();


--
-- Name: ambulancias id_cm_fk; Type: FK CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT id_cm_fk FOREIGN KEY (id_cm) REFERENCES perfiles.crums(id_cm) ON UPDATE CASCADE;


--
-- Name: alergias alergias_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- Name: enfermedad_cardiovascular enfermedad_cardiovascular_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- Name: medicamentos medicamentos_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- Name: padecimientos padecimientos_fk; Type: FK CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_fk FOREIGN KEY (id_p) REFERENCES perfiles.pacientes(id_p) ON UPDATE CASCADE;


--
-- Name: fraps fraps_id_pt_fkey; Type: FK CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.fraps
    ADD CONSTRAINT fraps_id_pt_fkey FOREIGN KEY (id_pt) REFERENCES peticiones.peticiones(id_pt) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

