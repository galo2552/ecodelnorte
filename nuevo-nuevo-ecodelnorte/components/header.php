<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <title>Eco del norte</title>
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="navbar-info">
            <!-- CLIMA - Arriba -->
            <div class="clima-section" id="clima">
                    <div class="loading" id="clima-loading">
                        <div class="skeleton"></div>
                    </div>
                    <div class="clima-content" id="clima-content" style="display: none;">
                        <i class="weather-icon" id="weather-icon"></i>
                        <span class="temperatura" id="temperatura"></span>
                        <span class="descripcion" id="descripcion"></span>
                    </div>
                </div>

                <!-- FECHA - Medio -->
                <div class="fecha-section">
                    <i class="fas fa-calendar-alt"></i>
                    <span id="fecha"></span>
                </div>

                <!-- DÓLAR - Abajo -->
                <div class="dolar-section" id="dolar">
                    <div class="loading" id="dolar-loading">
                        <div class="skeleton"></div>
                    </div>
                    <div class="dolar-content" id="dolar-content" style="display: none;">
                        <div class="dolar-blue">
                            <i class="fas fa-dollar-sign dolar-icon"></i>
                            <span class="dolar-label">Blue:</span>
                            <span id="blue-compra"></span>
                            <span class="separator">/</span>
                            <span id="blue-venta"></span>
                        </div>
                        <div class="dolar-oficial">
                            <span class="dolar-label-oficial">Oficial:</span>
                            <span id="oficial-compra"></span>
                            <span class="separator">/</span>
                            <span id="oficial-venta"></span>
                        </div>
                    </div>
                </div>
            </div>
        <div class="logo-container">
            <a href=""><img class="logo-nav" src="../imgs/logo.JPG" alt=""></a>
        </div>
        <div class="buscar-redes">
            <a href=""><img class="redes-icon" src="../imgs/facebook.png" alt=""></a>
            <a href=""><img class="redes-icon" src="../imgs/twitter-alt.png" alt=""></a>
            <a href=""><img class="redes-icon" src="../imgs/instagram.png" alt=""></a>
            <form class="form">
                <button>
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                <input class="input" placeholder="Buscar Noticias" required="" type="text">
                <button class="reset" type="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </form>
        </div>
        </nav>
        <nav class="nav-bajo">
            <ul class="menu-nav">
                <li><a href="inicio.php">Inicio</a></li>
                <li><a href="noticias.php">Pólitica</a></li>
                <li><a href="galeria.php">Agro</a></li>
                <li><a href="nosotros.php">Deporte</a></li>
                <li><a href="contacto.php">País</a></li>
                <li><a href="contacto.php">Coopesool</a></li>
                <li><a href="contacto.php">Instituciones</a></li>
                <li><a href="contacto.php">Opiniones</a></li>
                <li><a href="contacto.php">E-Comunidad</a></li>
            </ul>
        </nav>
    </header>
