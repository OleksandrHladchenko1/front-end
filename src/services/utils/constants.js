export const registerErrors = {
  email: {
    error: false,
    message: 'Wrong email!',
  },
  firstName: {
    error: false,
    message: 'Wrong firstname!',
  },
  phoneNumber: {
    error: false,
    message: 'Wrong phone number!',
  },
  password: {
    error: false,
    message: 'Wrong password!'
  },
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const carcasTypes = [
  'Sedan',
  'SUV',
  'Compact',
  'Wagon',
  'Coupe',
  'Van',
  'Hatchback',
  'Pickup',
  'Sport coupe',
];

export const carNumberSeries = [
  {
    region: 'АР Крим',
    code: 'АК',
    series: ['КР', 'КО', 'KT'],
  },
  {
    region: 'Вінницька обл.',
    code: 'АВ',
    series: ['ВІ', 'ВТ', 'ВХ'],
  },
  {
    region: 'Волинська обл.',
    code: 'АС',
    series: ['ВО', 'ВК', 'ВМ'],
  },
  {
    region: 'Дніпропетровська обл.',
    code: 'АЕ',
    series: ['АА', 'АВ', 'АЕ', 'АК', 'АН'],
  },
  {
    region: 'Донецька обл.',
    code: 'АН',
    series: ['ЕА', 'ЕВ', 'ЕК', 'ЕО', 'ЕС'],
  },
  {
    region: 'Житомирська обл.',
    code: 'АМ',
    series: ['ВА', 'ВВ'],
  },
  {
    region: 'Закарпатська обл.',
    code: 'АО',
    series: ['РЕ', 'РТ'],
  },
  {
    region: 'Запорізька обл.',
    code: 'АР',
    series: ['НА', 'НЕ', 'НО', 'НР', 'НС'],
  },
  {
    region: 'Івано-Франківська обл.',
    code: 'АТ',
    series: ['ІВ', 'ІС'],
  },
  {
    region: 'м. Київ',
    code: 'АА',
    series: ['КА', 'КІ', 'КВ', 'КВ', 'КН'],
  },
  {
    region: 'Київська обл.',
    code: 'АІ',
    series: ['КК', 'КХ', 'КМ'],
  },
  {
    region: 'Кропивницька обл.',
    code: 'ВА',
    series: ['ОМ', 'ОН', 'ОС'],
  },
  {
    region: 'Луганська обл.',
    code: 'ВВ',
    series: ['АМ', 'АО', 'АР', 'АТ', 'АХ'],
  },
  {
    region: 'Львівська обл.',
    code: 'ВС',
    series: ['ТА', 'ТВ', 'ТН', 'ТС'],
  },
  {
    region: 'Миколаївська обл.',
    code: 'ВЕ',
    series: ['НІ', 'НК', 'НТ'],
  },
  {
    region: 'Одеська обл.',
    code: 'ВН',
    series: ['ОА', 'ОВ', 'ОЕ', 'ОК'],
  },
  {
    region: 'Полтавська обл.',
    code: 'ВІ',
    series: ['СК', 'СН', 'СС'],
  },
  {
    region: 'Рівненська обл.',
    code: 'ВК',
    series: ['РВ', 'РА', 'РО'],
  },
  {
    region: 'м. Севастополь',
    code: 'СН',
    series: ['КС'],
  },
  {
    region: 'Сумська обл.',
    code: 'ВМ',
    series: ['СА', 'СВ', 'СЕ'],
  },
  {
    region: 'Тернопільска обл.',
    code: 'ВО',
    series: ['ТЕ', 'ТІ', 'ТК'],
  },
  {
    region: 'Харківська обл.',
    code: 'АХ',
    series: ['ХА', 'ХЕ', 'ХІ', 'ХК'],
  },
  {
    region: 'Херсонська обл.',
    code: 'ВТ',
    series: ['ХО', 'ХН'],
  },
  {
    region: 'Хмельницька обл.',
    code: 'ВХ',
    series: ['ХМ', 'ХТ'],
  },
  {
    region: 'Черкаська обл.',
    code: 'СА',
    series: ['МА', 'МВ', 'МЕ'],
  },
  {
    region: 'Чернігівська обл.',
    code: 'СВ',
    series: ['МК', 'ММ', 'МН'],
  },
  {
    region: 'Чернівецька обл.',
    code: 'СЕ',
    series: ['МО', 'МР', 'МС'],
  },
];

export const carTransmissions = [
  'Механічна',
  'Автоматична',
  'Роботизована',
  'Варіативна',
];

export const carEngineTypes = [
  'ДВЗ',
  'Електродвигун',
  'Гібрид',
];

export const visitStatuses = [
  'Planned',
  'In Progress',
  'Closed',
];
