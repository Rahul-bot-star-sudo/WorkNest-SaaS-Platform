```javascript id="k2m9pl"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
  <title>Simple UI - Image Option</title>
  <!-- Bootstrap 5 CSS (lightweight & responsive) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap JS Bundle for navbar toggler, dropdowns -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <style>
    /* simple transitions and dark mode overrides - minimal but clean */
    body {
      transition: background-color 0.2s ease, color 0.2s;
    }
    /* dark mode class styles - only what's needed */
    body.dark-mode {
      background-color: #121212;
      color: #f0f0f0;
    }
    body.dark-mode .container-custom {
      background-color: #1e1e1e;
      border-radius: 10px;
      padding: 16px;
    }
    body.dark-mode .card {
      background-color: #2a2a2a;
      border-color: #444;
      color: #eee;
    }
    body.dark-mode .form-control {
      background-color: #333;
      border-color: #555;
      color: white;
    }
    body.dark-mode .form-control:focus {
      background-color: #3a3a3a;
      color: white;
    }
    body.dark-mode .dropdown-menu {
      background-color: #2c2c2c;
    }
    body.dark-mode .dropdown-item {
      color: #eee;
    }
    body.dark-mode .dropdown-item:hover {
      background-color: #444;
    }
    body.dark-mode .navbar-light .navbar-nav .nav-link {
      color: #ddd;
    }
    body.dark-mode .btn-outline-dark {
      color: #ddd;
      border-color: #aaa;
    }
    body.dark-mode .btn-outline-dark:hover {
      background-color: #555;
      color: white;
    }
    /* simple gallery grid responsiveness */
    .gallery-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
      border: 1px solid #dee2e6;
    }
    .gallery-img:hover {
      opacity: 0.9;
      transform: scale(1.01);
    }
    .card-img-top {
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .container-custom {
      transition: background 0.2s;
    }
    footer {
      font-size: 0.9rem;
    }
    /* simple remove btn style */
    .remove-img {
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
    }
  </style>
</head>
<body class="bg-light text-dark">

<!-- Navigation bar - simple, responsive, no emoji -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Simple UI</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#" onclick="showSection('home'); return false;">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onclick="showSection('form'); return false;">Form</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="showSection('home'); return false;">Home</a></li>
            <li><a class="dropdown-item" href="#" onclick="showSection('form'); return false;">Form</a></li>
            <li><a class="dropdown-item" href="#" onclick="showSection('about'); return false;">About</a></li>
            <li><a class="dropdown-item" href="#" onclick="showSection('gallery'); return false;">Gallery</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onclick="showSection('gallery'); return false;">Gallery</a>
        </li>
      </ul>
      <form class="d-flex" role="search" id="searchForm">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchInput">
        <button class="btn btn-outline-success" type="submit">Search</button>
        <button type="button" class="btn btn-outline-light ms-2" id="themeToggleBtn" onclick="toggleTheme()">Theme</button>
      </form>
    </div>
  </div>
</nav>

<!-- Main container: simple and responsive -->
<div class="container mt-4 flex-grow-1 container-custom" id="mainContainer">
  <!-- Home Section -->
  <div id="home">
    <div class="p-3 bg-white rounded shadow-sm border">
      <h2>Home Section</h2>
      <p>This is a simple responsive UI with Bootstrap. You can switch between sections and toggle dark/light mode. Gallery section lets you add and view images.</p>
      <button class="btn btn-primary mt-2" onclick="showSection('gallery')">Go to Gallery</button>
    </div>
  </div>

  <!-- Form Section -->
  <div id="form" style="display:none;">
    <div class="p-3 bg-white rounded shadow-sm border">
      <h2>Form Section</h2>
      <form id="demoForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Your name">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" rows="2"></textarea>
        </div>
        <button type="button" class="btn btn-success" onclick="submitForm()">Submit</button>
        <span id="formMsg" class="ms-2 text-muted"></span>
      </form>
    </div>
  </div>

  <!-- About Section -->
  <div id="about" style="display:none;">
    <div class="p-3 bg-white rounded shadow-sm border">
      <h2>About Section</h2>
      <p>This template includes a theme switcher, responsive navbar, and a gallery where you can add your own images. Use the "Gallery" link to upload images from your device.</p>
      <p>All images are stored temporarily in your browser session. You can remove or reset them.</p>
    </div>
  </div>

  <!-- Gallery Section with image upload option (simple) -->
  <div id="gallery" style="display:none;">
    <div class="p-3 bg-white rounded shadow-sm border">
      <h2 class="mb-3">Image Gallery</h2>
      
      <!-- Simple image upload option -->
      <div class="mb-4 p-3 border rounded bg-light">
        <label for="imageUploadInput" class="form-label fw-semibold">Upload Image (jpg/png)</label>
        <input type="file" class="form-control" id="imageUploadInput" accept="image/jpeg,image/png,image/jpg">
        <div id="imagePreview" class="mt-2"></div>
        <div class="mt-2">
          <button class="btn btn-sm btn-primary" id="addImageBtn" disabled>Add to Gallery</button>
          <button class="btn btn-sm btn-secondary" id="clearPreviewBtn" style="display:none;">Clear Preview</button>
        </div>
        <small class="text-muted">Select an image file and click Add to Gallery.</small>
      </div>
      
      <!-- Gallery grid (responsive: 3 cols on desktop, 2 on tablet, 1 on mobile via Bootstrap) -->
      <div class="row g-3" id="galleryGrid">
        <!-- default images - 3 sample images -->
        <div class="col-md-4 col-sm-6 col-12" data-img-id="0">
          <div class="card h-100 shadow-sm">
            <img src="https://picsum.photos/id/15/300/200" class="gallery-img card-img-top" alt="Sample Nature" style="height: 180px;">
            <div class="card-body p-2 text-center">
              <p class="card-text small">Mountain</p>
              <button class="btn btn-sm btn-outline-danger remove-img" data-id="0">Remove</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-12" data-img-id="1">
          <div class="card h-100 shadow-sm">
            <img src="https://picsum.photos/id/26/300/200" class="gallery-img card-img-top" alt="River" style="height: 180px;">
            <div class="card-body p-2 text-center">
              <p class="card-text small">River</p>
              <button class="btn btn-sm btn-outline-danger remove-img" data-id="1">Remove</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 col-12" data-img-id="2">
          <div class="card h-100 shadow-sm">
            <img src="https://picsum.photos/id/169/300/200" class="gallery-img card-img-top" alt="City" style="height: 180px;">
            <div class="card-body p-2 text-center">
              <p class="card-text small">City View</p>
              <button class="btn btn-sm btn-outline-danger remove-img" data-id="2">Remove</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-3 d-flex justify-content-between">
        <button class="btn btn-outline-secondary btn-sm" id="resetGalleryBtn">Reset Default Images</button>
        <span id="galleryCounter" class="small text-muted align-self-center">3 images</span>
      </div>
      <div id="emptyGalleryWarning" class="alert alert-warning mt-3" style="display:none;">Gallery is empty. Upload images or reset defaults.</div>
    </div>
  </div>
</div>

<!-- Simple Footer -->
<footer class="bg-dark text-white text-center p-2 mt-4">
  <small>© 2026 Simple App | Image option added</small>
</footer>

<!-- Your comment block is preserved exactly as requested -->
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

<script>
  // Simple global state for gallery images (store image data URLs or default URLs)
  let galleryImages = [
    { src: "https://picsum.photos/id/15/300/200", alt: "Mountain" },
    { src: "https://picsum.photos/id/26/300/200", alt: "River" },
    { src: "https://picsum.photos/id/169/300/200", alt: "City View" }
  ];
  
  let nextImageId = 3; // next index for new images
  let currentPreviewFile = null; // store selected file object
  
  // Helper: render gallery grid from galleryImages array
  function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyWarning = document.getElementById('emptyGalleryWarning');
    const galleryCounter = document.getElementById('galleryCounter');
    
    if (!galleryGrid) return;
    
    if (galleryImages.length === 0) {
      galleryGrid.innerHTML = '<div class="col-12 text-center text-muted py-4">No images in gallery. Use upload option above.</div>';
      if (emptyWarning) emptyWarning.style.display = 'block';
      if (galleryCounter) galleryCounter.innerText = '0 images';
      return;
    }
    
    if (emptyWarning) emptyWarning.style.display = 'none';
    if (galleryCounter) galleryCounter.innerText = galleryImages.length + ' image' + (galleryImages.length !== 1 ? 's' : '');
    
    // build grid HTML
    let html = '';
    galleryImages.forEach((img, idx) => {
      html += `
        <div class="col-md-4 col-sm-6 col-12" data-img-index="${idx}">
          <div class="card h-100 shadow-sm">
            <img src="${img.src}" class="gallery-img card-img-top" alt="${img.alt}" style="height: 180px; cursor: pointer;" onclick="openImageModal('${img.src}', '${img.alt}')">
            <div class="card-body p-2 text-center">
              <p class="card-text small text-truncate">${img.alt}</p>
              <button class="btn btn-sm btn-outline-danger remove-img" data-remove-index="${idx}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
    galleryGrid.innerHTML = html;
    
    // attach remove event listeners after render
    document.querySelectorAll('.remove-img').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const idxAttr = this.getAttribute('data-remove-index');
        if (idxAttr !== null) {
          const indexToRemove = parseInt(idxAttr, 10);
          removeImageByIndex(indexToRemove);
        }
      });
    });
  }
  
  function removeImageByIndex(index) {
    if (index >= 0 && index < galleryImages.length) {
      galleryImages.splice(index, 1);
      renderGallery();
    }
  }
  
  // add new image from dataURL
  function addImageToGallery(dataURL, altText) {
    let newAlt = altText || `Image ${nextImageId + 1}`;
    galleryImages.push({ src: dataURL, alt: newAlt });
    nextImageId++;
    renderGallery();
    // after adding, clear preview and reset upload
    clearImageUploadPreview();
  }
  
  // reset to default images
  function resetToDefaultImages() {
    galleryImages = [
      { src: "https://picsum.photos/id/15/300/200", alt: "Mountain" },
      { src: "https://picsum.photos/id/26/300/200", alt: "River" },
      { src: "https://picsum.photos/id/169/300/200", alt: "City View" }
    ];
    nextImageId = 3;
    renderGallery();
  }
  
  // preview selected image and enable add button
  function handleImageFileSelect(file) {
    const previewDiv = document.getElementById('imagePreview');
    const addBtn = document.getElementById('addImageBtn');
    const clearPreviewBtn = document.getElementById('clearPreviewBtn');
    
    if (!file || !file.type.startsWith('image/')) {
      previewDiv.innerHTML = '<div class="text-danger small">Please select a valid image (jpg/png).</div>';
      if (addBtn) addBtn.disabled = true;
      return;
    }
    
    // limit file size ~2MB for simplicity
    if (file.size > 2 * 1024 * 1024) {
      previewDiv.innerHTML = '<div class="text-warning small">File too large (>2MB). Choose smaller image.</div>';
      if (addBtn) addBtn.disabled = true;
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      currentPreviewFile = { dataUrl, name: file.name };
      previewDiv.innerHTML = `<img src="${dataUrl}" style="max-height: 120px; max-width: 100%; border-radius: 6px;" class="border p-1">`;
      if (addBtn) addBtn.disabled = false;
      if (clearPreviewBtn) clearPreviewBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }
  
  function clearImageUploadPreview() {
    const fileInput = document.getElementById('imageUploadInput');
    const previewDiv = document.getElementById('imagePreview');
    const addBtn = document.getElementById('addImageBtn');
    const clearPreviewBtn = document.getElementById('clearPreviewBtn');
    
    if (fileInput) fileInput.value = '';
    if (previewDiv) previewDiv.innerHTML = '';
    if (addBtn) addBtn.disabled = true;
    if (clearPreviewBtn) clearPreviewBtn.style.display = 'none';
    currentPreviewFile = null;
  }
  
  // finalize adding previewed image to gallery
  function commitAddImage() {
    if (currentPreviewFile && currentPreviewFile.dataUrl) {
      let imageName = currentPreviewFile.name.split('.')[0] || 'uploaded';
      if (imageName.length > 20) imageName = imageName.substring(0, 17) + '...';
      addImageToGallery(currentPreviewFile.dataUrl, imageName);
      clearImageUploadPreview();
    } else {
      alert('No image selected or preview failed.');
    }
  }
  
  // modal preview for image (simple bootstrap modal dynamic)
  function openImageModal(imgSrc, altText) {
    // Check if modal exists, if not create a simple modal on the fly (clean)
    let modalElem = document.getElementById('imageModal');
    if (!modalElem) {
      const modalHtml = `
        <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Image Preview</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center">
                <img id="modalPreviewImg" src="" alt="preview" style="max-width:100%; max-height:70vh;">
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modalElem = document.getElementById('imageModal');
    }
    const modalImg = document.getElementById('modalPreviewImg');
    if (modalImg) {
      modalImg.src = imgSrc;
      modalImg.alt = altText || 'Preview';
    }
    const bsModal = new bootstrap.Modal(modalElem);
    bsModal.show();
  }
  
  // section toggling with active nav update (keeping simple)
  function showSection(sectionId) {
    // hide all sections
    const sections = ['home', 'form', 'about', 'gallery'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const activeSection = document.getElementById(sectionId);
    if (activeSection) activeSection.style.display = 'block';
    
    // update active class on nav links (basic)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    // also for dropdown items we can mark but not necessary fully; set active on the corresponding clicked.
    // just highlight via event target but we use simple approach:
    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    allNavLinks.forEach(link => {
      link.classList.remove('active');
    });
    // find appropriate link that matches section
    const matchingLinks = document.querySelectorAll(`[onclick*="showSection('${sectionId}')"]`);
    matchingLinks.forEach(link => link.classList.add('active'));
    
    // close any open dropdown manually for better UX
    const openDropdown = document.querySelector('.dropdown-menu.show');
    if (openDropdown) {
      const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
      if (dropdownToggle) bootstrap.Dropdown.getInstance(dropdownToggle)?.hide();
    }
  }
  
  // Theme toggle function (simple, without breaking extra elements)
  function toggleTheme() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    const themeBtn = document.getElementById('themeToggleBtn');
    
    if (body.classList.contains('dark-mode')) {
      // switch to light mode
      body.classList.remove('dark-mode');
      body.classList.add('bg-light', 'text-dark');
      if (navbar) {
        navbar.classList.remove('bg-light', 'navbar-light');
        navbar.classList.add('bg-dark', 'navbar-dark');
      }
      if (footer) {
        footer.classList.remove('bg-dark', 'text-white');
        footer.classList.add('bg-dark', 'text-white'); // keep dark footer for consistency but optional, but we want to preserve readability
        footer.style.backgroundColor = '#212529';
        footer.style.color = 'white';
      }
      if (themeBtn) {
        themeBtn.classList.remove('btn-outline-dark');
        themeBtn.classList.add('btn-outline-light');
      }
    } else {
      // dark mode
      body.classList.add('dark-mode');
      body.classList.remove('bg-light', 'text-dark');
      body.classList.add('bg-dark', 'text-white');
      if (navbar) {
        navbar.classList.remove('bg-dark', 'navbar-dark');
        navbar.classList.add('bg-light', 'navbar-light');
      }
      if (footer) {
        footer.classList.remove('bg-dark', 'text-white');
        footer.classList.add('bg-dark', 'text-white'); // but for dark mode footer remains dark with white text
        footer.style.backgroundColor = '#1a1a1a';
      }
      if (themeBtn) {
        themeBtn.classList.remove('btn-outline-light');
        themeBtn.classList.add('btn-outline-dark');
      }
    }
    // also adjust container border background optional
    const mainCont = document.getElementById('mainContainer');
    if (mainCont) {
      if (body.classList.contains('dark-mode')) {
        mainCont.classList.add('container-custom');
      } else {
        // no extra background forced
        mainCont.style.backgroundColor = '';
      }
    }
  }
  
  // for form demo simple alert
  function submitForm() {
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const msgSpan = document.getElementById('formMsg');
    if (msgSpan) {
      msgSpan.innerText = 'Form submitted (demo)';
      setTimeout(() => { if(msgSpan) msgSpan.innerText = ''; }, 1500);
    }
    alert('Demo submission: Name: ' + (name || 'empty'));
  }
  
  // on page load: initialize gallery, set default active section (home)
  document.addEventListener('DOMContentLoaded', function() {
    renderGallery();
    showSection('home');
    
    // attach upload file change event
    const fileInput = document.getElementById('imageUploadInput');
    if (fileInput) {
      fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          handleImageFileSelect(file);
        } else {
          clearImageUploadPreview();
        }
      });
    }
    
    const addBtn = document.getElementById('addImageBtn');
    if (addBtn) {
      addBtn.addEventListener('click', commitAddImage);
    }
    const clearPreviewBtn = document.getElementById('clearPreviewBtn');
    if (clearPreviewBtn) {
      clearPreviewBtn.addEventListener('click', clearImageUploadPreview);
    }
    const resetBtn = document.getElementById('resetGalleryBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        resetToDefaultImages();
      });
    }
    
    // ensure search form does not reload page
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput')?.value;
        alert('Search demo: ' + (query || 'empty query'));
      });
    }
  });
  
  // expose functions globally for inline onclick
  window.showSection = showSection;
  window.toggleTheme = toggleTheme;
  window.submitForm = submitForm;
  window.openImageModal = openImageModal;
  window.removeImageByIndex = removeImageByIndex; // backup but not needed
</script>

</body>
</html>

```