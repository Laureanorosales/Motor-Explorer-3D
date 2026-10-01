import { Engine } from '../types/engine';

export const ENGINES_DATA: Engine[] = [
  // ==========================================
  // CLÁSICOS HISTÓRICOS ARGENTINOS
  // ==========================================

  // 1. TORINO TORNADO 230 INTERCEPTOR (380W)
  {
    id: 'torino-tornado-230-380w',
    name: 'IKA Torino Tornado Interceptor 230 (380W)',
    brand: 'IKA / Torino',
    years: '1966 - 1973',
    displacementCc: 3770,
    displacementL: '3.8L',
    powerHp: 200,
    torqueNm: 320,
    rpmMax: 5400,
    config: 'Inline-6',
    aspiration: 'Atmosférico',
    valvetrain: 'SOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El mítico motor Tornado de 4 bancadas equipado con 3 carburadores horizontales Weber 45 DCOE de doble boca. Proeza mecánica del automovilismo argentino que hizo historia en las 84 Horas de Nürburgring en 1969 bajo la dirección de Fangio y Berta.',
    notableCars: ['Torino 380W', 'Torino 380', 'Torino 300 L'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'intake_manifold', 'fuel_injectors', 'spark_plugs', 'oil_pump']
  },

  // 2. TORINO 230 7-BANCADAS (GS 200)
  {
    id: 'torino-230-7-bancadas',
    name: 'Torino 230 7-Bancadas OHC (GS 200)',
    brand: 'IKA / Renault',
    years: '1973 - 1982',
    displacementCc: 3770,
    displacementL: '3.8L',
    powerHp: 215,
    torqueNm: 334,
    rpmMax: 5500,
    config: 'Inline-6',
    aspiration: 'Atmosférico',
    valvetrain: 'SOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Evolución definitiva del bloque Torino desarrollada íntegramente en Argentina por Oreste Berta y el equipo de IKA. Incorporó 7 bancadas para eliminar vibraciones y una culata mejorada con cámaras hemisféricas.',
    notableCars: ['Torino GS 200', 'Torino TSX', 'Torino Grand Routier', 'Torino ZX'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'intake_manifold', 'spark_plugs', 'oil_pan']
  },

  // 3. FORD FALCON 221 SP (SPRINT)
  {
    id: 'ford-falcon-221-sp',
    name: 'Ford 221 SP Sprint (3.6L)',
    brand: 'Ford Argentina',
    years: '1973 - 1982',
    displacementCc: 3620,
    displacementL: '3.6L',
    powerHp: 166,
    torqueNm: 290,
    rpmMax: 5000,
    config: 'Inline-6',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El alma deportiva del Ford Falcon en Argentina. La versión SP (Special Performance) contaba con culata modificada de lumbreras pulidas, múltiple de admisión de aluminio independiente, carburador Holley 40/40 de dos bocas y árbol de levas deportivo.',
    notableCars: ['Ford Falcon Sprint', 'Ford Falcon Futura SP', 'Ranchero SP'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'intake_manifold', 'spark_plugs', 'exhaust_manifold']
  },

  // 4. CHEVROLET 250 SUPER / SERIE 2
  {
    id: 'chevrolet-250-serie-2',
    name: 'Chevrolet 250 Super / Serie 2 (4.1L)',
    brand: 'Chevrolet Argentina',
    years: '1969 - 1978',
    displacementCc: 4097,
    displacementL: '4.1L',
    powerHp: 175,
    torqueNm: 326,
    rpmMax: 4800,
    config: 'Inline-6',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El inolvidable 6 cilindros de 250 pulgadas cúbicas que impulsó a la Chevy Serie 2. Reconocido por su inmenso torque desde bajas revoluciones, su robustez de bloque y su sonido grave en el escape deportivo.',
    notableCars: ['Chevy Coupe SS', 'Chevy Serie 2', 'Chevrolet Rally Sport', 'Chevy 250 Sedan'],
    partIds: ['block', 'crankshaft', 'pistons', 'camshaft', 'valves', 'intake_manifold', 'spark_plugs', 'oil_pan']
  },

  // 5. DODGE SLANT-SIX 225 INCLINADO
  {
    id: 'dodge-slant-six-225',
    name: 'Dodge Slant-Six 225 "Inclinado" (3.7L)',
    brand: 'Dodge / Chrysler Argentina',
    years: '1965 - 1980',
    displacementCc: 3687,
    displacementL: '3.7L',
    powerHp: 145,
    torqueNm: 294,
    rpmMax: 4400,
    config: 'Inline-6',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Apodado el "Inclinado" por su bloque de 6 cilindros inclinado 30 grados lateralmente para acomodar un perfil de capó más bajo y colectores de admisión de longitud optimizada. Legendario por su confiabilidad mecánica indestrucitble.',
    notableCars: ['Dodge Polara', 'Dodge Coronado', 'Dodge GT', 'Dodge RT / GTX 6'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'intake_manifold', 'oil_pump']
  },

  // 6. DODGE GTX V8 318
  {
    id: 'dodge-gtx-v8-318',
    name: 'Dodge GTX 318 V8 (5.2L)',
    brand: 'Dodge / Chrysler Argentina',
    years: '1970 - 1979',
    displacementCc: 5210,
    displacementL: '5.2L',
    powerHp: 212,
    torqueNm: 418,
    rpmMax: 4400,
    config: 'V8',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El icónico motor V8 de 318 pulgadas cúbicas traído de la planta de Chrysler Canadá para equipar a la coupé Dodge GTX V8 nacional. El Muscle Car por excelencia de la producción argentina.',
    notableCars: ['Dodge GTX V8 Coupé'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'intake_manifold', 'spark_plugs', 'exhaust_manifold']
  },

  // 7. FIAT 125 BIALBERO 1.6 TWIN CAM
  {
    id: 'fiat-125-bialbero-1600',
    name: 'Fiat 125 Bialbero 1.6 Twin Cam',
    brand: 'Fiat Concord Argentina',
    years: '1972 - 1982',
    displacementCc: 1608,
    displacementL: '1.6L',
    powerHp: 110,
    torqueNm: 150,
    rpmMax: 6200,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El primer motor Bialbero (doble árbol de levas a la cabeza) fabricado en masa en la Argentina. Diseñado originalmente por Aurelio Lampredi, entregaba prestaciones sorprendentes para la época en las versiones Potenciado y CL.',
    notableCars: ['Fiat 125 Berlina', 'Fiat 125 Coupé Sport', 'Fiat 125 Potenciado', 'Fiat 125 Mirafiori'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'intake_manifold', 'spark_plugs']
  },

  // 8. FIAT 600 R / S
  {
    id: 'fiat-600-r-s',
    name: 'Fiat 600 R / S (843cc - 903cc)',
    brand: 'Fiat Concord Argentina',
    years: '1960 - 1982',
    displacementCc: 843,
    displacementL: '0.8L',
    powerHp: 36,
    torqueNm: 58,
    rpmMax: 4800,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El motor trasero de 4 cilindros que motorizó a generaciones de familias en Argentina. Muy sencillo de mantener, económico y base de incontables modificaciones para competición de turismo en pista.',
    notableCars: ['Fiat 600 R', 'Fiat 600 S', 'Fiat 600 D / E'],
    partIds: ['block', 'pistons', 'cylinder_head', 'valves', 'water_pump', 'alternator', 'spark_plugs']
  },

  // 9. RENAULT CLÉON-FONTE 1.4 / 1.6
  {
    id: 'renault-cleon-fonte-1600',
    name: 'Renault Cléon-Fonte 1.4 / 1.6',
    brand: 'Renault Argentina / IKA',
    years: '1971 - 1997',
    displacementCc: 1565,
    displacementL: '1.6L',
    powerHp: 92,
    torqueNm: 130,
    rpmMax: 5500,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Famoso motor de bloque de fundición con camisas húmedas intercambiables. Equipó durante casi tres décadas a la gama de autos más popular de Renault en Argentina (R12, R18, R11, R9, R19) demostrando una longevidad admirable.',
    notableCars: ['Renault 12 GTS', 'Renault 18 1.6', 'Renault 11 Turbo / TS', 'Renault 9', 'Renault 19 1.6'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'water_pump', 'spark_plugs']
  },

  // 10. PEUGEOT XN1 2.0
  {
    id: 'peugeot-xn1-2000',
    name: 'Peugeot XN1 2.0L',
    brand: 'Peugeot / Sevel Argentina',
    years: '1979 - 1995',
    displacementCc: 1971,
    displacementL: '2.0L',
    powerHp: 110,
    torqueNm: 170,
    rpmMax: 5200,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Motor de 2.0 Litros con bloque de aleación ligera de aluminio e inclinación a 45 grados. Reconocido por su suave andar, elasticidad y protagonismo histórico en el TC2000 con el Peugeot 504 TN.',
    notableCars: ['Peugeot 504 TN / SR', 'Peugeot 505 SR / SRI', 'Peugeot 504 Pick-Up'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'valves', 'intake_manifold', 'water_pump', 'oil_pump']
  },

  // 11. FORD V8 292 FASE II
  {
    id: 'ford-v8-292-fase-2',
    name: 'Ford V8 292 Fase II (4.7L)',
    brand: 'Ford Argentina',
    years: '1969 - 1982',
    displacementCc: 4785,
    displacementL: '4.7L',
    powerHp: 185,
    torqueNm: 370,
    rpmMax: 4500,
    config: 'V8',
    aspiration: 'Atmosférico',
    valvetrain: 'OHV (Pushrod)',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El clásico V8 Y-Block de 292 pulgadas cúbicas fabricado en la planta de Pacheco. La versión Fase II incorporó tapas de cilindros con puertos de escape independientes, siendo el corazón de los deslumbrantes Ford Fairlane y las Pick-Ups F-100.',
    notableCars: ['Ford Fairlane V8 Ltd', 'Ford Fairlane 500', 'Ford F-100 V8'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'intake_manifold', 'spark_plugs', 'oil_pan']
  },

  // 12. VOLKSWAGEN AP 1.8 / 2.0
  {
    id: 'volkswagen-ap-1800',
    name: 'Volkswagen AP 1.8 / 2.0 8V (Alta Performance)',
    brand: 'Volkswagen Argentina',
    years: '1991 - 2009',
    displacementCc: 1781,
    displacementL: '1.8L',
    powerHp: 105,
    torqueNm: 153,
    rpmMax: 5600,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'SOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El legendario motor AP (Alta Performance) derivado de ingeniería germana. Muy popular en el tuning y picadas en Argentina debido a la infinita disponibilidad de repuestos y enorme margen de potenciación.',
    notableCars: ['Volkswagen Gol GTI / GL 1.8', 'VW Gacel GS', 'VW Senda 1.8', 'VW Pointer GTI 2.0', 'VW Saveiro'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'fuel_injectors', 'spark_plugs']
  },

  // 13. SEVEL TIPO 1.6 8V
  {
    id: 'sevel-tipo-1600',
    name: 'Sevel Tipo 1.6 8V',
    brand: 'Sevel / Fiat Argentina',
    years: '1989 - 2001',
    displacementCc: 1580,
    displacementL: '1.6L',
    powerHp: 89,
    torqueNm: 132,
    rpmMax: 6000,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'SOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El popular motor "Tipo 1.6" producido por Sevel en El Palomar. Equipado con árbol de levas a la cabeza comandado por correa dentada y carburador Weber 32/34 TLDF. Un pilar en los modelos Fiat de los noventa.',
    notableCars: ['Fiat Uno SCR / 1.6R', 'Fiat Duna SCV / SCR', 'Fiat Spazio TR', 'Fiat Regatta 1.6'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'water_pump', 'spark_plugs']
  },


  // ==========================================
  // LOS 15 MOTORES DE LOS VEHÍCULOS MÁS VENDIDOS EN ARGENTINA (CAMIONETAS Y AUTOS)
  // ==========================================

  // 14. FIAT FIREFLY 1.3L 8V (FIAT CRONOS - #1 AUTO MÁS VENDIDO DE ARGENTINA)
  {
    id: 'fiat-firefly-13',
    name: 'Fiat FireFly 1.3L 8V (GSE)',
    brand: 'Fiat / Stellantis',
    years: '2018 - Presente',
    displacementCc: 1332,
    displacementL: '1.3L',
    powerHp: 99,
    torqueNm: 127,
    rpmMax: 6000,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'SOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El motor del Fiat Cronos, el auto sedán 0km más vendido de la Argentina producido en Ferreyra, Córdoba. Motor moderno de aleación de aluminio, distribución por cadena de por vida y alto torque a bajas revoluciones.',
    notableCars: ['Fiat Cronos Drive / Precision', 'Fiat Argo', 'Fiat Strada Freedom'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'fuel_injectors', 'spark_plugs', 'alternator']
  },

  // 15. TOYOTA 2.8L 1GD-FTV TURBO DIESEL (TOYOTA HILUX - #1 CAMIONETA MÁS VENDIDA)
  {
    id: 'toyota-hilux-1gd-28',
    name: 'Toyota 2.8L 1GD-FTV Turbo Diesel',
    brand: 'Toyota Argentina',
    years: '2015 - Presente',
    displacementCc: 2755,
    displacementL: '2.8L',
    powerHp: 204,
    torqueNm: 500,
    rpmMax: 4400,
    config: 'Inline-4',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Diésel',
    country: 'Argentina',
    description: 'El legendario motor turbodiésel Intercooler que equipa a la Toyota Hilux fabricada en la planta de Zárate, la camioneta pick-up líder indiscutida en ventas del mercado argentino y de exportación latinoamericana.',
    notableCars: ['Toyota Hilux SR / SRV / GR-Sport', 'Toyota SW4'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'turbocharger', 'intercooler', 'fuel_injectors', 'oil_pump', 'water_pump']
  },

  // 16. PEUGEOT / STELLANTIS 1.6L 16V VTi EC5 (PEUGEOT 208 - TOP 3 AUTOS MÁS VENDIDOS)
  {
    id: 'psa-16-vti-ec5',
    name: 'Peugeot / Citroën 1.6L 16V VTi (EC5)',
    brand: 'Peugeot / Stellantis',
    years: '2012 - Presente',
    displacementCc: 1587,
    displacementL: '1.6L',
    powerHp: 115,
    torqueNm: 150,
    rpmMax: 6000,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Corazón motriz del exitoso Peugeot 208 fabricado en la planta de El Palomar, Buenos Aires. Cuenta con distribución variable VTi de admisión y excelente rendimiento urbano.',
    notableCars: ['Peugeot 208 Feel / Allure / GT', 'Peugeot 2008', 'Peugeot Partner', 'Citroën C3'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'fuel_injectors', 'spark_plugs']
  },

  // 17. VOLKSWAGEN 3.0L V6 TDI (VW AMAROK - PICK-UP V6 MÁS VENDIDA)
  {
    id: 'vw-amarok-30-v6-tdi',
    name: 'Volkswagen 3.0L V6 TDI Turbo Diesel',
    brand: 'Volkswagen Argentina',
    years: '2017 - Presente',
    displacementCc: 2967,
    displacementL: '3.0L',
    powerHp: 258,
    torqueNm: 580,
    rpmMax: 4500,
    config: 'V6',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Diésel',
    country: 'Argentina',
    description: 'El potente propulsor V6 Turbodiésel de la Volkswagen Amarok fabricada en General Pacheco. Con 258 HP y función Overboost hasta 272 HP, es la pick-up mediana más veloz del mercado nacional.',
    notableCars: ['Volkswagen Amarok V6 Extreme / Highline / Black Edition'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'turbocharger', 'intercooler', 'fuel_injectors', 'oil_pump']
  },

  // 18. FORD 3.0L V6 ECOBLUE TURBO DIESEL (NUEVA FORD RANGER)
  {
    id: 'ford-ranger-30-v6-ecoblue',
    name: 'Ford 3.0L V6 EcoBlue Turbo Diesel',
    brand: 'Ford Argentina',
    years: '2023 - Presente',
    displacementCc: 2993,
    displacementL: '3.0L',
    powerHp: 250,
    torqueNm: 600,
    rpmMax: 4200,
    config: 'V6',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Diésel',
    country: 'Argentina',
    description: 'La más reciente innovación de Ford fabricada en Pacheco tras la inversión multimillonaria para la Nueva Ranger. Motor V6 turbodiésel con bloque de hierro de grafito compactado (CGI) e inmensos 600 Nm de torque.',
    notableCars: ['Ford Ranger V6 Limited / XLS'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'turbocharger', 'intercooler', 'fuel_injectors', 'oil_pan']
  },

  // 19. TOYOTA 1.5L 2NR-FE DUAL VVT-i (TOYOTA YARIS / ETIOS - TOP VENTAS)
  {
    id: 'toyota-2nr-fe-15',
    name: 'Toyota 1.5L 2NR-FE Dual VVT-i',
    brand: 'Toyota Argentina',
    years: '2016 - Presente',
    displacementCc: 1496,
    displacementL: '1.5L',
    powerHp: 107,
    torqueNm: 140,
    rpmMax: 6000,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Motor que equipa a dos de los autos más vendidos y confiables en las calles argentinas: Toyota Yaris y el recordado Etios. Posee distribución variable inteligente Dual VVT-i tanto en admisión como en escape.',
    notableCars: ['Toyota Yaris Hatchback / Sedan', 'Toyota Etios XLS / Cross'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'spark_plugs', 'alternator']
  },

  // 20. VOLKSWAGEN 1.6L 16V MSI EA211 (VW POLO / VIRTUS / SAVEIRO / GOL)
  {
    id: 'vw-ea211-16-msi',
    name: 'Volkswagen 1.6L 16V MSI (EA211)',
    brand: 'Volkswagen Argentina',
    years: '2014 - Presente',
    displacementCc: 1598,
    displacementL: '1.6L',
    powerHp: 110,
    torqueNm: 155,
    rpmMax: 5750,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Sucesor moderno del bloque EA111. Equipa a una gran parte de la flota Volkswagen más vendida en Argentina (Polo, Virtus, Saveiro, Suran y Fox). Colector de escape integrado en la tapa de cilindros para rápida temperatura óptima.',
    notableCars: ['Volkswagen Polo Trend / Comfortline', 'VW Virtus', 'VW Saveiro MSI', 'VW Fox / Suran'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'fuel_injectors', 'spark_plugs']
  },

  // 21. CHEVROLET 1.2L TURBO CSS PRIME (CHEVROLET TRACKER / ONIX TURBO)
  {
    id: 'chevrolet-12-turbo-css',
    name: 'Chevrolet 1.2L Turbo 3-Cilindros (CSS Prime)',
    brand: 'Chevrolet Argentina',
    years: '2020 - Presente',
    displacementCc: 1199,
    displacementL: '1.2L',
    powerHp: 132,
    torqueNm: 190,
    rpmMax: 5500,
    config: 'Inline-3',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Motor turbo intercooler producido en el Complejo Automotor de General Motors en Alvear, provincia de Santa Fe. Equipa a la Chevrolet Tracker (la SUV B más vendida del país) y al Onix Turbo.',
    notableCars: ['Chevrolet Tracker Premier / LTZ', 'Chevrolet Onix Turbo Premier'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'turbocharger', 'intercooler', 'fuel_injectors', 'spark_plugs']
  },

  // 22. RENAULT 1.6L SCe H4M 16V (RENAULT KANGOO II - #1 UTILITARIO MÁS VENDIDO)
  {
    id: 'renault-h4m-16-sce',
    name: 'Renault 1.6L SCe H4M 16V',
    brand: 'Renault Argentina',
    years: '2017 - Presente',
    displacementCc: 1598,
    displacementL: '1.6L',
    powerHp: 114,
    torqueNm: 156,
    rpmMax: 5500,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Motor de origen Nissan-Renault fabricado en la planta de Santa Isabel, Córdoba. El motor del utilitario Renault Kangoo II (líder absoluto de ventas en su segmento) y de los modelos Stepway, Duster y Logan.',
    notableCars: ['Renault Kangoo II Express / Stepway', 'Renault Duster 1.6', 'Renault Stepway', 'Renault Logan'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'spark_plugs', 'alternator']
  },

  // 23. TOYOTA 2.0L DYNAMIC FORCE M20A-FKS (TOYOTA COROLLA / COROLLA CROSS - #1 SUV C)
  {
    id: 'toyota-m20a-20-dynamic',
    name: 'Toyota 2.0L Dynamic Force (M20A-FKS)',
    brand: 'Toyota Argentina',
    years: '2019 - Presente',
    displacementCc: 1987,
    displacementL: '2.0L',
    powerHp: 170,
    torqueNm: 200,
    rpmMax: 6600,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Inyección mixta (D-4S directa e indirecta) con una eficiencia térmica récord del 40%. Equipa al Toyota Corolla sedán y a la Corolla Cross (la SUV mediana número 1 en ventas en Argentina).',
    notableCars: ['Toyota Corolla SEG / XEI', 'Toyota Corolla Cross XEI / SEG'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'fuel_injectors', 'spark_plugs', 'water_pump']
  },

  // 24. NISSAN / RENAULT 2.3L BI-TURBO DIESEL (NISSAN FRONTIER / ALASKAN)
  {
    id: 'nissan-23-biturbo-ys23',
    name: 'Nissan 2.3L Bi-Turbo Diesel (YS23DTR)',
    brand: 'Nissan Argentina',
    years: '2018 - Presente',
    displacementCc: 2298,
    displacementL: '2.3L',
    powerHp: 190,
    torqueNm: 450,
    rpmMax: 3750,
    config: 'Inline-4',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Diésel',
    country: 'Argentina',
    description: 'Motor diésel de doble turbocompresor (uno pequeño de alta presión para bajas rpm y uno grande para altas rpm) fabricado en la planta de Santa Isabel en Córdoba para las camionetas Nissan Frontier y Renault Alaskan.',
    notableCars: ['Nissan Frontier PRO-4X / LE', 'Renault Alaskan Iconic / Cargo'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'turbocharger', 'intercooler', 'fuel_injectors', 'oil_pump']
  },

  // 25. CHEVROLET / DURAMAX 2.8L CTDI TURBO DIESEL (CHEVROLET S10)
  {
    id: 'chevrolet-duramax-28-ctdi',
    name: 'Chevrolet / Duramax 2.8L CTDI Turbo Diesel',
    brand: 'Chevrolet Argentina',
    years: '2012 - Presente',
    displacementCc: 2776,
    displacementL: '2.8L',
    powerHp: 200,
    torqueNm: 500,
    rpmMax: 3600,
    config: 'Inline-4',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Diésel',
    country: 'Argentina',
    description: 'Famoso motor diésel de 200 HP con turbocompresor de geometría variable (VGT) que impulsa a la pick-up mediana Chevrolet S10 y a la SUV Trailblazer en el mercado argentino.',
    notableCars: ['Chevrolet S10 High Country / LTZ', 'Chevrolet Trailblazer LTZ'],
    partIds: ['block', 'crankshaft', 'pistons', 'cylinder_head', 'turbocharger', 'intercooler', 'fuel_injectors', 'oil_pan']
  },

  // 26. VOLKSWAGEN 1.4L 250 TSI TURBO EA211 (VW TAOS / GOLF / VENTO)
  {
    id: 'vw-ea211-14-tsi',
    name: 'Volkswagen 1.4L 250 TSI Turbo (EA211)',
    brand: 'Volkswagen Argentina',
    years: '2016 - Presente',
    displacementCc: 1395,
    displacementL: '1.4L',
    powerHp: 150,
    torqueNm: 250,
    rpmMax: 5000,
    config: 'Inline-4',
    aspiration: 'Turbo',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'El reconocido motor 250 TSI que impulsa a la SUV Volkswagen Taos fabricada en la planta de Pacheco, así como al Vento, Golf VII y Tiguan Allspace. Excelente equilibrio entre bajas emisiones y respuesta de torque inmediato.',
    notableCars: ['Volkswagen Taos Highline / Comfortline', 'VW Vento TSI', 'VW Polo GTS'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'turbocharger', 'intercooler', 'fuel_injectors', 'spark_plugs']
  },

  // 27. RENAULT 1.6L 16V K4M (RENAULT SANDERO / DUSTER / CLIO MÍO / KANGOO I)
  {
    id: 'renault-k4m-16-16v',
    name: 'Renault 1.6L 16V (K4M)',
    brand: 'Renault Argentina',
    years: '1999 - 2018',
    displacementCc: 1598,
    displacementL: '1.6L',
    powerHp: 105,
    torqueNm: 148,
    rpmMax: 5750,
    config: 'Inline-4',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Uno de los motores más vendidos y populares en la historia reciente de Argentina. Impulsó a varias generaciones de Renault Clio, Kangoo I, Megane, Symbol, Duster y Sandero durante 20 años continuos.',
    notableCars: ['Renault Clio Mío / II', 'Renault Sandero Stepway', 'Renault Duster 1.6 K4M', 'Renault Kangoo I'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'water_pump', 'spark_plugs']
  },

  // 28. FORD 1.5L DRAGON 3-CILINDROS Ti-VCT (FORD ECOSPORT / KA - HISTÓRICO TOP VENTA)
  {
    id: 'ford-dragon-15-tivct',
    name: 'Ford 1.5L Dragon 3-Cilindros Ti-VCT',
    brand: 'Ford Argentina',
    years: '2017 - 2022',
    displacementCc: 1497,
    displacementL: '1.5L',
    powerHp: 123,
    torqueNm: 151,
    rpmMax: 6500,
    config: 'Inline-3',
    aspiration: 'Atmosférico',
    valvetrain: 'DOHC',
    fuelType: 'Gasolina',
    country: 'Argentina',
    description: 'Motor tricilíndrico de aleación de aluminio y eje de equilibrado contrarrotante que equipó a los exitosos Ford EcoSport (la SUV chica más vendida de Argentina por más de una década) y Ford Ka.',
    notableCars: ['Ford EcoSport Freestyle / SE', 'Ford Ka SEL / Freestyle'],
    partIds: ['block', 'pistons', 'cylinder_head', 'camshaft', 'valves', 'timing_belt_chain', 'spark_plugs', 'alternator']
  }
];
