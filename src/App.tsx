// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import logoImg from './assets/ventrix-logo-transparent.png';
import CatalogTable from './components/CatalogTable';
import AboutUs from './components/AboutUs';
import { ShaderAnimation } from './components/ui/shader-animation';
import { Reveal } from './components/Reveal';
import GlassSelect from './components/ui/GlassSelect';
import BackgroundEffects from './components/ui/BackgroundEffects';
import {
  Info,
  X,
  Send,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Clock,
  TrendingUp,
  PackageCheck,
  MapPin
} from 'lucide-react';

// ==========================================
// CONFIGURACIÓN DE CONTACTO COMERCIAL
// ==========================================
// Reemplaza con tu número de WhatsApp real. 
// IMPORTANTE: Debe contener únicamente dígitos, incluyendo el código de país (sin el signo "+", sin espacios, sin guiones).
// Ejemplo: "525512345678" para México, "50212345678" para Guatemala, etc.
const WHATSAPP_DESTINATION_PHONE = "50374575097"; 

// Reemplaza con tu dirección de correo electrónico institucional donde recibirás las solicitudes de cotización por Outlook.
const EMAIL_DESTINATION = "carlosvega005@hotmail.com";

// Configuración de EmailJS para correos con plantilla personalizada
const EMAILJS_SERVICE_ID = "service_ah7n02t";
const EMAILJS_TEMPLATE_ID = "template_aaqlzzb";
const EMAILJS_PUBLIC_KEY = "409Ovg11CJcQnmU4l";

