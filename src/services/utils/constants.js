import { FormattedMessage } from "react-intl";

export const registerErrors = {
  email: {
    error: false,
    message: <FormattedMessage id="register.error.email" />,
  },
  firstName: {
    error: false,
    message: <FormattedMessage id="register.error.firstName" />,
  },
  phoneNumber: {
    error: false,
    message: <FormattedMessage id="register.error.phoneNumber" />,
  },
  password: {
    error: false,
    message: <FormattedMessage id="register.error.password" />,
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
  {
    value: 'Sedan',
    text: 'Sedan'
  },
  {
    value: 'SUV',
    text: 'SUV',
  },
  {
    value: 'Compact',
    text: 'Compact',
  },
  {
    value: 'Wagon',
    text: 'Wagon',
  },
  {
    value: 'Coupe',
    text: 'Coupe',
  },
  {
    value: 'Van',
    text: 'Van',
  },
  {
    value: 'Hatchback',
    text: 'Hatchback',
  },
  {
    value: 'Pickup',
    text: 'Pickup',
  },
  {
    value: 'Sport coupe',
    text: 'Sport coupe',
  },
];

export const carNumberSeries = [
  {
    text: 'АР Крим',
    value: 'АК',
    series: [
      {
        value: 'КР',
        text: 'КР',
      },
      {
        value: 'КO',
        text: 'КO',
      },
      {
        value: 'КR',
        text: 'КT',
      },
    ],
  },
  {
    text: 'Вінницька обл.',
    value: 'АВ',
    series: [
      {
        value: 'ВІ',
        text: 'ВІ',
      },
      {
        value: 'ВТ',
        text: 'ВТ',
      },
      {
        value: 'ВХ',
        text: 'ВХ',
      },
    ],
  },
  {
    text: 'Волинська обл.',
    value: 'АС',
    series: [
      {
        value: 'ВО',
        text: 'ВО',
      },
      {
        value: 'ВК',
        text: 'ВК',
      },
      {
        value: 'ВМ',
        text: 'ВМ',
      },
    ],
  },
  {
    text: 'Дніпропетровська обл.',
    value: 'АЕ',
    series: [
      {
        value: 'АА',
        text: 'АА',
      },
      {
        value: 'АВ',
        text: 'АВ',
      },
      {
        value: 'АЕ',
        text: 'АЕ',
      },
      {
        value: 'АК',
        text: 'АК',
      },
      {
        value: 'АН',
        text: 'АН',
      },
    ],
  },
  {
    text: 'Донецька обл.',
    value: 'АН',
    series: [
      {
        value: 'ЕА',
        text: 'ЕА',
      },
      {
        value: 'ЕВ',
        text: 'ЕВ',
      },
      {
        value: 'ЕК',
        text: 'ЕК',
      },
      {
        value: 'ЕО',
        text: 'ЕО',
      },
      {
        value: 'ЕС',
        text: 'ЕС',
      },
    ],
  },
  {
    text: 'Житомирська обл.',
    value: 'АМ',
    series: [
      {
        value: 'ВА',
        text: 'ВА',
      },
      {
        value: 'ВВ',
        text: 'ВВ',
      },
    ],
  },
  {
    text: 'Закарпатська обл.',
    value: 'АО',
    series: [
      {
        value: 'РЕ',
        text: 'РЕ',
      },
      {
        value: 'РТ',
        text: 'РТ',
      },
    ],
  },
  {
    text: 'Запорізька обл.',
    value: 'АР',
    series: [
      {
        value: 'НА',
        text: 'НА',
      },
      {
        value: 'НЕ',
        text: 'НЕ',
      },
      {
        value: 'НО',
        text: 'НО',
      },
      {
        value: 'НР',
        text: 'НР',
      },
      {
        value: 'НС',
        text: 'НС',
      },
    ],
  },
  {
    text: 'Івано-Франківська обл.',
    value: 'АТ',
    series: [
      {
        value: 'ІВ',
        text: 'ІВ',
      },
      {
        value: 'ІС',
        text: 'ІС',
      },
    ],
  },
  {
    text: 'м. Київ',
    value: 'АА',
    series: [
      {
        value: 'КА',
        text: 'КА',
      },
      {
        value: 'КІ',
        text: 'КІ',
      },
      {
        value: 'КВ',
        text: 'КВ',
      },
      {
        value: 'КН',
        text: 'КН',
      },
    ],
  },
  {
    text: 'Київська обл.',
    value: 'АІ',
    series: [
      {
        value: 'КК',
        text: 'КК',
      },
      {
        value: 'КХ',
        text: 'КХ',
      },
      {
        value: 'КМ',
        text: 'КМ',
      },
    ],
  },
  {
    text: 'Кропивницька обл.',
    value: 'ВА',
    series: [
      {
        value: 'ОМ',
        text: 'ОМ',
      },
      {
        value: 'ОН',
        text: 'ОН',
      },
      {
        value: 'ОС',
        text: 'ОС',
      },
    ],
  },
  {
    text: 'Луганська обл.',
    value: 'ВВ',
    series: [
      {
        value: 'АМ',
        text: 'АМ',
      },
      {
        value: 'АО',
        text: 'АО',
      },
      {
        value: 'АР',
        text: 'АР',
      },
      {
        value: 'АТ',
        text: 'АТ',
      },
      {
        value: 'АХ',
        text: 'АХ',
      },
    ],
  },
  {
    text: 'Львівська обл.',
    value: 'ВС',
    series: [
      {
        value: 'ТА',
        text: 'ТА',
      },
      {
        value: 'ТВ',
        text: 'ТВ',
      },
      {
        value: 'ТН',
        text: 'ТН',
      },
      {
        value: 'ТС',
        text: 'ТС',
      },
    ],
  },
  {
    text: 'Миколаївська обл.',
    value: 'ВЕ',
    series: [
      {
        value: 'НІ',
        text: 'НІ',
      },
      {
        value: 'НК',
        text: 'НК',
      },
      {
        value: 'НТ',
        text: 'НТ',
      },
    ],
  },
  {
    text: 'Одеська обл.',
    value: 'ВН',
    series: [
      {
        value: 'ОА',
        text: 'ОА',
      },
      {
        value: 'ОВ',
        text: 'ОВ',
      },
      {
        value: 'ОЕ',
        text: 'ОЕ',
      },
      {
        value: 'ОК',
        text: 'ОК',
      },
    ],
  },
  {
    text: 'Полтавська обл.',
    value: 'ВІ',
    series: [
      {
        value: 'СК',
        text: 'СК',
      },
      {
        value: 'СН',
        text: 'СН',
      },
      {
        value: 'СС',
        text: 'СС',
      },
    ],
  },
  {
    text: 'Рівненська обл.',
    value: 'ВК',
    series: [
      {
        value: 'РВ',
        text: 'РВ',
      },
      {
        value: 'РА',
        text: 'РА',
      },
      {
        value: 'РО',
        text: 'РО',
      },
    ],
  },
  {
    text: 'м. Севастополь',
    value: 'СН',
    series: [
      {
        value: 'КС',
        text: 'КС',
      },
    ],
  },
  {
    text: 'Сумська обл.',
    value: 'ВМ',
    series: [
      {
        value: 'СА',
        text: 'СА',
      },
      {
        value: 'СВ',
        text: 'СВ',
      },
      {
        value: 'СЕ',
        text: 'СЕ',
      },
    ],
  },
  {
    text: 'Тернопільска обл.',
    value: 'ВО',
    series: [
      {
        value: 'ТЕ',
        text: 'ТЕ',
      },
      {
        value: 'ТІ',
        text: 'ТІ',
      },
      {
        value: 'ТК',
        text: 'ТК',
      },
    ],
  },
  {
    text: 'Харківська обл.',
    value: 'АХ',
    series: [
      {
        value: 'ХА',
        text: 'ХА',
      },
      {
        value: 'ХЕ',
        text: 'ХЕ',
      },
      {
        value: 'ХІ',
        text: 'ХІ',
      },
      {
        value: 'ХК',
        text: 'ХК',
      },
    ],
  },
  {
    text: 'Херсонська обл.',
    value: 'ВТ',
    series: [
      {
        value: 'ХО',
        text: 'ХО',
      },
      {
        value: 'ХН',
        text: 'ХН',
      },
    ],
  },
  {
    text: 'Хмельницька обл.',
    value: 'ВХ',
    series: [
      {
        value: 'ХМ',
        text: 'ХМ',
      },
      {
        value: 'ХТ',
        text: 'ХТ',
      },
    ],
  },
  {
    text: 'Черкаська обл.',
    value: 'СА',
    series: [
      {
        value: 'МА',
        text: 'МА',
      },
      {
        value: 'МВ',
        text: 'МВ',
      },
      {
        value: 'МЕ',
        text: 'МЕ',
      },
    ],
  },
  {
    text: 'Чернігівська обл.',
    value: 'СВ',
    series: [
      {
        value: 'МК',
        text: 'МК',
      },
      {
        value: 'ММ',
        text: 'ММ',
      },
      {
        value: 'МН',
        text: 'МН',
      },
    ],
  },
  {
    text: 'Чернівецька обл.',
    value: 'СЕ',
    series: [
      {
        value: 'МО',
        text: 'МО',
      },
      {
        value: 'МР',
        text: 'МР',
      },
      {
        value: 'МС',
        text: 'МС',
      },
    ],
  },
];

export const carTransmissions = [
  {
    value: 'Механічна',
    text: 'Механічна',
  },
  {
    value: 'Автоматична',
    text: 'Автоматична',
  },
  {
    value: 'Роботизована',
    text: 'Роботизована',
  },
  {
    value: 'Варіативна',
    text: 'Варіативна',
  },
];

export const carEngineTypes = [
  {
    value: 'ДВЗ',
    text: 'ДВЗ',
  },
  {
    value: 'Електродвигун',
    text: 'Електродвигун',
  },
  {
    value: 'Гібрид',
    text: 'Гібрид',
  },
];

export const visitStatuses = [
  {
    value: 'Planned',
    text: 'Planned',
  },
  {
    value: 'In Progress',
    text: 'In Progress',
  },
  {
    value: 'Closed',
    text: 'Closed',
  },
];

export const newIssueShape = {
  description: '',
  startTime: '',
  endTime: '',
  experience: '',
  fatherName: '',
  firstName: '',
  lastName: '',
  price: '',
  specialistId: '',
  specialityId: '',
  phoneNumber: '',
  speciality: '',
  workerId: '',
  duration: null,
  closed: 'No',
};

export const newCarShape = {
  name: null,
  model: null,
  year: null,
  color: null,
  carcas: null,
  carCode: null,
  carNumber: null,
  carSeries: null,
  transmission: null,
  engine: null,
  engineNumber: null,
};
