"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addToCart, toggleCart } from "../store/cartSlice";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { ChevronRight, Facebook, Heart, Instagram, ShoppingBag } from "lucide-react";

interface Props {
  nombre: string;
}

const tallas = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5];

export default function ProductPage({ nombre }: Props) {
  const productos = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch();
  const producto = productos.find((p) => p.slug === nombre);
  const [selectedTalla, setSelectedTalla] = useState<number | null>(5.5);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  
  // Buscador
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Zoom de imagen
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!producto)
    return <div className="p-4 sm:p-6 md:p-8 text-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
    if (!selectedTalla) return;
    dispatch(
      addToCart({
        nombre: producto.nombre,
        referencia: producto.referencia,
        foto: producto.foto,
        talla: selectedTalla.toString(),
        cantidad: 1,
      })
    );
  };

  // Función para agregar productos del slider al carrito
  const handleAddSliderToCart = (productoSlider: typeof producto) => {
    dispatch(
      addToCart({
        nombre: productoSlider.nombre,
        referencia: productoSlider.referencia,
        foto: productoSlider.foto,
        talla: "7", // Talla por defecto para productos del slider
        cantidad: 1,
      })
    );
  };

  // Función para manejar el zoom de la imagen
  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
    setIsZoomed(true);
  };

  const handleImageLeave = () => {
    setIsZoomed(false);
  };

  // Para sliders
  const completaTuLook = productos.filter((p) => p.nombre !== producto.nombre);
  const recomendados = productos.filter((p) => p.nombre !== producto.nombre);

  // Filtrado de productos para búsqueda
  const filteredProducts = productos.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <main className="bg-white min-h-screen font-serif max-md:overflow-x-hidden">
      {/* Banner superior */}
      <div className="font-montserrat bg-[#7A4A58] text-white text-center py-2 px-4 text-xs sm:text-sm font-bold tracking-wide">
        HOT SALE -30% EN SANDALIAS
      </div>
      {/* Header */}
      <header className="flex flex-col items-center justify-between border-b">
        <div className="font-montserrat w-full px-4 sm:px-6 md:px-12 lg:px-28 bg-[#C8C6CB] flex justify-end items-center gap-2 md:gap-4 py-2">
          <span className="text-[#707070] text-xs font-bold cursor-pointer uppercase max-md:hidden">Directorio de tiendas</span>
          <span className="text-[#707070] text-xs font-bold cursor-pointer uppercase max-md:hidden">Servicios al cliente</span>
          <span className="text-[#707070] text-xs font-bold cursor-pointer uppercase">Mi cuenta</span>
        </div>
        <div className="w-full flex flex-col md:flex-row items-stretch px-4 sm:px-6 md:px-12 lg:px-28 py-4">
          <div className="w-full md:w-1/2 flex flex-col items-start justify-end gap-2 mb-4 md:mb-0">
            <div className="flex items-end gap-2">
              <Image src="/images/21.jpg" alt="logo" width={40} height={40} className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px]" />
              <span className="text-[#56565A] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-montserrat">
                Hush Puppies<sup className="text-xs">®</sup>
              </span>
            </div>
            <nav className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm max-md:justify-between">
              <span className="cursor-pointer text-[#56565A]">HOMBREE</span>
              <span className="cursor-pointer text-[#56565A]">MUJER</span>
              <span className="cursor-pointer text-[#56565A]">BLOG</span>
              <span className="cursor-pointer text-[#56565A]">HISTORIA</span>
              <span className="cursor-pointer text-[#56565A]">TIENDAS</span>
            </nav>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-end gap-2">
            <div className="flex flex-col items-start md:items-end gap-2 md:gap-4 text-xs w-full md:w-auto">
              <div className="relative w-full md:w-auto" ref={searchRef}>
                <div className="flex border border-black h-8 md:h-10 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="BUSCAR"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                    className="font-montserrat font-bold px-2 md:px-3 py-1 text-xs w-full md:w-[200px] focus:outline-none focus:border-[#7c5a63]"
                  />
                  <button className="px-2 md:px-4 bg-white text-black text-lg md:text-xl font-light cursor-pointer flex-shrink-0">
                    <ChevronRight width={16} height={16} className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </div>

                {showSuggestions && filteredProducts.length > 0 && (
                  <div className="font-montserrat absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/producto/${p.slug}`}
                        className="block px-3 py-2 text-xs hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setSearchTerm("");
                          setShowSuggestions(false);
                        }}
                      >
                        {p.nombre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-montserrat text-xs md:text-sm text-[#7A4A58] text-center md:text-right">
                ENVÍO GRATIS PARA PEDIDOS SUPERIORES A $300.000
              </span>
              <button
                className="font-domine! flex items-center gap-2 cursor-pointer text-[#666666]"
                onClick={() => dispatch(toggleCart(true))}
              >
                <ShoppingBag width={16} height={16} className="w-4 h-4 md:w-6 md:h-6" />
                <span className="text-xs md:text-sm">CARRITO {cartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Breadcrumbs */}
      <div className="font-montserrat text-xs font-bold text-[#9C9C9C] px-4 sm:px-6 md:px-12 lg:px-28 py-2">
        HUSHPUPPIESCO / CALZADO / {producto.nombre.toUpperCase()}
      </div>
      {/* Main producto */}
      <section className="flex flex-col lg:flex-row gap-4 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-28 py-6 md:py-10">
        {/* Imagen principal y galería */}
        <div className="flex-1 flex border-b border-black flex-col items-center">
          <div 
            ref={imageRef}
            className="relative overflow-hidden cursor-zoom-in w-full max-w-md lg:max-w-none"
            onMouseMove={handleImageZoom}
            onMouseLeave={handleImageLeave}
          >
            <Image
              src={`/images/${producto.foto}`}
              alt={producto.nombre}
              width={500}
              height={500}
              className={`justify-self-center mb-4 object-contain transition-transform duration-200 w-full h-auto md:w-[500px] md:h-[500px] ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="flex-1 max-w-sm w-full">
          <h1 className="text-lg md:text-2xl font-bold uppercase tracking-wide mb-1">
            {producto.nombre}
          </h1>
          <div className="font-domine text-[#7A4A58] font-bold text-lg mb-1">$00.000</div>
          <div className="font-montserrat text-sm md:text-base text-gray-400 mb-6">
            Cod. de producto {producto.referencia}
          </div>

          {/* Color */}
          <div className="mb-6">
            <div className="font-montserrat uppercase text-sm font-semibold text-[#B2B2B2] mb-2">
              Color
            </div>
            <div className="flex gap-2">
              <Image
                src={`/images/${producto.foto}`}
                alt={producto.nombre}
                width={50}
                height={50}
                className="border border-[#7A4A58] p-1 cursor-pointer w-12 h-12 md:w-[50px] md:h-[50px]"
              />
            </div>
          </div>

          {/* Talla */}
          <div className="mb-4">
            <div className="font-montserrat uppercase text-sm font-semibold text-[#B2B2B2] mb-2">
              Talla
            </div>
            <div className="grid grid-cols-5 gap-1 md:gap-2">
              {tallas.map((t) => (
                <button
                  key={t}
                  className={`font-montserrat py-2 md:py-4 font-bold text-xs md:text-sm text-center transition cursor-pointer ${
                    selectedTalla === t
                      ? "bg-[#E8E8E9] text-[#8D8D8E]"
                      : "bg-[#C8C6CA] text-[#333333]"
                  }`}
                  onClick={() => setSelectedTalla(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="font-montserrat text-sm md:text-base text-[#B2B2B2] mt-4 underline cursor-pointer">
              GUÍA DE TALLAS
            </div>
          </div>

          {/* Botón de añadir al carrito */}
          <div className="flex items-center gap-4 mt-6">
            <button
              className="w-full bg-[#7A4A58] text-white py-3 font-bold text-sm hover:bg-[#5a3e47] transition cursor-pointer"
              onClick={handleAddToCart}
            >
              AÑADIR AL CARRITO
            </button>
            <button className="text-gray-400 text-xl hover:text-[#7A4A58] cursor-pointer flex-shrink-0">
              <Heart width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Detalles y tecnologías */}
      <section className="mx-4 sm:mx-6 md:mx-12 lg:mx-28 py-4 grid grid-cols-1 gap-4">
        <div>
          <h2 className="font-bold text-base md:text-lg mb-2">DETALLES DE PRODUCTO</h2>
          <div className="w-full border-t border-black pt-1">
            <p className="text-xs md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              finibus dictum mi, a aliquet ante. Fusce vitae felis ac ante
              aliquet viverra id nec dolor. Praesent sodales augue ligula, ut
              euismod tortor lacinia non. Etiam tristique quam quis rutrum
              aliquam. Vestibulum in pharetra sem. Etiam scelerisque accumsan
              suscipit. Praesent fermentum orci orci, vitae dignissim turpis
              faucibus ac. Aenean dictum feugiat metus, id maximus mauris
              consectetur ac.
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-base md:text-lg my-2">TECNOLOGÍAS</h2>
          <div className="w-full border-t border-black pt-1">
            <p className="text-xs md:text-sm">
              Quisque tellus odio, varius consequat interdum at, molestie
              viverra lacus. Donec nec tempus enim, nec pellentesque magna.
              Vestibulum dignissim, nunc id interdum dignissim, orci ex cursus
              metus, ut interdum tellus arcu at lorem.
            </p>
          </div>
        </div>
      </section>
      {/* Completa tu look - Slider */}
      <section className="mx-4 sm:mx-6 md:mx-12 lg:mx-28 py-4 md:py-8 max-md:mb-8">
        <h2 className="bg-[#E7E6E2] w-full p-2 font-bold text-base md:text-lg mb-4">
          COMPLETA TU LOOK
        </h2>
        <Slider {...sliderSettings}>
          {completaTuLook.map((p, i) => (
            <div key={i} className="px-2 py-6 max-md:mb-4">
              <div className="flex flex-col h-68">
                <div className="flex-1 flex items-center justify-center mb-2">
                  <Link href={`/producto/${p.slug}`}>
                    <Image
                      src={`/images/${p.foto}`}
                      alt={p.nombre}
                      width={300}
                      height={180}
                      className="object-contain h-32 sm:h-36 md:h-40 w-auto cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="text-center">
                  <div className="font-montserrat font-semibold text-xs md:text-sm mb-1 py-2 px-2 line-clamp-2 cursor-pointer text-[#494949]">
                    <Link href={`/producto/${p.slug}`}>{p.nombre}</Link>
                  </div>
                  <div className="text-[#7A4A58] font-bold text-xs md:text-sm mb-2">
                    $00.000
                  </div>
                  <button 
                    className="w-full bg-[#7A4A58] text-white py-2 md:py-4 font-bold text-xs md:text-sm hover:bg-[#5a3e47] transition cursor-pointer"
                    onClick={() => handleAddSliderToCart(p)}
                  >
                    AGREGAR AL CARRITO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      {/* Productos recomendados - Slider */}
      <section className="mx-4 sm:mx-6 md:mx-12 lg:mx-28 py-4 md:py-8 max-md:mb-8">
        <h2 className="font-bold text-base md:text-lg mb-4 border-b border-black pb-2">
          PRODUCTOS RECOMENDADOS
        </h2>
        <Slider {...sliderSettings}>
          {recomendados.map((p, i) => (
            <div key={i} className="px-2 py-4 max-md:mb-4">
              <div className="flex flex-col h-68 border-b">
                <div className="flex-1 flex items-center justify-center mb-2">
                  <Link href={`/producto/${p.slug}`}>
                    <Image
                      src={`/images/${p.foto}`}
                      alt={p.nombre}
                      width={300}
                      height={180}
                      className="object-contain h-32 sm:h-36 md:h-40 w-auto cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="text-center">
                  <div className="font-montserrat font-semibold text-xs md:text-sm mb-1 py-2 px-2 line-clamp-2 cursor-pointer text-[#494949]">
                    <Link href={`/producto/${p.slug}`}>{p.nombre}</Link>
                  </div>
                  <div className="text-[#7c5a63] font-bold text-xs md:text-sm mb-4">
                    $00.000
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <div className="flex flex-col gap-2 items-center justify-center bg-[#E7E6E2] w-full py-6 md:py-8 mt-4 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-domine">@HUSHPUPPIESCO</h2>
        <hr className="w-[8%] border border-black" />
        <div className="flex justify-center gap-4">
          <Facebook width={20} height={20} className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"/>
          <Instagram width={20} height={20} className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"/>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white text-[#444] text-sm">
        {/* Sección superior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-6 md:px-12 lg:px-28 py-6 md:py-8 lg:py-12 border-b">
          {/* Columna 1 */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-xs md:text-sm text-[#3A3A3A]">
              Servicio al Cliente
            </h3>
            <ul className="space-y-1">
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Contáctenos</li>
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Cambios y Devoluciones</li>
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Políticas de la Tienda</li>
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Políticas de Datos</li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-xs md:text-sm text-[#3A3A3A]">
              Mi Cuenta
            </h3>
            <ul className="space-y-1">
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Mis Pedidos</li>
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Mis Devoluciones</li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-xs md:text-sm text-[#3A3A3A]">
              Recursos
            </h3>
            <ul className="space-y-1">
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Tiendas</li>
              <li className="cursor-pointer font-montserrat text-xs md:text-sm">Devoluciones</li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-xs md:text-sm text-[#3A3A3A]">
              Newsletter
            </h3>
            <p className="mb-3 text-xs md:text-sm font-montserrat">
              Regístrate para ser el primero en recibir nuestras noticias
            </p>
            <div className="flex border border-black h-8 md:h-10">
              <input
                type="email"
                placeholder="E-MAIL"
                className="font-montserrat px-2 w-full outline-none text-xs"
              />
              <button className="font-montserrat px-2 md:px-4 bg-white text-black text-lg md:text-xl font-light cursor-pointer flex-shrink-0">
                <ChevronRight width={16} height={16} className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
