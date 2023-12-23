export type WorksDataProps = {
  id: number
  title: string
  subtitle: string
  image: string
}

export const WorksData: WorksDataProps[] = [
  {
    id: 634,
    title: 'Выбор авто',
    subtitle:
      'мы подберем несколько автомобилей, на Ваш вкус, личные требования и бюджет. Проверим историю автомобиля.',
    image: 'car',
  },

  {
    id: 856,
    title: 'Расчёт всех затрат',
    subtitle: 'после выбора конкретного авто мы предоставим Вам просчет на все затраты.',
    image: 'money',
  },

  {
    id: 978,
    title: 'Покупка авто',
    subtitle: 'участие в онлайн-аукционе, покупка авто.',
    image: 'auction',
  },

  {
    id: 666,
    title: 'Оплата авто и услуг',
    subtitle:
      'Платежи осуществляются SWIFT переводом через банк, от Вашего имени, что гарантирует прозрачность сделки. Оплата доставки.',
    image: 'bank',
  },

  {
    id: 444,
    title: 'Доставка авто',
    subtitle:
      'Доставка авто в порт с места покупки, погрузка в контейнер, путешествие морем примерно 6-8 недель, выгрузка в порту Украины (обычно Одесса)',
    image: 'ship-wheel',
  },

  {
    id: 333,
    title: 'Растаможка и передача авто',
    subtitle:
      'Оплата таможенных платежей и услуг брокера. Передача авто и пакета всех документов, для постановки на учет новому владельцу.',
    image: 'like',
  },
]