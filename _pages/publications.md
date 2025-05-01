---
layout: page
permalink: /publications/
title: publications
description: A list of my publications, newest first
sections:
  - bibquery: "@article|@inproceedings"
    text: "Publications"
  - bibquery: "@phdthesis|@mastersthesis"
    text: "Theses"
years: [2024, 2023, 2022, 2021, 2020, 2019, 2017, 2016, 2014]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
