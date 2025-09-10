---
layout: recipe-layout.html
---
<h2>Dessert</h2>
{% for recipe in collections.dessert %}
<p><a href="{{recipe.url}}">{{ recipe.data.title }}</a></p>
{% endfor %}

<h2>Baking</h2>
{% for recipe in collections.baking %}
<p><a href="{{recipe.url}}">{{ recipe.data.title }}</a></p>
{% endfor %}

<figure>
![Citrus Cake]({{ pathPrefix }}img/citrus-cake.jpg)
<figcaption>Citrus Cake</figcaption>
</figure>