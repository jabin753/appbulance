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
-- Name: appbulance; Type: DATABASE; Schema: -; Owner: appbulance
--

CREATE DATABASE appbulance;

CREATE USER appbulance WITH
  PASSWORD '::appbulance2018::'
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

COMMENT ON ROLE appbulance IS 'appbulance default pooling client';

ALTER DATABASE appbulance OWNER TO appbulance;

\connect appbulance
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


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


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
	nss_p
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
	json_extract_path_text(datos, 'nss_p')::character varying
);
$$;


ALTER FUNCTION perfiles.adduserpacientes(datos json) OWNER TO appbulance;

--
-- Name: authuser(json); Type: FUNCTION; Schema: perfiles; Owner: appbulance
--

CREATE FUNCTION perfiles.authuser(datos json) RETURNS TABLE(id_usr uuid, tipo_usr integer, id uuid, nav_style character varying, body_style character varying)
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
	PERFORM usuarios.id_usr, usuarios.tipo_usr FROM perfiles.usuarios 
		WHERE email_usr = json_extract_path_text(datos, 'email') 
		AND   contrasena_usr = md5(json_extract_path_text(datos, 'contra'))
		AND valido_usr = true;
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Cuenta desactivada'
	USING HINT = 'Esta cuenta no ha sido activada aún';
	END IF;
        SELECT usuarios.id_usr, usuarios.tipo_usr INTO STRICT usuario FROM perfiles.usuarios 
		WHERE email_usr = json_extract_path_text(datos, 'email') 
		AND   contrasena_usr = md5(json_extract_path_text(datos, 'contra'))
		AND valido_usr = true;
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


ALTER FUNCTION perfiles.authuser(datos json) OWNER TO appbulance;

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
-- Name: nuevo_perfil(); Type: FUNCTION; Schema: perfiles; Owner: postgres
--

CREATE FUNCTION perfiles.nuevo_perfil() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN
INSERT INTO configuraciones.navegacion(id_usr) VALUES (NEW.id_usr);
RETURN NEW;
END; $$;


ALTER FUNCTION perfiles.nuevo_perfil() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ambulancias; Type: TABLE; Schema: administracion; Owner: appbulance
--

CREATE TABLE administracion.ambulancias (
    id_a uuid DEFAULT uuid_generate_v4() NOT NULL,
    num_placa_a character varying(10),
    num_economico_a character varying(20),
    estado_a integer DEFAULT 0 NOT NULL,
    posicion_actual_a point,
    CONSTRAINT estado_a_chk CHECK ((estado_a = ANY (ARRAY[0, 1, 2, 3])))
);


ALTER TABLE administracion.ambulancias OWNER TO appbulance;

--
-- Name: delete_a(uuid); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.delete_a(uuid) RETURNS SETOF administracion.ambulancias
    LANGUAGE plpgsql
    AS $_$

-- Usage: SELECT * FROM delete_a(1);
BEGIN
	RETURN QUERY 
		DELETE FROM administracion.ambulancias
		WHERE ambulancias.id_a = $1
	RETURNING *;
END;

$_$;


ALTER FUNCTION public.delete_a(uuid) OWNER TO appbulance;

--
-- Name: peticiones; Type: TABLE; Schema: peticiones; Owner: appbulance
--

CREATE TABLE peticiones.peticiones (
    id_pt uuid DEFAULT uuid_generate_v4() NOT NULL,
    id_p uuid,
    id_cm uuid,
    ubicacion_pt point,
    direccion_pt character varying(255),
    timestamp_pt timestamp with time zone DEFAULT now(),
    resuelto boolean DEFAULT false
);


ALTER TABLE peticiones.peticiones OWNER TO appbulance;

--
-- Name: delete_pt(uuid); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.delete_pt(uuid) RETURNS SETOF peticiones.peticiones
    LANGUAGE plpgsql
    AS $_$

-- Usage: SELECT * FROM delete_pt(1);
BEGIN
	RETURN QUERY 
	DELETE FROM peticiones.peticiones
		WHERE peticiones.id_pt = $1
	RETURNING *;
