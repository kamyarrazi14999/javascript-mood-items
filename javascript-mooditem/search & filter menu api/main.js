const menuList = document.querySelector(".menu");
const loading = document.querySelector(".loading-text");
const searchInput = document.getElementById("search-input");
const buttonsContainer = document.querySelector(".buttons-container");

// events
searchInput.addEventListener("input", searchItemsByName);

// store menu items from api
let menuItems = null;

// function to get items from api
const fetchMenuItems = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );
    const data = await response.data;

    menuItems = data.meals;


    // get all categories to create button by its name
    const categories = menuItems.reduce(
      (acc, item) => {
        if (item.strCategory && !acc.includes(item.strCategory)) {
          acc.push(item.strCategory);
        }
        return acc;
      },
      ["all"]
      
    );

    // create button for each category
    createCategoryButtons(categories);

    loading.style.display = "none"; // hide loading when data arrived
    displayMenuItems(menuItems);
  } catch (error) {
    menuList.innerHTML = `<h2 class='not-found-text'>${error.message}</h2>`;
  }
  
};

// function to show items
const displayMenuItems = (items) => {
  menuList.innerHTML = "";

  // no items exist
  if (items.length === 0) {
    menuList.innerHTML = `<h2 class='not-found-text'>Item Doesnt Exist!</h2>`;
  }
  items.map((item) => {
    const menuItem = `
    <div class='menu-item'>
        <img src='${item.strMealThumb}' alt='${item.strMeal}' class='menu-img' />
        <h3>${item.strMeal}<h3>
    </div>
    `;

    menuList.innerHTML += menuItem;
  });
};

// SEARCH MENU ITEMS BY ITS NAME
function searchItemsByName() {
  const searchedText = searchInput.value.toLowerCase().trim();

  const filteredItmes = menuItems.filter((item) => {
    const matchedItems = item.strMeal.toLowerCase().includes(searchedText);
    return matchedItems;
  });

  // update menu list
  displayMenuItems(filteredItmes);
}

// function to create category buttons
const createCategoryButtons = (categories) => {
  categories.map((category) => {
    const button = `
    <button type="button"
     data-category='${category}'
     class="filter-btn"
     onclick='filterItemsByCategory(this)'
    >${category}</button>
    `;
    buttonsContainer.innerHTML += button;
  });
};

// function to filter items by its category
const filterItemsByCategory = (btn) => {
  const category = btn.dataset.category;

  const filteredItems = menuItems.filter((item) => {
    const matchedItems =
      item.strCategory.toLowerCase() === category.toLowerCase();
    return matchedItems;
  });

  searchInput.value = "";
  displayMenuItems(filteredItems);
  // show all items when click to all button 
  if (category.toLowerCase() === 'all') {
    displayMenuItems(menuItems);
    
  }

};

fetchMenuItems();
