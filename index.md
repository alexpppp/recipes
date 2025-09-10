---
layout: recipe-layout.html
---
<input id="search-input" type="search" placeholder="Search...">

<div id="tag-buttons">
  <button data-tag="all" class="tag-button active">All</button>
  <button data-tag="dessert" class="tag-button">Dessert</button>
  <button data-tag="baking" class="tag-button">Baking</button>
</div>


<ul id="recipe-list">
    {% for recipe in collections.recipe %}
        <li data-tags="{{ recipe.data.tags | join(' ') }}" >
        <a href="{{ recipe.url | url }}">       
        <div class="recipe-card">
          <h4>{{ recipe.data.title }}</h4>
        {% for tag in recipe.data.tags %}
            {% if tag != "recipe" %}
                <kbd>{{ tag[0] | upper }}{{ tag.slice(1) }}</kbd>
            {% endif %}
        {% endfor %}
        </div>
        </a>
        </li>
        {% endfor %}
</ul>
<p id="no-results" style="display: none; font-style: italic; color: gray;">
  No matches found.
</p>

<script>
  const searchInput = document.getElementById('search-input');
  const tagButtons = document.querySelectorAll('.tag-button');
  const recipeItems = document.querySelectorAll('#recipe-list li');

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
    // Show or hide the "no results" message
  document.getElementById('no-results').style.display = visibleCount === 0 ? '' : 'none';
  }

  // 🔍 Search listener
  searchInput.addEventListener('input', filterRecipes);

  // 🏷 Tag buttons listener
  tagButtons.forEach(button => {
    button.addEventListener('click', () => {
      tagButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeTag = button.dataset.tag;
      filterRecipes();
    });
  });
</script>