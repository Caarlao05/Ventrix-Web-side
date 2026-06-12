import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { CATALOG_DATA } from '../data_catalog';
import { CheckCircle2, Circle, Search, Download } from 'lucide-react';

interface CatalogTableProps {
  onQuoteRequest?: (products: string[]) => void;
}

const ProductRow = React.memo(({ producto, isSelected, onToggle, hasMedida, hasPaquete, hasFardo, index }: any) => {
  return (
    <div 
      className={`b2b-row animate-fade-in-up ${isSelected ? 'selected' : ''}`}
      style={{ 
        animationDelay: `${index * 40}ms`,
        display: 'flex',
        alignItems: 'center',
        padding: '24px 32px',
        gap: '24px'
      }}
      onClick={() => onToggle(producto.key)}
    >
      <div className="b2b-cell-checkbox" style={{ flexShrink: 0 }}>
        {isSelected ? (
          <CheckCircle2 size={28} color="var(--color-cta)" fill="rgba(0, 176, 80, 0.15)" strokeWidth={2} />
        ) : (
          <Circle size={28} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
        )}
      </div>
      <div className="b2b-cell-main" style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="b2b-sku" style={{ fontSize: '0.85rem', color: 'var(--secondary-accent)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{producto.key}</span>
        <div className="b2b-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-inverse)' }}>{producto.descripcion}</div>
        {producto.colores && <div className="b2b-subtitle" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>{producto.colores}</div>}
      </div>
      
      <div style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
        {hasMedida && (
          <div className="b2b-measure-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Dimensiones</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{producto.tamano && producto.tamano !== "N/A" ? producto.tamano : (producto.medidas || "-")}</span>
          </div>
        )}
        {hasPaquete && (
          <div className="b2b-package-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Por Paquete</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{producto.paquete || "-"}</span>
          </div>
        )}
        {hasFardo && (
          <div className="b2b-bundle-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>Por Fardo</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{producto.fardo || "-"}</span>
          </div>
        )}
      </div>
    </div>
  );
});

export default function CatalogTable({ onQuoteRequest }: CatalogTableProps) {
  const [activeTab, setActiveTab] = useState("0");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showPdf, setShowPdf] = useState(false);

  const toggleSelection = React.useCallback((key: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const renderProductCards = React.useCallback((categoria: any) => {
    const hasMedida = categoria.productos.some((p: any) => p.tamano || p.medidas);
    const hasPaquete = categoria.productos.some((p: any) => p.paquete);
    const hasFardo = categoria.productos.some((p: any) => p.fardo);

    return (
      <div className="b2b-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categoria.productos.map((producto: any, index: number) => (
          <ProductRow
            key={producto.key}
            index={index}
            producto={producto}
            isSelected={selectedItems.has(producto.key)}
            onToggle={toggleSelection}
            hasMedida={hasMedida}
            hasPaquete={hasPaquete}
            hasFardo={hasFardo}
          />
        ))}
      </div>
    );
  }, [selectedItems, toggleSelection]);

  const items: TabsProps['items'] = React.useMemo(() => {
    return CATALOG_DATA.categorias.map((categoria, index) => {
      const filteredProducts = categoria.productos.filter((p: any) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          (p.descripcion && p.descripcion.toLowerCase().includes(q)) ||
          (p.tamano && p.tamano.toLowerCase().includes(q)) ||
          (p.medidas && p.medidas.toLowerCase().includes(q))
        );
      });

      return {
        key: String(index),
        label: categoria.nombre,
        children: renderProductCards({ ...categoria, productos: filteredProducts }),
      };
    }).filter(tab => !searchQuery || tab.children.props.categoria.productos.length > 0);
  }, [renderProductCards, searchQuery]);

  return (
    <div className="catalog-table-container" style={{ padding: '80px 0', minHeight: '800px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ 
          fontSize: '3.2rem', 
          color: 'var(--text-primary)', 
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Línea de Suministros
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--secondary-accent)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.2em',
          fontWeight: 600
        }}>
          ESPECIFICACIONES TÉCNICAS
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center', maxWidth: '800px', margin: '40px auto 0' }}>
          
          {/* TOGGLE PDF BUTTON */}
          <button 
            onClick={() => setShowPdf(!showPdf)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 24px',
              borderRadius: '100px',
              background: showPdf ? 'var(--bg-deep)' : 'var(--primary-accent)',
              color: showPdf ? 'var(--text-primary)' : 'white',
              fontWeight: 600,
              border: showPdf ? '2px solid var(--border-light)' : 'none',
              cursor: 'pointer',
              boxShadow: showPdf ? 'none' : '0 8px 24px rgba(11, 45, 92, 0.2)',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => !showPdf && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !showPdf && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Download size={20} />
            {showPdf ? 'Ocultar Catálogo' : 'Ver Catálogo Más Detallado'}
          </button>

          {/* MASSIVE SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto 40px auto' }}>
            <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}>
              <Search size={28} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por descripción o medida..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '24px 24px 24px 72px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '1.25rem',
                fontWeight: 500,
                outline: 'none',
                boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                color: 'var(--text-inverse)',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.background = 'rgba(15, 23, 42, 0.8)';
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 32px 64px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'rgba(15, 23, 42, 0.6)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)';
              }}
            />
          </div>

          {/* QUOTE BUTTON INLINE */}
          {selectedItems.size > 0 && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '6px 6px 6px 20px',
              borderRadius: '100px',
              boxShadow: '0 8px 24px rgba(0, 176, 80, 0.15)',
              border: '2px solid var(--color-cta)',
              animation: 'fadeInUp 0.3s ease-out'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: 'var(--color-cta)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{selectedItems.size}</span> 
                <span>seleccionados</span>
              </span>
              <a href="#contacto" className="btn btn-primary" style={{ padding: '12px 24px', margin: 0, borderRadius: '100px' }} onClick={() => {
                if (onQuoteRequest) {
                  const selectedProductsList = CATALOG_DATA.categorias
                    .flatMap(c => c.productos as any[])
                    .filter(p => selectedItems.has(p.key))
                    .map(p => p.descripcion);
                  onQuoteRequest(selectedProductsList);
                  setSelectedItems(new Set());
                }
              }}>
                Cotizar
              </a>
            </div>
          )}
        </div>

        {/* PDF VIEWER */}
        {showPdf && (
          <div style={{ 
            width: '100%', 
            height: '800px', 
            maxWidth: '1000px',
            margin: '32px auto 0', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '1px solid var(--border-light)', 
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            animation: 'fadeInUp 0.4s ease-out'
          }}>
            <iframe 
              src="/ventrix_catalogo.pdf" 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }} 
              title="Catálogo Ventrix PDF" 
            />
          </div>
        )}
      </div>

      <div style={{ 
        position: 'relative',
        zIndex: 1,
        padding: '0 16px',
      }}>
        <Tabs 
          defaultActiveKey="0" 
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items} 
          animated={{ inkBar: true, tabPane: true }}
          size="large"
          tabBarStyle={{ marginBottom: '32px' }}
        />
      </div>
    </div>
  );
}