END;

$_$;


ALTER FUNCTION public.delete_pt(uuid) OWNER TO appbulance;

--
-- Name: get_a(); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.get_a() RETURNS SETOF administracion.ambulancias
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY
		SELECT * FROM administracion.ambulancias;
END;
$$;


ALTER FUNCTION public.get_a() OWNER TO appbulance;

--
-- Name: get_a(uuid); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.get_a(id_a uuid) RETURNS SETOF administracion.ambulancias
    LANGUAGE plpgsql
    AS $_$

BEGIN
	RETURN QUERY
		SELECT * FROM administracion.ambulancias
			WHERE ambulancias.id_a = $1;
END;

$_$;


ALTER FUNCTION public.get_a(id_a uuid) OWNER TO appbulance;

--
-- Name: get_pt(); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.get_pt() RETURNS SETOF peticiones.peticiones
    LANGUAGE plpgsql
    AS $$
-- Usage: SELECT * FROM get_pt();
BEGIN
	RETURN QUERY
		SELECT * FROM peticiones.peticiones;
END;
$$;


ALTER FUNCTION public.get_pt() OWNER TO appbulance;

--
-- Name: get_pt(uuid); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.get_pt(uuid) RETURNS SETOF peticiones.peticiones
    LANGUAGE plpgsql
    AS $_$
-- Usage: SELECT * FROM get_pt(1);
BEGIN
	RETURN QUERY
		SELECT * FROM peticiones.peticiones
			WHERE peticiones.id_pt = $1;
END;
$_$;


ALTER FUNCTION public.get_pt(uuid) OWNER TO appbulance;

--
-- Name: post_a(character, character, integer, point); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.post_a(character, character, integer, point) RETURNS SETOF administracion.ambulancias
    LANGUAGE plpgsql
    AS $_$

BEGIN
	RETURN QUERY
		INSERT INTO administracion.ambulancias (num_placa_a, num_economico_a, estado_a, posicion_actual_a)
			VALUES ($1,$2,$3,$4)
	    RETURNING *;
END;

$_$;


ALTER FUNCTION public.post_a(character, character, integer, point) OWNER TO appbulance;

--
-- Name: post_pt(point, character, uuid, uuid); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.post_pt(point, character, uuid, uuid) RETURNS SETOF peticiones.peticiones
    LANGUAGE plpgsql
    AS $_$
-- Usage: SELECT post_pt(point(10.21231,15.21434),'Av. Mateo 32#',2,1);
BEGIN
RETURN QUERY
	INSERT INTO peticiones.peticiones(ubicacion_pt, direccion_pt, id_p, id_cm) 
	VALUES($1,$2,$3,$4)
	returning *;
END;
$_$;


ALTER FUNCTION public.post_pt(point, character, uuid, uuid) OWNER TO appbulance;

--
-- Name: put_a(uuid, character, character, integer, point); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.put_a(uuid, character, character, integer, point) RETURNS SETOF administracion.ambulancias
    LANGUAGE plpgsql
    AS $_$

BEGIN
	RETURN QUERY
		UPDATE administracion.ambulancias
		SET num_placa_a=$2, num_economico_a=$3, estado_a=$4, posicion_actual_a=$5
		WHERE id_a=$1
	RETURNING *;	
END;

$_$;


ALTER FUNCTION public.put_a(uuid, character, character, integer, point) OWNER TO appbulance;

--
-- Name: put_pt(uuid, point, character, uuid, uuid); Type: FUNCTION; Schema: public; Owner: appbulance
--

CREATE FUNCTION public.put_pt(uuid, point, character, uuid, uuid) RETURNS SETOF peticiones.peticiones
    LANGUAGE plpgsql
    AS $_$

-- Usage: SELECT put_pt(2,point(77.21231,77.21434),'Av. Mateo 322#',2,1);
BEGIN
	RETURN QUERY
		UPDATE peticiones.peticiones 
		SET ubicacion_pt=$2, direccion_pt=$3, id_p=$4, id_cm=$5 
		WHERE id_pt=$1
	RETURNING *;
