import { Row, Col, Card } from 'antd';
import { Target, Eye, Rocket, Handshake, Boxes, DollarSign, Building2, Zap, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';

export default function AboutUs() {
  return (
    <section id="quienes-somos" style={{ padding: '120px 0', background: 'transparent' }}>
      <div className="container">
        
        {/* SECCIÓN 1: ¿Quiénes Somos? */}
        <div style={{ marginBottom: '80px' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <Reveal>

              <h2 style={{ 
                fontSize: '4rem', 
                color: 'var(--text-inverse)', 
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                marginBottom: '24px',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                Tu aliado estratégico.
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Somos una empresa enfocada en el abastecimiento empresarial de desechables, empaques y productos de alta rotación para restaurantes, cafeterías y negocios. Trabajamos con un enfoque en:
              </p>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Zap size={20} color="var(--primary-accent)" />
                  <span>Rapidez</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Handshake size={20} color="var(--primary-accent)" />
                  <span>Atención personalizada</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Boxes size={20} color="var(--primary-accent)" />
                  <span>Disponibilidad</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="var(--primary-accent)" />
                  <span>Soluciones eficientes para nuestros clientes.</span>
                </div>
              </div>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '16px' }}>
                Nuestro objetivo es convertirnos en un aliado estratégico que facilite la operación diaria de cada negocio.
              </p>
              </Reveal>
            </Col>
            <Col xs={24} md={12}>
              <Reveal delay="reveal-delay-200">
              <div style={{ 
                background: 'linear-gradient(135deg, var(--bg-deep) 0%, var(--primary-accent) 100%)',
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'var(--shadow-lg)',
                minHeight: '300px'
              }}>
                <Building2 size={80} color="var(--text-inverse)" opacity={0.8} />
              </div>
              </Reveal>
            </Col>
          </Row>
        </div>

        {/* SECCIÓN 2: Misión y Visión */}
        <div style={{ marginBottom: '80px' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Reveal>
              <div className="floating-card" style={{ height: '100%', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Target size={40} color="var(--secondary-accent)" style={{ marginRight: '20px', filter: 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.4))' }} />
                  <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-primary)', fontWeight: 800 }}>Nuestra Misión</h3>
                </div>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Brindar soluciones rápidas, confiables y eficientes en abastecimiento empresarial, ofreciendo productos de calidad y atención personalizada que ayuden a nuestros clientes a operar de manera más práctica y organizada.
                </p>
              </div>
              </Reveal>
            </Col>
            <Col xs={24} md={12}>
              <Reveal delay="reveal-delay-200">
              <div className="floating-card" style={{ height: '100%', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Eye size={40} color="var(--secondary-accent)" style={{ marginRight: '20px', filter: 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.4))' }} />
                  <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-primary)', fontWeight: 800 }}>Nuestra Visión</h3>
                </div>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Ser una empresa reconocida en El Salvador por nuestra rapidez, confianza y excelencia en abastecimiento empresarial, construyendo relaciones sólidas y duraderas con nuestros clientes.
                </p>
              </div>
              </Reveal>
            </Col>
          </Row>
        </div>

        {/* SECCIÓN 3: La Lógica del Negocio */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
              ¿Por qué abastecerte con VENTRIX?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
              Diseñamos nuestra logística para facilitar tu día a día con un suministro completo de desechables, empaques, bolsas, vasos y servilletas esenciales.
            </p>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Reveal delay="">
              <div className="floating-feature" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Rocket size={64} color="var(--secondary-accent)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.4))' }} />
                <h4 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 800 }}>Rapidez Extrema</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  El tiempo es dinero. Entregas ágiles para que tu inventario nunca llegue a cero.
                </p>
              </div>
              </Reveal>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Reveal delay="reveal-delay-100">
              <div className="floating-feature" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Handshake size={64} color="var(--secondary-accent)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.4))' }} />
                <h4 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 800 }}>Trato Personalizado</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  Soluciones y asesoría milimétricamente ajustadas a tu volumen y requerimientos.
                </p>
              </div>
              </Reveal>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Reveal delay="reveal-delay-200">
              <div className="floating-feature" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Boxes size={64} color="var(--secondary-accent)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.4))' }} />
                <h4 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 800 }}>Stock Infinito</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  Mantenemos el inventario por ti. Olvídate del desabastecimiento de última hora.
                </p>
              </div>
              </Reveal>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Reveal delay="reveal-delay-300">
              <div className="floating-feature" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <DollarSign size={64} color="var(--secondary-accent)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.4))' }} />
                <h4 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 800 }}>Rentabilidad</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  Estructuramos costos para ofrecerte el balance perfecto entre calidad y precio.
                </p>
              </div>
              </Reveal>
            </Col>
          </Row>
        </div>

      </div>
    </section>
  );
}
