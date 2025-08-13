
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content-area");
  const user = localStorage.getItem("user");
  console.log("Usuario detectado al cargar:", user);

  updateUserUI(user);

  if (user) {
    //const ws = document.getElementById("welcome-screen");
    // if (ws) ws.remove();
    document.body.classList.add("logged-in");
    // if (ws) ws.remove();
    const savedPage = localStorage.getItem("activePage");
    if (savedPage) {
      activateMenu(savedPage);
      loadPage(savedPage);
    }
  }

  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (!localStorage.getItem("user")) {
        content.innerHTML = "<h4>Acceso denegado. Inicia sesión para continuar.</h4>";
        return;
      }
      localStorage.setItem("activePage", page);
      activateMenu(page);
      loadPage(page);
    });
  });

  function loadPage(page) {
    console.log("Cargando contenido de:", page);
    console.log("Intentando cargar:", `pages/${page}.html`);
    fetch(`pages/${page}.html`)
      .then(res => res.text())
      .then(html => {
        console.log("Contenido cargado correctamente.");
        content.innerHTML = html;
      })
      .catch(() => content.innerHTML = "<p>Error al cargar la página.</p>");
  }

  function activateMenu(page) {
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.has-treeview').forEach(el => el.classList.remove('menu-open'));

    const activeLink = document.querySelector(`[data-page="${page}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      const parentTree = activeLink.closest('.has-treeview');
      if (parentTree) {
        parentTree.classList.add('menu-open');
        const parentLink = parentTree.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  }

  // LOGIN
  document.querySelectorAll('.user-login').forEach(btn => {
    btn.addEventListener('click', () => {
      $('#loginModal').modal('show');
    });
  });

  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username && password) {
      localStorage.setItem("user", username);
      document.body.classList.add("logged-in");

      $('#loginModal').modal('hide');
      updateUserUI(username);
      location.reload();
    } else {
      document.getElementById("login-error").style.display = "block";
    }
  });

  function updateUserUI(username) {
    const container = document.getElementById("user-menu");
    if (!container) return;
    if (username) {
      container.innerHTML = `
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i> ${username}
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a href="#" class="dropdown-item" id="logout-btn">Cerrar sesión</a>
        </div>
      `;
      document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("activePage");
        localStorage.removeItem("user");
        document.body.classList.remove("logged-in");
        setTimeout(() => location.reload(), 100);
      });
    } else {
      container.innerHTML = `
        <a class="nav-link user-login" href="#"><i class="far fa-user"></i> Iniciar sesión</a>
      `;
      document.querySelector('.user-login').addEventListener("click", () => {
        $('#loginModal').modal('show');
      });
    }
  }
});


// --- Login modal handlers ---
document.querySelectorAll('.user-login').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.$ && typeof $('#loginModal').modal === 'function') {
      $('#loginModal').modal('show');
    } else {
      // Fallback: toggle via class
      document.getElementById('loginModal')?.classList.add('show');
      document.getElementById('loginModal')?.setAttribute('style', 'display:block;');
    }
  });
});

const loginFormEl = document.getElementById('login-form');
if (loginFormEl) {
  loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username && password) {
      localStorage.setItem('user', username);
      try { $('#loginModal').modal('hide'); } catch (e) { }
      // Forzar recarga para que se apliquen estados (logged-in, etc.)
      setTimeout(() => window.location.reload(), 50);
    } else {
      const err = document.getElementById('login-error');
      if (err) err.style.display = 'block';
    }
  });
}
