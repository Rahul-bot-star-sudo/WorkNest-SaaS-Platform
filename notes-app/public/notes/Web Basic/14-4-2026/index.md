
```javascript id="k2m9pl"
<!DOCTYPE html>
<html>
<head>
<title>My UI</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<style>
body {
  transition: all 0.3s ease;
}

.dark-mode {
  background-color: #121212;
  color: white;
}

/* container */
.dark-mode .container {
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
}

/* dropdown */
.dark-mode .dropdown-menu {
  background-color: #1e1e1e;
}

/* dropdown text */
.dark-mode .dropdown-item {
  color: white;
}

.dark-mode .dropdown-item:hover {
  background-color: #333;
}

/* nav links */
.dark-mode .nav-link {
  color: #ddd !important;
}

.dark-mode .nav-link:hover {
  color: white !important;
}

/* form input */
.dark-mode .form-control {
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #555;
}

/* card */
.dark-mode .card {
  background-color: #1e1e1e;
  color: white;
}

/* button fix */
.dark-mode .btn-outline-success {
  color: #90ee90;
  border-color: #90ee90;
}

.dark-mode .btn-outline-success:hover {
  background-color: #90ee90;
  color: black;
}
</style>

</head>

<body class="d-flex flex-column min-vh-100 bg-light text-dark">

<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar scroll</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarScroll">

      <ul class="navbar-nav me-auto">

        <li class="nav-item">
          <a class="nav-link active" href="#" onclick="showSection('home')">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Link</a>

          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="showSection('home')">Home</a></li>
            <li><a class="dropdown-item" href="#" onclick="showSection('form')">Form</a></li>
            <li><a class="dropdown-item" href="#" onclick="showSection('about')">About</a></li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link disabled">Link</a>
        </li>

      </ul>

      <form class="d-flex">
        <input class="form-control me-2" placeholder="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
        <button type="button" class="btn btn-outline-light ms-2" onclick="toggleTheme()">Toggle Theme</button>
      </form>

    </div>
  </div>
</nav>
</div>

<div class="container mt-4 flex-grow-1" id="mainContainer">

  <div id="home">
    <h2>Home Section</h2>
  </div>

  <div id="form" style="display:none;">
    <h2>Form Section</h2>
  </div>

  <div id="about" style="display:none;">
    <h2>About Section</h2>
  </div>

</div>

<!-- ✅ YOUR COMMENT BLOCK (RESTORED EXACTLY) -->
<!-- <div class="container">
  <h1 class="text-primary">Hello Bootstrap</h1>
  <p style="white-space: pre-line;"> ⚡ 1. Bootstrap “templates” असल में क्या हैं?

Bootstrap तुम्हें ये देता है:

Navbar
Cards
Forms
Buttons
Grid

👉 इन्हें जोड़कर ही तुम UI बनाते हो = यही “template” है।</p>
</div> -->

<footer class="bg-dark text-white text-center p-2">
  © 2026 My App
</footer>

<script>

function showSection(sectionId){

  let sections = ["home","form","about"];

  sections.forEach(id=>{
    document.getElementById(id).style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";

  let links = document.querySelectorAll(".dropdown-item, .nav-link");
  links.forEach(link=>link.classList.remove("active"));

  event.target.classList.add("active");

  let dropdown = document.querySelector(".dropdown-menu.show");
  if(dropdown){
    dropdown.classList.remove("show");
  }
}

function toggleTheme(){

  let body = document.body;
  let navbar = document.querySelector(".navbar");
  let footer = document.querySelector("footer");
  let container = document.getElementById("mainContainer");

  if(body.classList.contains("bg-light")){

    body.classList.replace("bg-light","bg-dark");
    body.classList.replace("text-dark","text-white");

    container.classList.add("bg-dark","text-white");

    navbar.classList.remove("bg-dark","navbar-dark");
    navbar.classList.add("bg-light","navbar-light");

    footer.classList.remove("bg-dark","text-white");
    footer.classList.add("bg-light","text-dark");

 } else {

    // LIGHT MODE
    body.classList.replace("bg-dark","bg-light");
    body.classList.replace("text-white","text-dark");

    container.classList.remove("bg-dark","text-white");

    navbar.classList.remove("bg-light","navbar-light");
    navbar.classList.add("bg-dark","navbar-dark");

    footer.classList.remove("bg-light","text-dark");
    footer.classList.add("bg-dark","text-white");

    // BUTTON FIX
    toggleBtn.classList.remove("btn-outline-light");
    toggleBtn.classList.add("btn-outline-dark");
  }
}
</script>

</body>
</html>
```
