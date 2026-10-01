import { DiagramConfig, EngineConfig } from '../types/engine';

export const DIAGRAM_CONFIGS: Record<string, DiagramConfig> = {
  // 1. MOTOR 4 CILINDROS EN LÍNEA (I4)
  inline4: {
    configType: 'Inline-4',
    title: 'Esquema y Plano Técnico: Motor 4 Cilindros en Línea (I4 DOHC / SOHC)',
    svgType: 'inline4',
    bgBlueprintUrl: '/blueprints/blueprint_inline4.png',
    hotspots: [
      {
        id: 'hs_i4_1',
        partId: 'cylinder_head',
        name: 'Culata / Tapa de Cilindros',
        x: 50,
        y: 24,
        description: 'Tapa superior que contiene las válvulas, bujías e inyectores.'
      },
      {
        id: 'hs_i4_2',
        partId: 'camshaft',
        name: 'Árboles de Levas (DOHC)',
        x: 50,
        y: 16,
        description: 'Controlan el tiempo exacto de apertura y cierre de válvulas.'
      },
      {
        id: 'hs_i4_3',
        partId: 'block',
        name: 'Bloque de Motor I4',
        x: 50,
        y: 48,
        description: 'Estructura principal con 4 cilindros alineados en vertical.'
      },
      {
        id: 'hs_i4_4',
        partId: 'pistons',
        name: 'Pistones y Bielas',
        x: 40,
        y: 45,
        description: 'Transforman la presión de combustión en fuerza lineal.'
      },
      {
        id: 'hs_i4_5',
        partId: 'crankshaft',
        name: 'Cigüeñal',
        x: 50,
        y: 72,
        description: 'Convierte el movimiento lineal de los pistones en rotación.'
      },
      {
        id: 'hs_i4_6',
        partId: 'timing_belt_chain',
        name: 'Cadena / Correa de Distribución',
        x: 20,
        y: 35,
        description: 'Sincroniza el cigüeñal con los árboles de levas.'
      },
      {
        id: 'hs_i4_7',
        partId: 'fuel_injectors',
        name: 'Inyectores de Combustible',
        x: 62,
        y: 28,
        description: 'Dosifican el combustible a alta presión en los cilindros.'
      },
      {
        id: 'hs_i4_8',
        partId: 'oil_pan',
        name: 'Cárter de Aceite',
        x: 50,
        y: 88,
        description: 'Depósito inferior de lubricante y bomba de aceite.'
      }
    ]
  },

  // 2. MOTOR 6 CILINDROS EN LÍNEA (I6)
  inline6: {
    configType: 'Inline-6',
    title: 'Esquema y Plano Técnico: Motor 6 Cilindros en Línea (I6 Clásico & OHC)',
    svgType: 'inline6',
    bgBlueprintUrl: '/blueprints/blueprint_inline6.png',
    hotspots: [
      {
        id: 'hs_i6_1',
        partId: 'block',
        name: 'Bloque 6 en Línea',
        x: 50,
        y: 50,
        description: 'Bloque alargado de 6 cilindros con balance de inercia perfecto de primer y segundo orden.'
      },
      {
        id: 'hs_i6_2',
        partId: 'crankshaft',
        name: 'Cigüeñal de 7 Bancadas',
        x: 50,
        y: 74,
        description: 'Cigüeñal reforzado de 7 bancadas para alta rigidez y cero vibraciones.'
      },
      {
        id: 'hs_i6_3',
        partId: 'cylinder_head',
        name: 'Tapa de Cilindros Alargada',
        x: 50,
        y: 26,
        description: 'Culata con cámaras hemisféricas o de cuña.'
      },
      {
        id: 'hs_i6_4',
        partId: 'intake_manifold',
        name: 'Múltiple de Admisión (Tri-Carburador / Inyección)',
        x: 20,
        y: 42,
        description: 'Múltiple de 6 conductos independientes.'
      },
      {
        id: 'hs_i6_5',
        partId: 'exhaust_manifold',
        name: 'Múltiple de Escape 6 a 2',
        x: 80,
        y: 44,
        description: 'Colector deportivo pulido.'
      },
      {
        id: 'hs_i6_6',
        partId: 'camshaft',
        name: 'Árbol de Levas (SOHC / OHV)',
        x: 50,
        y: 18,
        description: 'Eje de levas superior o lateral con empujadores.'
      }
    ]
  },

  // 3. MOTOR V6 TURBO DIESEL (V6)
  v6: {
    configType: 'V6',
    title: 'Esquema y Plano Técnico: Motor V6 Turbo Diésel (60° V-Engine)',
    svgType: 'v6',
    bgBlueprintUrl: '/blueprints/blueprint_v6.png',
    hotspots: [
      {
        id: 'hs_v6_1',
        partId: 'block',
        name: 'Bloque en V a 60° (CGI)',
        x: 50,
        y: 52,
        description: 'Bloque compacto de hierro de grafito compactado de alta durabilidad.'
      },
      {
        id: 'hs_v6_2',
        partId: 'turbocharger',
        name: 'Turbocompresor VGT Intercooler',
        x: 82,
        y: 36,
        description: 'Turbo de geometría variable para respuesta de torque instantánea.'
      },
      {
        id: 'hs_v6_3',
        partId: 'fuel_injectors',
        name: 'Common Rail piezoeléctrico',
        x: 50,
        y: 30,
        description: 'Rampa de inyección diésel a más de 2000 bares de presión.'
      },
      {
        id: 'hs_v6_4',
        partId: 'cylinder_head',
        name: 'Tapas de Cilindro Duales',
        x: 24,
        y: 32,
        description: 'Culatas independientes para cada bancada en V.'
      },
      {
        id: 'hs_v6_5',
        partId: 'crankshaft',
        name: 'Cigüeñal V6 Forjado',
        x: 50,
        y: 74,
        description: 'Soporta hasta 600 Nm de torque sostenido.'
      }
    ]
  },

  // 4. MOTOR 3 CILINDROS TURBO (I3)
  inline3: {
    configType: 'Inline-3',
    title: 'Esquema y Plano Técnico: Motor 3 Cilindros Turbo (Downsizing I3)',
    svgType: 'inline3',
    bgBlueprintUrl: '/blueprints/blueprint_inline3.png',
    hotspots: [
      {
        id: 'hs_i3_1',
        partId: 'block',
        name: 'Bloque Compacto Tricilíndrico',
        x: 50,
        y: 50,
        description: 'Bloque súper liviano de aluminio ultra compacto.'
      },
      {
        id: 'hs_i3_2',
        partId: 'turbocharger',
        name: 'Módulo Turbocompresor',
        x: 78,
        y: 38,
        description: 'Turbo de baja inercia integrado directamente al múltiple de escape.'
      },
      {
        id: 'hs_i3_3',
        partId: 'crankshaft',
        name: 'Cigüeñal y Eje Equilibrador',
        x: 50,
        y: 74,
        description: 'Eje contrarrotante para compensar las vibraciones naturales de 3 cilindros.'
      },
      {
        id: 'hs_i3_4',
        partId: 'cylinder_head',
        name: 'Tapa 12V DOHC VTi',
        x: 50,
        y: 24,
        description: 'Culata de 4 válvulas por cilindro con variador de fase dual.'
      }
    ]
  },

  // 5. MOTOR V8 CLÁSICO (V8)
  v8: {
    configType: 'V8',
    title: 'Esquema y Plano Técnico: Motor V8 90° (Muscle Car / Y-Block)',
    svgType: 'v8',
    bgBlueprintUrl: '/blueprints/blueprint_v8.png',
    hotspots: [
      {
        id: 'hs_v8_1',
        partId: 'block',
        name: 'Bloque V8 a 90°',
        x: 50,
        y: 54,
        description: 'Bloque robusto de hierro fundido con bancadas cruzadas.'
      },
      {
        id: 'hs_v8_2',
        partId: 'intake_manifold',
        name: 'Múltiple de Admisión Cuádruple',
        x: 50,
        y: 32,
        description: 'Múltiple central alimentado por carburador de 4 bocas o inyección.'
      },
      {
        id: 'hs_v8_3',
        partId: 'cylinder_head',
        name: 'Tapas de Cilindros Laterales',
        x: 24,
        y: 30,
        description: 'Tapas de cilindros OHV con varillas empujadoras y balancines.'
      },
      {
        id: 'hs_v8_4',
        partId: 'crankshaft',
        name: 'Cigüeñal Plano Crossplane V8',
        x: 50,
        y: 72,
        description: 'Genera el ronquido grave característico de los motores V8.'
      },
      {
        id: 'hs_v8_5',
        partId: 'exhaust_manifold',
        name: 'Colectores de Escape Dobles',
        x: 12,
        y: 50,
        description: 'Salida independiente por cada lado del bloque en V.'
      }
    ]
  },

  // Fallback genérico (para mantener retrocompatibilidad)
  inline: {
    configType: 'Inline-4',
    title: 'Esquema y Plano Técnico: Motor en Línea',
    svgType: 'inline4',
    bgBlueprintUrl: '/blueprints/blueprint_inline4.png',
    hotspots: [
      {
        id: 'hs_in_1',
        partId: 'cylinder_head',
        name: 'Culata / Tapa de Cilindros',
        x: 50,
        y: 26,
        description: 'Tapa superior que contiene las válvulas y bujías.'
      },
      {
        id: 'hs_in_2',
        partId: 'block',
        name: 'Bloque de Motor',
        x: 50,
        y: 50,
        description: 'Estructura principal con cilindros colocados en hilera.'
      },
      {
        id: 'hs_in_3',
        partId: 'crankshaft',
        name: 'Cigüeñal',
        x: 50,
        y: 74,
        description: 'Eje giratorio en la base del bloque.'
      }
    ]
  }
};

export function getDiagramForEngineConfig(config: EngineConfig): DiagramConfig {
  if (config === 'Inline-3') return DIAGRAM_CONFIGS.inline3;
  if (config === 'Inline-4') return DIAGRAM_CONFIGS.inline4;
  if (config === 'Inline-6') return DIAGRAM_CONFIGS.inline6;
  if (config === 'V6') return DIAGRAM_CONFIGS.v6;
  if (config === 'V8') return DIAGRAM_CONFIGS.v8;
  if (config.startsWith('Inline')) return DIAGRAM_CONFIGS.inline4;
  if (config.startsWith('V')) return DIAGRAM_CONFIGS.v6;
  if (config.startsWith('Boxer')) return DIAGRAM_CONFIGS.inline4;
  return DIAGRAM_CONFIGS.inline4;
}
