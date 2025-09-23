---
pageTitle: |
  <strong>Recipes </strong><span class="has-text-weight-light is-size-6">by M & A</span>
layout: index-layout.njk
---
<div>
<section class="hero">
  <div class="hero-body">
    <div class="block">
      <div class="control has-icons-left">
        <input id="search-input" class="input" type="search" />
        <span class="icon is-medium is-left"><i class="fas fa-search"></i></span>
      </div>
    </div>
    <div class="block">
      <div id="tag-buttons" class="buttons has-addons">
        <button data-tag="all" class="button is-primary is-active">All</button>
        <button data-tag="baking" class="button is-primary">Baking</button>
        <button data-tag="breakfast" class="button is-primary">Breakfast</button>
        <button data-tag="dinner" class="button is-primary">Dinner</button>
        <button data-tag="dessert" class="button is-primary">Dessert</button>
        <button data-tag="misc" class="button is-primary">Misc</button>
        <button data-tag="salad" class="button is-primary">Salad</button>
        <button data-tag="snack" class="button is-primary">Snack</button>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div id="recipe-list">
    {% for recipe in collections.recipe %}
      <a href="{{ recipe.url | url }}">
        <div class="box" data-tags="{{ recipe.data.tags | join(' ') }}" >
          <article class="media">
            {% if recipe.data.img %}
            <div class="media-left">
              <figure class="image is-96x96">
                <img src="{{ recipe.data.img }}" alt="Image" />
              </figure>
            </div>
            {% endif %}
            <div>
              <div class="content">
                <h2 class="title is-5">{{ recipe.data.title }}</h2>
                <div class="tags has-addons">
                {% for tag in recipe.data.tags %}
                    {% if tag != "recipe" %}
                        <span class="tag is-primary is-light">{{ tag[0] | upper }}{{ tag.slice(1) }}</span>
                    {% endif %}
                {% endfor %}
                </div>
              </div>
            </div>
          </article>
        </div>
      </a>
    {% endfor %}
    </div>
    <div id="no-results" style="display: none;" class="block has-background-light p-5 is-italic">
      <span class="icon is-medium is-left"><i class="fas fa-triangle-exclamation"></i></span>Sorry, no matches!
    </div>
  </div>
</section>

<script>
  const searchInput = document.getElementById('search-input');
  const tagButtons = document.querySelectorAll('#tag-buttons .button'); // Make sure this matches your HTML
  const recipeItems = document.querySelectorAll('#recipe-list .box');

  let activeTag = 'all';

  function filterRecipes() {
    const query = searchInput.value.toLowerCase();
    let visibleCount = 0;

    recipeItems.forEach(item => {
      const tags = item.dataset.tags.split(' ');
      const text = item.textContent.toLowerCase();

      const tagMatch = activeTag === 'all' || tags.includes(activeTag);
      const searchMatch = text.includes(query);

      const shouldShow = tagMatch && searchMatch;
      item.style.display = shouldShow ? '' : 'none';

      if (shouldShow) visibleCount++;
    });

    document.getElementById('no-results').style.display = visibleCount === 0 ? '' : 'none';
  }

  // 🔍 Search listener
  searchInput.addEventListener('input', filterRecipes);

  // 🏷 Tag button listeners
  tagButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'is-active' from all buttons
      tagButtons.forEach(btn => btn.classList.remove('is-active'));

      // Add 'is-active' to clicked button
      button.classList.add('is-active');

      // Set active tag and filter
      activeTag = button.dataset.tag;
      filterRecipes();
    });
  });
</script>
</div>