export default function App() {
  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  // Header Scroll State
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Si el usuario hace scroll hacia abajo más de 100px, esconde el header
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderHidden(true);
      } else {
        // Si hace scroll hacia arriba, muéstralo de nuevo
        setIsHeaderHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    message: ''
  });

  const handleQuoteRequest = (products: string[]) => {
    const list = products.map((p, i) => `${i + 1}. ${p}`).join('\n');
    setContactForm(prev => ({
      ...prev,
      message: prev.message 
        ? `${prev.message}\n\nAdemás, solicito cotización para:\n${list}`
        : `Hola, me gustaría solicitar una cotización de los siguientes productos:\n\n${list}\n\nQuedo a la espera de más información.`
    }));
    showToast(`${products.length} productos añadidos al formulario de contacto`, 'success');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    showToast("Enviando correo y preparando WhatsApp...", "info");

    // 1. Preparar payload para EmailJS (Email Premium)
    const payload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        company: contactForm.company || 'Particular',
        businessType: contactForm.businessType || 'No especificado',
        message: contactForm.message
      }
    };

    // Enviar el correo usando EmailJS
    fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(async (response) => {
      // 2. Independientemente de la respuesta exacta, abrimos WhatsApp
      const messageText = `*NUEVA SOLICITUD DE VENTRIX* 🚀
👤 *Nombre:* ${contactForm.name}
🏢 *Empresa:* ${contactForm.company || 'Particular'}
🏷️ *Tipo:* ${contactForm.businessType || 'No especificado'}
✉️ *Correo:* ${contactForm.email}

📝 *Mensaje / Requerimiento:*
${contactForm.message}
`;

      const phoneNumber = "50378823645";
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

      window.open(waUrl, '_blank');

      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        businessType: '',
        message: ''
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00D2FF', '#2563eb', '#1e293b']
      });

      showToast("¡Correo enviado y WhatsApp abierto!", "success");
    })
    .catch((error) => {
      console.error("Error enviando email:", error);
      // Fallback: Si el correo falla, igual abrimos WhatsApp
      const messageText = `*NUEVA SOLICITUD DE VENTRIX* 🚀\n👤 *Nombre:* ${contactForm.name}\n...`;
      window.open(`https://wa.me/50378823645?text=${encodeURIComponent(messageText)}`, '_blank');
      showToast("Se abrió WhatsApp (Hubo un problema con el correo)", "warning");
    });
  };



  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <ShaderAnimation />
      <BackgroundEffects />
      {/* 1. CORPORATE NAV BAR */}
      <div className={`header-wrapper ${isHeaderHidden ? 'header-hidden' : ''}`}>
        <header className="header">
        <div className="logo-container" onClick={() => window.scrollTo(0, 0)}>
          <div className="logo-svg-wrapper">
            <img src={logoImg} alt="Ventrix Logo" className="logo-image" />
          </div>
          <div className="logo-text-group">
            <div className="logo-title">
              VENTRI
              <span className="logo-x" style={{ display: 'inline-flex', marginLeft: '4px' }}>
                <svg width="0.85em" height="0.85em" viewBox="0 0 40 40" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}>
                  <defs>
                    <linearGradient id="x-blue-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D2FF" />
                      <stop offset="50%" stopColor="#007BFF" />
                      <stop offset="100%" stopColor="#0056B3" />
                    </linearGradient>
                    <linearGradient id="x-silver-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#E5E7EB" />
                      <stop offset="100%" stopColor="#A0AAB2" />
                    </linearGradient>
                  </defs>
                  <polygon points="28,0 40,0 12,40 0,40" fill="url(#x-blue-metal)" />
                  <polygon points="0,0 12,0 40,40 28,40" fill="url(#x-silver-metal)" />
                </svg>
              </span>
            </div>
            <div className="logo-subtitle">DISTRIBUCIÓN <span className="logo-sep">|</span> ABASTECIMIENTO <span className="logo-sep">|</span> SOLUCIONES</div>
          </div>
        </div>
        <nav className="nav-menu">
          <a href="#quienes-somos" className="nav-link">Sobre Nosotros</a>
          <a href="#catalogo" className="nav-link">Catálogo</a>
          <a href="#contacto" className="nav-cta">Contáctanos</a>
        </nav>
        </header>
      </div>

      {/* 2. HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <Reveal>
            <div className="hero-text">
              <span className="hero-tag" style={{ background: 'transparent', border: '1px solid var(--secondary-accent)', color: 'var(--secondary-accent)' }}>Rapidez | Disponibilidad | Atención</span>
              <h1 style={{ fontSize: '5rem', lineHeight: '1', fontWeight: 900, textShadow: '0 10px 30px rgba(0,0,0,0.5)', letterSpacing: '-0.04em' }}>Abastecimiento Empresarial</h1>
              <p className="hero-desc" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                Somos una empresa enfocada en el abastecimiento empresarial de desechables, empaques y productos de alta rotación para restaurantes, cafeterías y negocios.
              </p>
              <div className="btn-group">
                <a href="#catalogo" className="btn btn-secondary" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>Ver Catálogo</a>
                <a href="#contacto" className="btn btn-primary" style={{ boxShadow: '0 10px 30px rgba(0, 176, 80, 0.3)' }}>Contáctanos</a>
              </div>
            </div>
            </Reveal>

            <Reveal delay="reveal-delay-200">
            <div className="floating-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '1rem', color: 'var(--secondary-accent)', letterSpacing: '0.1em', fontWeight: 700 }}>Lo que hacemos</h4>
              
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <PackageCheck size={24} color="var(--text-inverse)" />
                  <h5 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-inverse)', fontWeight: 800 }}>Apoyo a tu Negocio</h5>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Suministro de Desechables, Empaques, Bolsas, Vasos, Servilletas y productos esenciales de alta rotación.</p>
              </div>
              
              <div style={{ borderLeft: '2px solid var(--text-primary)', paddingLeft: '16px' }}>
                <h5 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Nuestro Enfoque</h5>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={14} color="var(--primary-accent)" />
                    <span>Atención rápida</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} color="var(--primary-accent)" />
                    <span>Entregas eficientes</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={14} color="var(--primary-accent)" />
                    <span>Precios competitivos</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="var(--primary-accent)" />
                    <span>Soluciones prácticas para empresas</span>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>



      {/* SECCIÓN QUIÉNES SOMOS */}
      <AboutUs />

      {/* CATÁLOGO PRINCIPAL */}
      <section id="catalogo" className="catalog-section">
        <div className="container">
          <Reveal>
            <CatalogTable onQuoteRequest={handleQuoteRequest} />
          </Reveal>
        </div>
      </section>

      {/* 8. CONTACTO / HABLEMOS */}
      <section className="catalog-section" id="contacto" style={{ padding: '120px 0' }}>
        <div className="container">
          <Reveal>
          <div className="section-title-wrap">
            <span>Contacto Comercial</span>
            <h2>¡HAZ TU PEDIDO HOY!</h2>
            <p style={{ maxWidth: '600px', margin: '12px auto 0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              En VENTRIX estamos listos para ayudarte con el abastecimiento de tu negocio de forma rápida, eficiente y confiable. Los precios pueden variar según volumen y cantidad de pedido.
            </p>
          </div>

          <div className="contacto-grid">
            <div className="form-card glass-panel" style={{ background: 'transparent' }}>
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej. Carlos Mendoza"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Correo Corporativo *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="correo@empresa.com"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Ej. +52 55 1234 5678"
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">Empresa / Institución *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nombre de su compañía o comedor industrial"
                    value={contactForm.company}
                    onChange={e => setContactForm({ ...contactForm, company: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">Tipo de Negocio *</label>
                  <GlassSelect
                    options={[
                      "Restaurante / Cafetería",
                      "Oficinas / Corporativo",
                      "Eventos / Catering",
                      "Hotel / Hospitalidad",
                      "Distribuidor / Mayorista",
                      "Particular / Otro"
                    ]}
                    value={contactForm.businessType}
                    onChange={value => setContactForm({ ...contactForm, businessType: value })}
                    placeholder="Seleccione una opción..."
                    required
                  />
                </div>

                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">Mensaje o Requerimiento *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describa brevemente los productos de interés, volúmenes de consumo mensual o dudas técnicas..."
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}
                >
                  <Send size={14} style={{ marginRight: '6px' }} /> Enviar Solicitud de Información
                </button>
              </form>
            </div>

            <div className="contacto-info-panel">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Canales de Atención</h3>
                


                <div className="contacto-info-item">
                  <div className="contacto-info-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Atención directa y rápida</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      +503 7882-3645
                    </p>
                    <a 
                      href="https://wa.me/50378823645?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20los%20productos%20de%20VENTRIX" 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.85rem', color: '#25d366', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Escríbenos por WhatsApp ↗
                    </a>
                  </div>
                </div>

                <div className="contacto-info-item">
                  <div className="contacto-info-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Correos de Contacto</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Información General: carlosvega005@hotmail.com<br />
                      Ventas Corporativas: carlosvega005@hotmail.com
                    </p>
                  </div>
                </div>

                <div className="contacto-info-item">
                  <div className="contacto-info-icon">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Entregas programadas</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Lunes a Viernes: 8:00 AM - 5:00 PM<br />
                      Sábados: 8:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>

                <div className="contacto-info-item">
                  <div className="contacto-info-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Ubicación Principal</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      San Salvador, El Salvador<br />
                      Cobertura en zona metropolitana
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="footer">
        <Reveal>
        <div className="container footer-grid">
          <div className="footer-brand">
            <h4 className="logo-text">
              VENTRI<span style={{ color: 'var(--secondary-accent)' }}>X</span>
            </h4>
            <p style={{ marginTop: '16px', fontSize: '0.85rem' }}>
              Tu aliado estratégico en abastecimiento empresarial de desechables, empaques y productos de alta rotación.
            </p>
          </div>
          
          <div className="footer-col">
            <h5>Nuestro Catálogo</h5>
            <ul>
              <li><a href="#catalogo">Pajillas y Vasos Especiales</a></li>
              <li><a href="#catalogo">Bolsas Transparentes</a></li>
              <li><a href="#catalogo">Bolsas Gabacha y Basura</a></li>
              <li><a href="#catalogo">Desechables</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Ventajas VENTRIX</h5>
            <ul>
              <li><a href="#quienes-somos">Entregas Eficientes</a></li>
              <li><a href="#quienes-somos">Atención Rápida</a></li>
              <li><a href="#quienes-somos">Precios Competitivos</a></li>
              <li><a href="#quienes-somos">Soluciones Prácticas</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contacto</h5>
            <ul>
              <li><a href="mailto:carlosvega005@hotmail.com">carlosvega005@hotmail.com</a></li>
              <li><a href="tel:+50378823645">+503 7882-3645</a></li>
              <li><a href="#contacto">Solicitar Cotización</a></li>
            </ul>
          </div>
        </div>
        </Reveal>

        <Reveal delay="reveal-delay-100">
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} VENTRIX. Todos los derechos reservados. Distribuidor Industrial Autorizado.</p>
          <div style={{ display: 'flex' }}>
            <a href="#">Condiciones Comerciales</a>
            <a href="#">Privacidad de Datos</a>
          </div>
        </div>
        </Reveal>
      </footer>

      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            <div className={`toast-icon toast-${toast.type}-icon`}>
              {toast.type === 'error' && <AlertCircle size={20} />}
              {toast.type === 'warning' && <AlertTriangle size={20} />}
              {toast.type === 'success' && <CheckCircle2 size={20} />}
              {toast.type === 'info' && <Info size={20} />}
            </div>
            <div className="toast-content">{toast.message}</div>
            <button className="toast-close" onClick={() => setToast(null)} aria-label="Cerrar notificación">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/50378823645?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20los%20productos%20de%20VENTRIX" 
        target="_blank" 
        rel="noreferrer" 
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="whatsapp-icon" fill="currentColor">
          <path d="M16.002 2.012c-7.72 0-13.98 6.262-13.98 13.98 0 2.464.646 4.869 1.874 6.985L2.012 30l7.21-1.892c2.043 1.127 4.35 1.72 6.78 1.72 7.72 0 13.98-6.262 13.98-13.98 0-7.718-6.26-13.836-13.98-13.836zM16.002 27.467c-2.146 0-4.24-.576-6.082-1.666l-.436-.26-4.52 1.185 1.205-4.407-.285-.453A11.551 11.551 0 014.382 15.992c0-6.42 5.223-11.642 11.62-11.642 6.42 0 11.64 5.222 11.64 11.642 0 6.42-5.22 11.475-11.64 11.475zm6.386-8.72c-.35-.175-2.062-1.018-2.383-1.135-.32-.117-.553-.175-.786.175-.233.35-.903 1.135-1.106 1.368-.204.233-.408.262-.757.087-1.428-.687-2.614-1.393-3.61-2.914-.204-.32.002-.486.173-.66.155-.155.35-.407.525-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.03-.612-.087-.175-.786-1.896-1.077-2.596-.282-.685-.568-.592-.786-.602-.204-.01-.437-.01-.67-.01-.233 0-.612.087-.932.437-.32.35-1.223 1.194-1.223 2.913 0 1.72 1.253 3.38 1.428 3.613.175.233 2.457 3.758 5.955 5.264 2.128.92 2.87.817 3.395.73 .604-.1 1.848-.755 2.11-1.484.262-.73.262-1.353.185-1.484-.078-.131-.29-.204-.64-.38z"/>
        </svg>
      </a>
    </div>
  );
}
