import { Row, Col, Card } from 'antd';
import { Target, Eye, Rocket, Handshake, Boxes, DollarSign, Building2, Zap, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';

export default function AboutUs() {
  return (
    <section id="quienes-somos" style={{ padding: '80px 0', background: 'var(--bg-card)' }}>
      <div className="container">
        
        {/* SECCIÓN 1: ¿Quiénes Somos? */}
        <div style={{ marginBottom: '80px' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <Reveal>

              <h2 style={{ 
                fontSize: '2.5rem', 
                color: 'var(--primary-accent)', 
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Tu aliado estratégico en abastecimiento empresarial.
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
              <Card 
                hoverable 
                style={{ height: '100%', borderColor: 'var(--border-light)', borderRadius: '16px', background: 'var(--bg-card)' }}
                bodyStyle={{ padding: '32px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Target size={32} color="var(--primary-accent)" style={{ marginRight: '16px' }} />
                  <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Nuestra Misión</h3>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Brindar soluciones rápidas, confiables y eficientes en abastecimiento empresarial, ofreciendo productos de calidad y atención personalizada que ayuden a nuestros clientes a operar de manera más práctica y organizada.
                </p>
              </Card>
              </Reveal>
            </Col>
            <Col xs={24} md={12}>
              <Reveal delay="reveal-delay-200">
              <Card 
                hoverable 
                style={{ height: '100%', borderColor: 'var(--border-light)', borderRadius: '16px', background: 'var(--bg-card)' }}
                bodyStyle={{ padding: '32px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Eye size={32} color="var(--primary-accent)" style={{ marginRight: '16px' }} />
                  <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>Nuestra Visión</h3>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Ser una empresa reconocida en El Salvador por nuestra rapidez, confianza y excelencia en abastecimiento empresarial, construyendo relaciones sólidas y duraderas con nuestros clientes.
                </p>
              </Card>
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
              <Card bordered={false} style={{ height: '100%', background: 'transparent' }}>
                <Rocket size={40} color="var(--primary-accent)" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Rapidez y Entregas Eficientes</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Sabemos que el tiempo es dinero. Programamos entregas ágiles para que tu inventario nunca llegue a cero.
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} style={{ height: '100%', background: 'transparent' }}>
                <Handshake size={40} color="var(--primary-accent)" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Atención Personalizada</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Entendemos que cada negocio es diferente. Te damos soluciones y asesoría ajustadas a los requerimientos y volúmenes exactos de tu empresa.
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} style={{ height: '100%', background: 'transparent' }}>
                <Boxes size={40} color="var(--primary-accent)" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Disponibilidad Garantizada</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Mantenemos el stock que necesitas para que no tengas que preocuparte por desabastecimientos de última hora.
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card bordered={false} style={{ height: '100%', background: 'transparent' }}>
                <DollarSign size={40} color="var(--primary-accent)" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Precios Competitivos</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Estructuramos nuestros costos para ofrecerte el mejor balance entre calidad y precio, protegiendo siempre la rentabilidad de tu negocio.
                </p>
              </Card>
            </Col>
          </Row>
        </div>

      </div>
    </section>
  );
}