END;

$_$;


ALTER FUNCTION public.put_pt(uuid, point, character, uuid, uuid) OWNER TO appbulance;

--
-- Name: auditorias; Type: TABLE; Schema: auditorias; Owner: appbulance
--

CREATE TABLE auditorias.auditorias (
    id_audit uuid DEFAULT uuid_generate_v4() NOT NULL,
    timestamp_audit timestamp with time zone DEFAULT now(),
    type_audit character(7) NOT NULL,
    table_audit character(30) NOT NULL,
    field_audit character(30),
    old_data_audit json,
    new_data_audit json
);


ALTER TABLE auditorias.auditorias OWNER TO appbulance;

--
-- Name: navegacion; Type: TABLE; Schema: configuraciones; Owner: appbulance
--

CREATE TABLE configuraciones.navegacion (
    nav_style character varying(50) DEFAULT 'navbar-dark bg-dark'::character varying,
    body_style character varying(50) DEFAULT 'bg-dark'::character varying,
    id_usr uuid,
    CONSTRAINT body_chk CHECK (((body_style)::text = ANY (ARRAY[('bg-light'::character varying)::text, ('bg-dark'::character varying)::text]))),
    CONSTRAINT navbar_chk CHECK (((nav_style)::text = ANY (ARRAY[('navbar-dark bg-dark'::character varying)::text, ('navbar-light bg-light'::character varying)::text])))
);


ALTER TABLE configuraciones.navegacion OWNER TO appbulance;

--
-- Name: alergias; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.alergias (
    id_alergia uuid DEFAULT uuid_generate_v4() NOT NULL,
    descripcion_alergia text,
    id_p uuid NOT NULL
);


ALTER TABLE pacientes.alergias OWNER TO appbulance;

--
-- Name: enfermedad_cardiovascular; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.enfermedad_cardiovascular (
    id_ecardio uuid DEFAULT uuid_generate_v4() NOT NULL,
    descripcion_ecardio text,
    id_p uuid
);


ALTER TABLE pacientes.enfermedad_cardiovascular OWNER TO appbulance;

--
-- Name: medicamentos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.medicamentos (
    id_medicamento uuid DEFAULT uuid_generate_v4() NOT NULL,
    descripcion_medicamento text,
    id_p uuid
);


ALTER TABLE pacientes.medicamentos OWNER TO appbulance;

--
-- Name: padecimientos; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.padecimientos (
    id_padecimiento uuid DEFAULT uuid_generate_v4() NOT NULL,
    descripcion_padecimiento text,
    id_p uuid
);


ALTER TABLE pacientes.padecimientos OWNER TO appbulance;

--
-- Name: seguro_medico; Type: TABLE; Schema: pacientes; Owner: appbulance
--

CREATE TABLE pacientes.seguro_medico (
    id_sm uuid DEFAULT uuid_generate_v4() NOT NULL,
    id_p uuid,
    descripcion_sm text
);


ALTER TABLE pacientes.seguro_medico OWNER TO appbulance;

--
-- Name: usuarios; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.usuarios (
    id_usr uuid DEFAULT uuid_generate_v4() NOT NULL,
    email_usr character varying(100) NOT NULL,
    telefono_usr character varying(13),
    contrasena_usr character varying(255) NOT NULL,
    tipo_usr integer,
    fecha_registro_usr date,
    fecha_ultimo_acceso_usr date,
    ip_ultimo_acceso_usr character varying(15),
    valido_usr boolean DEFAULT false
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
    id_cm uuid DEFAULT uuid_generate_v4() NOT NULL,
    nombre_cm character varying(80),
    direccion_cm character varying(50),
    coordenadas_cm point,
    rango_servicio_cm point[]
)
INHERITS (perfiles.usuarios);


ALTER TABLE perfiles.crums OWNER TO appbulance;

