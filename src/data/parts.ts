import { EnginePart } from '../types/engine';

export const ENGINE_PARTS: EnginePart[] = [
  {
    id: 'block',
    name: 'Engine Block',
    spanishName: 'Bloque de Motor',
    category: 'bloque',
    description: 'La estructura principal rígida de hierro colado o aleación de aluminio que alberga los cilindros y galerías de refrigeración y aceite.',
    function: 'Soporta los pistones, el cigüeñal y soporta la inmensa presión y calor causados por la combustión interna.',
    locationInEngine: 'Centro inferior del motor, base estructural principal.',
    commonFailures: ['Fisuras por sobrecalentamiento', 'Desgaste en camisas de cilindros', 'Deformación del plano superior'],
    iconName: 'IconEngine'
  },
  {
    id: 'crankshaft',
    name: 'Crankshaft',
    spanishName: 'Cigüeñal',
    category: 'bloque',
    description: 'Eje giratorio forjado con muñequillas desplazadas que convierte el movimiento lineal alternativo de los pistones en rotación.',
    function: 'Transforma la fuerza de la combustión en movimiento giratorio entregado a la transmisión y volante de inercia.',
    locationInEngine: 'Parte inferior del bloque de motor (cárter superior).',
    commonFailures: ['Rayado de cojinetes/metales por falta de lubricación', 'Desbalanceo', 'Fisuras por fatiga de material'],
    iconName: 'IconRotate'
  },
  {
    id: 'pistons',
    name: 'Pistons & Rods',
    spanishName: 'Pistones y Bielas',
    category: 'bloque',
    description: 'Componentes móviles de aleación ligera encargados de recibir la expansión térmica del combustible y transmitir la fuerza a través de las bielas.',
    function: 'Sellado de la cámara de combustión (vía aros/anillos) y transferencia de energía mecánica al cigüeñal.',
    locationInEngine: 'Dentro de cada cilindro del bloque.',
    commonFailures: ['Detonación/Pistoneo que rompe las faldas', 'Aros pegados por carbón', 'Biela doblada por hidrolock'],
    iconName: 'IconPiston'
  },
  {
    id: 'cylinder_head',
    name: 'Cylinder Head',
    spanishName: 'Culata / Tapa de Cilindros',
    category: 'bloque',
    description: 'Elemento que cierra los cilindros por su parte superior formando la cámara de combustión y albergando el tren de válvulas.',
    function: 'Gestiona la entrada de mezcla/aire y salida de gases de escape, alojando las válvulas, bujías e inyectores.',
    locationInEngine: 'Parte superior del bloque de motor.',
    commonFailures: ['Empaque/Junta de culata soplada', 'Pandeo por sobrecalentamiento', 'Fisuras entre asientos de válvulas'],
    iconName: 'IconStack2'
  },
  {
    id: 'camshaft',
    name: 'Camshaft',
    spanishName: 'Árbol de Levas',
    category: 'distribucion',
    description: 'Eje con excéntricas (levas) diseñado para abrir y cerrar las válvulas sincronizadamente con la posición del cigüeñal.',
    function: 'Controla el tiempo exacto, elevación y duración de apertura de las válvulas de admisión y escape.',
    locationInEngine: 'En la culata (DOHC/SOHC) o en el bloque (OHV).',
    commonFailures: ['Desgaste de levas por aceite sucio', 'Juego en bujes/cojinetes', 'Falla de variadores de fase (VVT/VTEC/VANOS)'],
    iconName: 'IconAdjustmentsHorizontal'
  },
  {
    id: 'valves',
    name: 'Valves',
    spanishName: 'Válvulas de Admisión y Escape',
    category: 'distribucion',
    description: 'Válvulas de tipo hongo construidas en acero especial o titanio que abren y cierran los conductos de la culata.',
    function: 'Permiten la entrada de flujo de aire fresco/mezcla y la evacuación rápida de los gases quemados.',
    locationInEngine: 'Insertadas en los puertos de la culata sobre la cámara de combustión.',
    commonFailures: ['Válvulas dobladas por salto de correa de distribución', 'Acumulación de carbón en admisión', 'Fuga de compresión'],
    iconName: 'IconArrowsUpDown'
  },
  {
    id: 'timing_belt_chain',
    name: 'Timing Chain / Belt',
    spanishName: 'Correa / Cadena de Distribución',
    category: 'distribucion',
    description: 'Sistema mecánico (cadena metálica o correa dentada de caucho reforzado) que conecta el cigüeñal con los árboles de levas.',
    function: 'Mantiene la sincronización milimétrica exacta entre la rotación del cigüeñal y el movimiento de las válvulas.',
    locationInEngine: 'Frente o lateral del motor detrás de las cubiertas de distribución.',
    commonFailures: ['Corte de correa o estiramiento de cadena', 'Falla del tensor hidráulico o guías plásticas'],
    iconName: 'IconLink'
  },
  {
    id: 'turbocharger',
    name: 'Turbocharger',
    spanishName: 'Turbocompresor',
    category: 'sobrealimentacion',
    description: 'Compresor impulsado por la energía de los gases de escape que fuerza aire a alta presión dentro de los cilindros.',
    function: 'Incrementa la densidad de oxígeno en la admisión para quemar más combustible y elevar exponencialmente la potencia.',
    locationInEngine: 'Acoplado directamente al colector de escape.',
    commonFailures: ['Juego excesivo en el eje de la turbina', 'Fuga de aceite por retenes de turbina', 'Falla de la válvula wastegate'],
    iconName: 'IconWind'
  },
  {
    id: 'intercooler',
    name: 'Intercooler',
    spanishName: 'Intercooler (Enfriador de Aire)',
    category: 'sobrealimentacion',
    description: 'Radiador aire-aire o aire-agua destinado a reducir la temperatura del aire comprimido proveniente del turbo.',
    function: 'Aumenta la densidad del aire comprimido (el aire frío es más denso en oxígeno) previniendo el autoencendido/detonación.',
    locationInEngine: 'Frente del vehículo (FMIC) o sobre el motor (TMIC).',
    commonFailures: ['Fugas de presión por pinchaduras', 'Acumulación interna de vapores de aceite'],
    iconName: 'IconSnowflake'
  },
  {
    id: 'intake_manifold',
    name: 'Intake Manifold',
    spanishName: 'Colector de Admisión',
    category: 'admision_escape',
    description: 'Conjunto de tubos diseñados para distribuir aire de forma uniforme desde la mariposa hacia los puertos de admisión.',
    function: 'Optimiza la resonancia y la velocidad del aire antes de ingresar a los cilindros.',
    locationInEngine: 'Montado en el lateral de la culata.',
    commonFailures: ['Fugas de vacío en empaques', 'Obstrucción de mariposas de admisión variable (swirl flaps)'],
    iconName: 'IconRoute'
  },
  {
    id: 'exhaust_manifold',
    name: 'Exhaust Manifold / Headers',
    spanishName: 'Colector de Escape / Múltiple',
    category: 'admision_escape',
    description: 'Conductos metálicos (de hierro fundido o tubular de acero inoxidable) que recogen los gases quemados de los cilindros.',
    function: 'Canaliza los gases de combustión hacia el turbo o la línea de escape reduciendo contrapresiones.',
    locationInEngine: 'Fijado al lado de escape de la culata.',
    commonFailures: ['Fisuras por estrés térmico', 'Fuga en la junta con la culata'],
    iconName: 'IconFlame'
  },
  {
    id: 'fuel_injectors',
    name: 'Fuel Injectors',
    spanishName: 'Inyectores de Combustible',
    category: 'alimentacion',
    description: 'Válvulas electro-magnéticas o piezo-eléctricas de alta precisión que pulverizan el combustible a alta presión.',
    function: 'Atomizan el combustible en microgotas para una combustión eficiente y limpia.',
    locationInEngine: 'En el colector (inyección indirecta) o directo en la cámara de combustión (inyección directa).',
    commonFailures: ['Obstrucción por suciedad en combustible', 'Goteo por desgaste del sello', 'Falla de la bobina interna'],
    iconName: 'IconGasStation'
  },
  {
    id: 'spark_plugs',
    name: 'Spark Plugs',
    spanishName: 'Bujías de Encendido',
    category: 'electrica',
    description: 'Dispositivo eléctrico montado en la culata que genera un arco voltaico de alto voltaje.',
    function: 'Enciende la mezcla comprimida de aire y gasolina dentro del cilindro en motores Otto.',
    locationInEngine: 'Enroscadas en la parte superior de la culata entrando a la cámara.',
    commonFailures: ['Desgaste de electrodos por kilometraje', 'Ensuciamiento por aceite o carbón', 'Fisura en el aislante cerámico'],
    iconName: 'IconBolt'
  },
  {
    id: 'oil_pump',
    name: 'Oil Pump',
    spanishName: 'Bomba de Aceite',
    category: 'lubricacion',
    description: 'Bomba mecánica de engranajes o rotores impulsada por el cigüeñal.',
    function: 'Succiona aceite del cárter y lo envía a presión constante a través del filtro hacia cojinetes, levas y pistones.',
    locationInEngine: 'Parte inferior del bloque, dentro del cárter.',
    commonFailures: ['Pérdida de presión por desgaste de engranajes', 'Válvula de alivio trabada'],
    iconName: 'IconDroplet'
  },
  {
    id: 'oil_pan',
    name: 'Oil Pan / Sump',
    spanishName: 'Cárter de Aceite',
    category: 'lubricacion',
    description: 'Depósito metálico o de polímero ubicado en el fondo del motor que almacena el lubricante.',
    function: 'Recoge el aceite que retorna del motor y permite su enfriamiento antes de ser vuelto a bombear.',
    locationInEngine: 'Base inferior del bloque de motor.',
    commonFailures: ['Fugas en la junta de silicona', 'Golpes o abolladuras por impacto inferior'],
    iconName: 'IconContainer'
  },
  {
    id: 'flywheel',
    name: 'Flywheel / Flexplate',
    spanishName: 'Volante de Inercia',
    category: 'bloque',
    description: 'Disco pesado de acero fijado al extremo del cigüeñal.',
    function: 'Almacena energía cinética para suavizar los impulsos de combustión y provee la superficie de acople para el embrague.',
    locationInEngine: 'Parte trasera del cigüeñal, entre motor y caja de cambios.',
    commonFailures: ['Desgaste del diente de corona de arranque', 'Holgura interna en volantes de doble masa (bimasa)'],
    iconName: 'IconDisc'
  },
  {
    id: 'water_pump',
    name: 'Water Pump',
    spanishName: 'Bomba de Agua',
    category: 'refrigeracion',
    description: 'Bomba centrífuga acccionada por correa o cadena.',
    function: 'Hacer circular el líquido refrigerante entre el bloque, la culata y el radiador para disipar el exceso de calor.',
    locationInEngine: 'Frente del bloque de motor.',
    commonFailures: ['Fuga por el sello mecánico', 'Rotura de álabes del impulsor'],
    iconName: 'IconTemperature'
  },
  {
    id: 'throttle_body',
    name: 'Throttle Body',
    spanishName: 'Cuerpo de Mariposa',
    category: 'admision_escape',
    description: 'Válvula mariposa accionada por cable o motor paso a paso (Drive-by-wire).',
    function: 'Regula el caudal masivo de aire ingresante al motor cuando el conductor acciona el acelerador.',
    locationInEngine: 'Entre el filtro de aire / intercooler y el colector de admisión.',
    commonFailures: ['Acumulación de suciedad en la mariposa', 'Falla del sensor de posición TPS o actuador electrónico'],
    iconName: 'IconGauge'
  },
  {
    id: 'alternator',
    name: 'Alternator',
    spanishName: 'Alternador',
    category: 'electrica',
    description: 'Generador eléctrico trifásico accionado por la correa de accesorios.',
    function: 'Convierte la energía mecánica del motor en energía eléctrica para recargar la batería y alimentar los sistemas del auto.',
    locationInEngine: 'Fijado al bloque en el tren de accesorios.',
    commonFailures: ['Desgaste de escobillas/carbones', 'Falla del regulador de voltaje o puente rectificador'],
    iconName: 'IconCurrentRect'
  },
  {
    id: 'rotary_rotor',
    name: 'Wankel Rotor & Apex Seals',
    spanishName: 'Rotor Wankel y Sellos de Ápice',
    category: 'bloque',
    description: 'Componente triangular epitrocoidal usado exclusivamente en motores rotativos (como el Mazda 13B).',
    function: 'Gira dentro del estator realizando las 4 fases de combustión simultáneamente en 3 cámaras independientes.',
    locationInEngine: 'Dentro de los estatores del motor Wankel.',
    commonFailures: ['Desgaste/rotura de sellos de ápice (Apex Seals)', 'Rayado de las paredes del estator'],
    iconName: 'IconTriangle'
  }
];
