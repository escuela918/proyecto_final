export type Libro = {
  id: string
  titulo: string
  corto: string
  anio: string
  libro: string
  genero: string
  postal: string
  pregunta: string
  lomo: string
  alto: string
  pdf: string
}

export const libros: Libro[] = [
  {
    id: 'babel',
    postal: '#8b3a2e',
    titulo: 'La Biblioteca de Babel',
    corto: 'Biblioteca de Babel',
    anio: '1941',
    libro: 'Ficciones',
    genero: 'Cuento',
    pregunta: '¿Qué vale la información si no sabemos encontrar en ella la verdad?',
    lomo: '#2a1f17',
    alto: 'h-60 sm:h-80',
    pdf: '/pdf/ficciones.pdf',
  },
  {
    id: 'wilkins',
    postal: '#3f6b6a',
    titulo: 'El idioma analítico de John Wilkins',
    corto: 'John Wilkins',
    anio: '1942',
    libro: 'Otras inquisiciones',
    genero: 'Ensayo',
    pregunta: '¿Podemos ordenar el mundo sin traicionarlo?',
    lomo: '#3b2e22',
    alto: 'h-56 sm:h-72',
    pdf: '/pdf/otras-inquisiciones.pdf',
  },
  {
    id: 'inmortal',
    postal: '#b08a3e',
    titulo: 'El inmortal',
    corto: 'El inmortal',
    anio: '1947',
    libro: 'El Aleph',
    genero: 'Cuento',
    pregunta: '¿Es la muerte lo que le da sentido a la vida?',
    lomo: '#1c1813',
    alto: 'h-64 sm:h-[22rem]',
    pdf: '/pdf/el-inmortal.pdf',
  },
  {
    id: 'aleph',
    postal: '#4a5d8a',
    titulo: 'El Aleph',
    corto: 'El Aleph',
    anio: '1945',
    libro: 'El Aleph',
    genero: 'Cuento',
    pregunta: '¿Ver todo es lo mismo que comprender algo?',
    lomo: '#4a3a29',
    alto: 'h-52 sm:h-[19rem]',
    pdf: '/pdf/el-aleph.pdf',
  },
  {
    id: 'arena',
    postal: '#6e7a45',
    titulo: 'El libro de arena',
    corto: 'El libro de arena',
    anio: '1975',
    libro: 'El libro de arena',
    genero: 'Cuento',
    pregunta: '¿Qué nos pasa cuando lo infinito cabe en nuestras manos?',
    lomo: '#2f251c',
    alto: 'h-48 sm:h-[17rem]',
    pdf: '/pdf/el-libro-de-arena.pdf',
  },
]

export type Pensamiento = {
  texto: string
  obra: string
  libro: string
}

export const pensamientos: Pensamiento[] = [
  {
    texto:
      'Que otros se jacten de las páginas que han escrito; a mí me enorgullecen las que he leído.',
    obra: 'Un lector',
    libro: 'Elogio de la sombra, 1969',
  },
  {
    texto:
      'El tiempo es la sustancia de que estoy hecho. El tiempo es un río que me arrebata, pero yo soy el río; es un tigre que me destroza, pero yo soy el tigre; es un fuego que me consume, pero yo soy el fuego.',
    obra: 'Nueva refutación del tiempo',
    libro: 'Otras inquisiciones, 1952',
  },
  {
    texto:
      'He cometido el peor de los pecados que un hombre puede cometer. No he sido feliz.',
    obra: 'El remordimiento',
    libro: 'La moneda de hierro, 1976',
  },
  {
    texto:
      'Yo, que me figuraba el Paraíso bajo la especie de una biblioteca.',
    obra: 'Poema de los dones',
    libro: 'El hacedor, 1960',
  },
  {
    texto:
      'Los espejos y la cópula son abominables, porque multiplican el número de los hombres.',
    obra: 'Tlön, Uqbar, Orbis Tertius',
    libro: 'Ficciones, 1944',
  },
]

export const frasesBreves: Pensamiento[] = [
  {
    texto: 'Somos nuestra memoria, somos ese quimérico museo de formas inconstantes, ese montón de espejos rotos.',
    obra: 'Cambridge',
    libro: 'Elogio de la sombra',
  },
  {
    texto: 'El olvido es la única venganza y el único perdón.',
    obra: 'Fragmentos de un evangelio apócrifo',
    libro: 'Elogio de la sombra',
  },
  {
    texto: 'Nadie es la patria, pero todos lo somos.',
    obra: 'Oda escrita en 1966',
    libro: 'El otro, el mismo',
  },
]

export type Hito = {
  anio: string
  lugar: string
  titulo: string
  texto: string
}

export const hitos: Hito[] = [
  {
    anio: '1899',
    lugar: 'Buenos Aires',
    titulo: 'Nace entre libros',
    texto:
      'Crece en Palermo. La biblioteca de su padre será, según él, el hecho capital de su vida.',
  },
  {
    anio: '1914',
    lugar: 'Ginebra',
    titulo: 'Europa en guerra',
    texto:
      'La guerra atrapa a la familia en Ginebra. Aprende idiomas y descubre a Schopenhauer y Whitman.',
  },
  {
    anio: '1921',
    lugar: 'Buenos Aires',
    titulo: 'El regreso y la ciudad',
    texto:
      'Redescubre su ciudad y en 1923 publica su primer libro: Fervor de Buenos Aires.',
  },
  {
    anio: '1938',
    lugar: 'Buenos Aires',
    titulo: 'La herida y el renacer',
    texto:
      'Un accidente casi le cuesta la vida. Al recuperarse, se atreve con el cuento fantástico.',
  },
  {
    anio: '1944',
    lugar: 'Buenos Aires',
    titulo: 'Ficciones y El Aleph',
    texto:
      'Laberintos, espejos y bibliotecas infinitas cambian para siempre la literatura.',
  },
  {
    anio: '1955',
    lugar: 'Biblioteca Nacional',
    titulo: 'Los libros y la noche',
    texto:
      'Dirige la Biblioteca Nacional cuando pierde la vista: «a la vez los libros y la noche».',
  },
  {
    anio: '1961',
    lugar: 'El mundo',
    titulo: 'La fama universal',
    texto:
      'Gana el Premio Formentor con Beckett y su obra se traduce en todo el mundo.',
  },
  {
    anio: '1986',
    lugar: 'Ginebra',
    titulo: 'El regreso final',
    texto:
      'Muere en Ginebra, la ciudad de su juventud. Nunca recibió el Nobel; no le hizo falta.',
  },
]

export type Simbolo = {
  nombre: string
  texto: string
}

export const simbolos: Simbolo[] = [
  {
    nombre: 'El laberinto',
    texto: 'La forma del universo y de la mente: un lugar hecho para perderse, donde cada camino es también una decisión.',
  },
  {
    nombre: 'El espejo',
    texto: 'Lo que duplica y engaña. Borges les temía desde niño: un espejo prueba que puede haber otro igual a nosotros.',
  },
  {
    nombre: 'La biblioteca',
    texto: 'El paraíso, el universo, la memoria de la humanidad. Todo lo que fue pensado espera en algún estante.',
  },
  {
    nombre: 'El tiempo',
    texto: 'Un río que nos arrebata. Circular, bifurcado o refutado, es la gran obsesión de su obra.',
  },
]
