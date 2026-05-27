---
title: Que suman los tests unitarios? 
pubDate: 2026-05-27
tags: ["tech"]
---

El otro día me crucé con [este thread](https://www.reddit.com/r/devsarg/comments/1tnm9kr/que_suman_los_tests_unitarios/) y aunque no me parezca increíble que nos cuestionemos la utilidad de los tests en plena era de los LLMs me surgió escribir algo corto al respecto.

Más allá de la obviedad de la utilidad en checks de pipelines para pull/merge requests y deploys algo no tan obvio es la utilidad en **refactors**. Cuando tu app vibecodeada llegue a una magnitud imposible de entender incluso para tu LLM de confianza, lo veas pelear con incontables `Wait—` o `Actually— let me take a closer look` y tengas que aceptar el inevitable e innecesario refactor vas a agradecer a tu yo del pasado el tener una test suite coherente para poder confiar en los cambios al refactorizar.

Tests -> confianza en refactors -> devs felices.