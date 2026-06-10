import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { CATALOG_DATA } from '../data_catalog';
import { CheckCircle2, Circle, Search, Download } from 'lucide-react';

interface CatalogTableProps {
  onQuoteRequest?: (products: string[]) => void;
}

const ProductRow = React.memo(({ producto, isSelected, onToggle, hasMedida, hasPaquete, hasFardo }: any) => {
  return (
    <tr 
      className={`b2b-row ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(producto.key)}
    >
      <td className="b2b-cell b2b-cell-checkbox">
        {isSelected ? (
          <CheckCircle2 size={24} color="var(--color-cta)" fill="rgba(0, 176, 80, 0.15)" strokeWidth={2} />
        ) : (
          <Circle size={24} color="rgba(0,0,0,0.15)" strokeWidth={1.5} />
        )}
      </td>
      <td className="b2b-cell">
        <span className="b2b-sku">{producto.key}</span>
        <div className="b2b-title">{producto.descripcion}</div>
        {producto.colores && <div className="b2b-subtitle text-muted">{producto.colores}</div>}
      </td>
      {hasMedida && (
        <td className="b2b-cell b2b-measure">
          {producto.tamano && producto.tamano !== "N/A" ? producto.tamano : (producto.medidas || "")}
        </td>
      )}
      {hasPaquete && (
        <td className="b2b-cell b2b-package">
          {producto.paquete || ""}
        </td>
      )}
      {hasFardo && (
        <td className="b2b-cell b2b-bundle">
          {producto.fardo || ""}
        </td>
      )}
    </tr>
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
      <div className="b2b-table-container">
        <table className="b2b-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}></th>
              <th>Producto</th>
              {hasMedida && <th>Medida / Tamaño</th>}
              {hasPaquete && <th>Por Paquete</th>}
              {hasFardo && <th>Por Fardo</th>}
            </tr>
          </thead>
          <tbody>
            {categoria.productos.map((producto: any) => (
              <ProductRow
                key={producto.key}
                producto={producto}
                isSelected={selectedItems.has(producto.key)}
                onToggle={toggleSelection}
                hasMedida={hasMedida}
                hasPaquete={hasPaquete}
                hasFardo={hasFardo}
              />
            ))}
          </tbody>
        </table>
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
    <div className="catalog-table-container catalog-dot-bg" style={{ padding: '40px 0', minHeight: '800px', position: 'relative', overflow: 'hidden' }}>
      
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

          {/* SEARCH BAR */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-accent)' }}>
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nombre, medida o tamaño..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                borderRadius: '100px',
                border: '2px solid rgba(0, 123, 255, 0.2)',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                color: 'var(--text-primary)',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 123, 255, 0.2)'}
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
        background: 'var(--bg-card)', 
        borderRadius: '24px', 
        padding: '32px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)'
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
