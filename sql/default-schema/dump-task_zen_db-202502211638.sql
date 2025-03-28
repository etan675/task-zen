PGDMP  1    &                }           task_zen_db    14.15    17.0 $    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            Z           1262    16389    task_zen_db    DATABASE     v   CREATE DATABASE task_zen_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE task_zen_db;
                     me    false            [           0    0    task_zen_db    DATABASE PROPERTIES     4   ALTER DATABASE task_zen_db SET "TimeZone" TO 'utc';
                          me    false                        2615    16395    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            \           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    5            ]           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                        pg_database_owner    false    5            �            1259    16396    Session    TABLE     �   CREATE TABLE public."Session" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "sessionData" json
);
    DROP TABLE public."Session";
       public         heap r       me    false    5            �            1259    16402    Session_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Session_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 '   DROP SEQUENCE public."Session_id_seq";
       public               me    false    5            �            1259    16403    Session_id_seq1    SEQUENCE     �   CREATE SEQUENCE public."Session_id_seq1"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Session_id_seq1";
       public               me    false    209    5            ^           0    0    Session_id_seq1    SEQUENCE OWNED BY     F   ALTER SEQUENCE public."Session_id_seq1" OWNED BY public."Session".id;
          public               me    false    211            �            1259    16404    Task    TABLE     �   CREATE TABLE public."Task" (
    content character varying,
    checked boolean DEFAULT false NOT NULL,
    id integer NOT NULL,
    "userId" integer
);
    DROP TABLE public."Task";
       public         heap r       me    false    5            �            1259    16410    Task_id_seq    SEQUENCE     ~   CREATE SEQUENCE public."Task_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 $   DROP SEQUENCE public."Task_id_seq";
       public               me    false    5            �            1259    16411    Task_id_seq1    SEQUENCE     �   CREATE SEQUENCE public."Task_id_seq1"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Task_id_seq1";
       public               me    false    5    212            _           0    0    Task_id_seq1    SEQUENCE OWNED BY     @   ALTER SEQUENCE public."Task_id_seq1" OWNED BY public."Task".id;
          public               me    false    214            �            1259    16412    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."User";
       public         heap r       me    false    5            �            1259    16417    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public               me    false    5    215            `           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public               me    false    216            �           2604    16418 
   Session id    DEFAULT     m   ALTER TABLE ONLY public."Session" ALTER COLUMN id SET DEFAULT nextval('public."Session_id_seq1"'::regclass);
 ;   ALTER TABLE public."Session" ALTER COLUMN id DROP DEFAULT;
       public               me    false    211    209            �           2604    16419    Task id    DEFAULT     g   ALTER TABLE ONLY public."Task" ALTER COLUMN id SET DEFAULT nextval('public."Task_id_seq1"'::regclass);
 8   ALTER TABLE public."Task" ALTER COLUMN id DROP DEFAULT;
       public               me    false    214    212            �           2604    16420    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public               me    false    216    215            M          0    16396    Session 
   TABLE DATA           M   COPY public."Session" (id, "userId", "createdAt", "sessionData") FROM stdin;
    public               me    false    209   �#       P          0    16404    Task 
   TABLE DATA           @   COPY public."Task" (content, checked, id, "userId") FROM stdin;
    public               me    false    212   �$       S          0    16412    User 
   TABLE DATA           5   COPY public."User" (id, email, password) FROM stdin;
    public               me    false    215   �$       a           0    0    Session_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Session_id_seq"', 1, false);
          public               me    false    210            b           0    0    Session_id_seq1    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Session_id_seq1"', 12, true);
          public               me    false    211            c           0    0    Task_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Task_id_seq"', 1, false);
          public               me    false    213            d           0    0    Task_id_seq1    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Task_id_seq1"', 5, true);
          public               me    false    214            e           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 1, true);
          public               me    false    216            �           2606    16422    Session Session_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_pkey";
       public                 me    false    209            �           2606    16424    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 me    false    215            �           2606    16426    Task task_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT task_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public."Task" DROP CONSTRAINT task_pk;
       public                 me    false    212            �           2606    16428    User user_unique 
   CONSTRAINT     N   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT user_unique UNIQUE (email);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT user_unique;
       public                 me    false    215            �           2606    16429    Session fk_userId    FK CONSTRAINT     v   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "fk_userId" FOREIGN KEY ("userId") REFERENCES public."User"(id);
 ?   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "fk_userId";
       public               me    false    3005    209    215            �           2606    16434    Task fk_userid    FK CONSTRAINT     �   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT fk_userid FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE;
 :   ALTER TABLE ONLY public."Task" DROP CONSTRAINT fk_userid;
       public               me    false    212    215    3005            M   �   x���=�@��NA�g2?���TĆ�F�D��pw�Ci�O�~UT1�o�Z���)xL���^S~8�]��͙;�a<<����w8��[����dMP*"�6�8�"�!1$�(	���"Ҭ��B�#"a�6���ȃ��
��C��w��������      P   )   x�+I,�V0�L�4�4�*q9K8a#������� ��	�      S   $   x�3�LI��w(I,ήJ��K���LLJ����� �n     