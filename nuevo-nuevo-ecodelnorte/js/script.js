// CONFIGURACIÓN
const CONFIG = {
    OPENWEATHER_API_KEY: '14dbefd02c54eae42bf9f16c229e236b', // Reemplaza con tu API key de OpenWeatherMap
    CIUDAD: 'Buenos Aires',
    INTERVALO_ACTUALIZACION: 5 * 60 * 1000, // 5 minutos
    INTERVALO_FECHA: 60 * 1000 // 1 minuto
};

// ELEMENTOS DEL DOM
const elementos = {
    // Clima
    climaLoading: document.getElementById('clima-loading'),
    climaContent: document.getElementById('clima-content'),
    weatherIcon: document.getElementById('weather-icon'),
    temperatura: document.getElementById('temperatura'),
    descripcion: document.getElementById('descripcion'),
    
    // Fecha
    fecha: document.getElementById('fecha'),
    
    // Dólar
    dolarLoading: document.getElementById('dolar-loading'),
    dolarContent: document.getElementById('dolar-content'),
    blueCompra: document.getElementById('blue-compra'),
    blueVenta: document.getElementById('blue-venta'),
    oficialCompra: document.getElementById('oficial-compra'),
    oficialVenta: document.getElementById('oficial-venta')
};

// FUNCIONES PARA OBTENER DATOS

// 🌤️ FUNCIÓN PARA OBTENER CLIMA
async function obtenerClima() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CONFIG.CIUDAD}&appid=${CONFIG.OPENWEATHER_API_KEY}&units=metric&lang=es`;
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            return {
                temperatura: Math.round(data.main.temp),
                descripcion: data.weather[0].description,
                icono: data.weather[0].main,
                ciudad: data.name
            };
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error('Error al obtener clima:', error);
        // Datos de ejemplo si falla la API
        return {
            temperatura: 18,
            descripcion: 'parcialmente nublado',
            icono: 'Clouds',
            ciudad: 'Buenos Aires'
        };
    }
}

// 📅 FUNCIÓN PARA OBTENER FECHA
function obtenerFecha() {
    const ahora = new Date();
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return ahora.toLocaleDateString('es-AR', opciones);
}

// 💵 FUNCIÓN PARA OBTENER DÓLAR
async function obtenerDolar() {
    try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        
        if (response.ok) {
            const data = await response.json();
            const blue = data.find(d => d.casa === 'blue');
            const oficial = data.find(d => d.casa === 'oficial');
            
            return {
                blue: {
                    compra: blue?.compra || 0,
                    venta: blue?.venta || 0
                },
                oficial: {
                    compra: oficial?.compra || 0,
                    venta: oficial?.venta || 0
                }
            };
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error('Error al obtener dólar:', error);
        // Datos de ejemplo si falla la API
        return {
            blue: { compra: 1200, venta: 1220 },
            oficial: { compra: 350, venta: 370 }
        };
    }
}

// FUNCIONES PARA ACTUALIZAR LA UI

// 🌤️ ACTUALIZAR CLIMA EN LA UI
function actualizarClimaUI(datosClima) {
    // Ocultar loading
    elementos.climaLoading.style.display = 'none';
    elementos.climaContent.style.display = 'flex';
    
    // Actualizar temperatura
    elementos.temperatura.textContent = `${datosClima.temperatura}°C`;
    
    // Actualizar descripción
    elementos.descripcion.textContent = datosClima.descripcion;
    
    // Actualizar ícono
    const iconoClase = obtenerClaseIcono(datosClima.icono);
    elementos.weatherIcon.className = iconoClase;
}

// 📅 ACTUALIZAR FECHA EN LA UI
function actualizarFechaUI(fecha) {
    elementos.fecha.textContent = fecha;
}

// 💵 ACTUALIZAR DÓLAR EN LA UI
function actualizarDolarUI(datosDolar) {
    // Ocultar loading
    elementos.dolarLoading.style.display = 'none';
    elementos.dolarContent.style.display = 'flex';
    
    // Actualizar valores
    elementos.blueCompra.textContent = `$${datosDolar.blue.compra}`;
    elementos.blueVenta.textContent = `$${datosDolar.blue.venta}`;
    elementos.oficialCompra.textContent = `$${datosDolar.oficial.compra}`;
    elementos.oficialVenta.textContent = `$${datosDolar.oficial.venta}`;
}

// FUNCIONES AUXILIARES

// 🌤️ OBTENER CLASE DE ÍCONO SEGÚN EL CLIMA
function obtenerClaseIcono(tipoClima) {
    const iconos = {
        'Clear': 'fas fa-sun weather-icon',
        'Clouds': 'fas fa-cloud weather-icon',
        'Rain': 'fas fa-cloud-rain weather-icon',
        'Drizzle': 'fas fa-cloud-rain weather-icon',
        'Thunderstorm': 'fas fa-bolt weather-icon',
        'Snow': 'fas fa-snowflake weather-icon',
        'Mist': 'fas fa-smog weather-icon',
        'Fog': 'fas fa-smog weather-icon',
        'Haze': 'fas fa-smog weather-icon'
    };
    
    return iconos[tipoClima] || 'fas fa-cloud weather-icon';
}

// FUNCIÓN PRINCIPAL PARA CARGAR TODOS LOS DATOS
async function cargarTodosLosDatos() {
    try {
        // Obtener datos en paralelo
        const [datosClima, datosDolar] = await Promise.all([
            obtenerClima(),
            obtenerDolar()
        ]);
        
        const fecha = obtenerFecha();
        
        // Actualizar UI
        actualizarClimaUI(datosClima);
        actualizarDolarUI(datosDolar);
        actualizarFechaUI(fecha);
        
        console.log('Datos actualizados correctamente');
        
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// FUNCIÓN PARA ACTUALIZAR SOLO LA FECHA
function actualizarSoloFecha() {
    const fecha = obtenerFecha();
    actualizarFechaUI(fecha);
}

// INICIALIZACIÓN Y CONFIGURACIÓN DE INTERVALOS
function inicializar() {
    // Cargar datos inicialmente
    cargarTodosLosDatos();
    
    // Configurar intervalos de actualización
    setInterval(cargarTodosLosDatos, CONFIG.INTERVALO_ACTUALIZACION);
    setInterval(actualizarSoloFecha, CONFIG.INTERVALO_FECHA);
    
    console.log('Navbar info inicializado correctamente');
    console.log(`Actualizaciones cada ${CONFIG.INTERVALO_ACTUALIZACION / 1000 / 60} minutos`);
}

// EVENTOS
document.addEventListener('DOMContentLoaded', inicializar);

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});

// FUNCIONES ADICIONALES PARA DEBUGGING (opcional)
window.debugNavbar = {
    obtenerClima,
    obtenerDolar,
    obtenerFecha,
    cargarTodosLosDatos,
    CONFIG
};

// CARRUSEL INICIO

let index = 0;
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
});