--
-- Name: personas; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.personas (
    id_prs uuid DEFAULT uuid_generate_v4(),
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
    id_p uuid DEFAULT uuid_generate_v4() NOT NULL,
    id_cm uuid,
    tipo_sangre_p character varying(3),
    nss_p character varying(12),
    CONSTRAINT tipo_sangre_chk CHECK (((tipo_sangre_p)::text = ANY (ARRAY[('A+'::character varying)::text, ('A-'::character varying)::text, ('B+'::character varying)::text, ('B-'::character varying)::text, ('O+'::character varying)::text, ('O-'::character varying)::text, ('AB+'::character varying)::text, ('AB-'::character varying)::text])))
)
INHERITS (perfiles.personas);


ALTER TABLE perfiles.pacientes OWNER TO appbulance;

--
-- Name: tamps; Type: TABLE; Schema: perfiles; Owner: appbulance
--

CREATE TABLE perfiles.tamps (
    id_tmp uuid DEFAULT uuid_generate_v4() NOT NULL,
    id_cm uuid,
    grado_tmp text,
    experiencia_tmp text,
    fecha_ingreso_tmp date
)
INHERITS (perfiles.personas);


ALTER TABLE perfiles.tamps OWNER TO appbulance;

--
-- Name: crums id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN id_usr SET DEFAULT uuid_generate_v4();


--
-- Name: crums valido_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.crums ALTER COLUMN valido_usr SET DEFAULT false;


--
-- Name: pacientes id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_usr SET DEFAULT uuid_generate_v4();


--
-- Name: pacientes id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN id_prs SET DEFAULT uuid_generate_v4();


--
-- Name: pacientes valido_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.pacientes ALTER COLUMN valido_usr SET DEFAULT false;


--
-- Name: personas id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN id_usr SET DEFAULT uuid_generate_v4();


--
-- Name: personas valido_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.personas ALTER COLUMN valido_usr SET DEFAULT false;


--
-- Name: tamps id_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_usr SET DEFAULT uuid_generate_v4();


--
-- Name: tamps id_prs; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN id_prs SET DEFAULT uuid_generate_v4();


--
-- Name: tamps valido_usr; Type: DEFAULT; Schema: perfiles; Owner: appbulance
--

ALTER TABLE ONLY perfiles.tamps ALTER COLUMN valido_usr SET DEFAULT false;

--
-- Name: ambulancias id_a_pk; Type: CONSTRAINT; Schema: administracion; Owner: appbulance
--

ALTER TABLE ONLY administracion.ambulancias
    ADD CONSTRAINT id_a_pk PRIMARY KEY (id_a);


--
-- Name: auditorias auditorias_pkey; Type: CONSTRAINT; Schema: auditorias; Owner: appbulance
--

ALTER TABLE ONLY auditorias.auditorias
    ADD CONSTRAINT auditorias_pkey PRIMARY KEY (id_audit);


--
-- Name: alergias alergias_pkey; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.alergias
    ADD CONSTRAINT alergias_pkey PRIMARY KEY (id_alergia);


--
-- Name: enfermedad_cardiovascular enfermedad_cardiovascular_pkey; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.enfermedad_cardiovascular
    ADD CONSTRAINT enfermedad_cardiovascular_pkey PRIMARY KEY (id_ecardio);


--
-- Name: medicamentos medicamentos_pkey; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id_medicamento);


--
-- Name: padecimientos padecimientos_pkey; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.padecimientos
    ADD CONSTRAINT padecimientos_pkey PRIMARY KEY (id_padecimiento);


--
-- Name: seguro_medico seguro_medico_pkey; Type: CONSTRAINT; Schema: pacientes; Owner: appbulance
--

ALTER TABLE ONLY pacientes.seguro_medico
    ADD CONSTRAINT seguro_medico_pkey PRIMARY KEY (id_sm);


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
-- Name: peticiones peticiones_pkey; Type: CONSTRAINT; Schema: peticiones; Owner: appbulance
--

ALTER TABLE ONLY peticiones.peticiones
    ADD CONSTRAINT peticiones_pkey PRIMARY KEY (id_pt);


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
-- PostgreSQL database dump complete
--



