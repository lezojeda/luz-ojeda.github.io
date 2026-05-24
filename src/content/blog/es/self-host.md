---
title: Self host
pubDate: 2026-05-24
tags: ["tech"]
---
El año pasado me compré una [mini pc Beelink Mini S](https://www.bee-link.com/products/beelink-mate-mini-s-dock) para empezar a tener un "homelab"/[server en casa](https://en.wikipedia.org/wiki/Home_server) 

Ya tenía un Toshiba HDD externo de 2TB como backup donde guardo fotos, videos, archivos personales y demás desde hace varios años así que aproveché a vincularlo a la mini PC para tener un sistema básico entre ambos

La mini PC venía con Win11 pero para hacerla más ligera y por puro gusto personal le instalé linux Debian

A lo largo del último año fui agregando varios servicios a la mini pc prendida 24/7 y al "sistema" compuesto por todos los dispositivos que tengo en mi casa.
## [syncthing](https://syncthing.net/)
Un programa de sincronización continua de archivos que usa [su propio protocolo](https://docs.syncthing.net/specs/bep-v1.html#bep-v1) y uso desde alrededor de 2024 para sincronizar varias carpetas y archivos en tiempo real entre mi celular, laptops y PC. Antes usaba Google Drive para estas cosas, pero por una cuestión de costo, velocidad, privacidad y considerando lo uso para archivos personales era un sinsentido seguir usando algo como Drive en vez de una solución somo syncthing, más que recomendado.
## [jellyfin](https://jellyfin.org/)
Un [media server](https://es.wikipedia.org/wiki/Jellyfin) open source. Para poder ver películas y series de este server en la TV me compré un [stick Xiaomi](https://www.mi.com/ar/product/xiaomi-tv-stick-4k/) la cual usa Android TV y se le puede instalar la app de Jellyfin. Básicamente lo que tengo armado es:
```
Películas y series en HDD externo Toshiba
     ↓
Jellyin Server corriendo en Mini PC Beelink
     ↓
TV Stick Xioami con Android TV y App Jellyfin
     ↓ (HDMI)
TV Samsung
```
## [calibre](https://calibre-ebook.com)
Hace varios años que organizo mis libros con esta aplicación pero quise empezar a tener un servidor de la misma para mantener una única librería a la cual acceder desde cualquier dispositivo y guardar los libros en el HDD externo. Es bastante fácil de setupear, dentro de todo lo que selfhosteo fue lo más fácil de armar ya que está todo [bastante optimizado](https://manual.calibre-ebook.com/server.html).

No es lo más cómodo ni mejor acceder por un browser pero si es solo para leer alcanza.
## [grafana](https://grafana.com/)
Más conocida que el resto seguramente por su extendido uso en ambientes productivos y empresariales. Aunque nunca usé Grafana en ningún trabajo y probablemente sea overkill para mi uso me sirvió para aprender un poco del programa.

Uso [prometheus](https://prometheus.io/) para la emisión y almacenamiento de métricas generales de la mini PC como temperatura, uso del disco, etc. e [InfluxDB](https://www.influxdata.com/) para datos de una [ESP32](https://es.wikipedia.org/wiki/ESP32) con un sensor de temperatura y humedad, un pequeño proyecto que en otro post cuento de qué se trata.
![Temperaturas y humedad en Grafana](../../../images/grafana_temp.png)
La temperatura y humedad relativa visualizadas en Grafana del cuarto donde tengo el server durante mayo de 2026.
## nginx
Anteriormente tenía esta página personal hosteada en GitHub Pages pero por hobbie, aprendizaje y gusto ahora está servida a través de un [túnel de cloudflare](https://developers.cloudflare.com/tunnel/) hacia una instancia de nginx corriendo en la mini PC. Capaz en un futuro me tome la molestia de configurar lo que ahora está haciendo Cloudflare pero hoy me evita lidiar con NAT, mi IP dinámica, configurar el router de mi ISP, bots, etc.

Después de pasarla de GitHub Pages a nginx [servir esto](https://lojeda.co/asteroids) fue trivial a comparación de lo que tendría que haber hecho de la forma anterior. Como a futuro quiero agregar más rutas con proyectos o cualquier cosa que quisiera compartir como recetas en formato .md que manejo en Obsidian migré a una solución con nginx.
## [samba](https://en.wikipedia.org/wiki/Samba_(software))
Una implementación de software libre del protocolo SMB usado en Windows. Tener una instancia de este programa en la mini pc me permite mapear un drive en mi PC de escritorio al HDD Toshiba para cuando necesito mover o copiar un archivo o carpeta más fácilmente.

Para optimizar las transferencias de archivos grandes como videos, la PC de escritorio y la mini PC están conectadas via ethernet para aprovechar la velocidad, la proximidad entre ambas y no usar WiFi innecesariamente. Para esto configuré Samba para que esté únicamente vinculado a la interfaz Ethernet de la mini PC.