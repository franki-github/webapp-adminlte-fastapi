// js/api.js (cárgala antes de main.js o intégrala dentro)
async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {'Content-Type': 'application/json', ...(options.headers||{})};
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401 || res.status === 403) {
    // token inválido/expirado → limpia sesión y redirige al login/modal
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // muestra modal o mensaje
    throw new Error('No autorizado');
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || ('Error HTTP '+res.status));
  }
  const contentType = res.headers.get('content-type') || '';
  return contentType.includes('application/json') ? res.json() : res.text();
}
