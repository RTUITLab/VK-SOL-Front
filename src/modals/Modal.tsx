import React, { useState } from 'react'
import { Banner, Button, FormItem, FormLayout, FormStatus, Group, Input, ModalCard, ModalCardProps, SplitCol, SplitLayout } from '@vkontakte/vkui'
import { Icon56GhostOutline } from '@vkontakte/icons'
import { back } from '@cteamdev/router'
import { useAtomValue } from '@mntm/precoil'
import { userAtom } from '../store'

export const Modal: React.FC<ModalCardProps> = ({ nav }: ModalCardProps) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(1)
  const [error, setError] = useState('')

  const user = useAtomValue(userAtom)

  // {
  //   "name": "Rammstein concert",
  //   "date": "22.02.2023",
  //   "place": "Spb",
  //   "description": "Rammstein concert in SPB",
  //   "amount": 3,
  //   "white_list": [],
  //   "user_id": "713LLqzmwciiemdCjtCtRXJzZEFb7y1hza9HdWGV8rxY"
  //   }

  function handleCreate() {


    const data = {
      name,
      description,
      place,
      amount,
      date: `${date}T${time}`,
      user_id: user.walletAddress
    }

    if (
      name === '' ||
      description === '' ||
      place === '' ||
      date === '' ||
      time === ''
    ) {
      setError('Некоторые поля пустые')
    }

    if (data.user_id) {
      console.log(data);
      setError('')
      back()
    } else {
      setError('ID кошелька пустое')
    }

  }

  return (
    <ModalCard
      nav={nav}
      onClose={back}
      header='Cоздание мероприятия'
    >
      <FormLayout>
        <FormItem top='Название мероприятия'>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type={'text'}
            placeholder='Введите название'
          />
        </FormItem>
        <FormItem top='Описание мероприятия'>
          <Input
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type={'text'}
            placeholder='Введите описание'
          />
        </FormItem>
        <FormItem top='Адрес мероприятия'>
          <Input
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            type={'text'}
            placeholder='Введите адрес'
          />
        </FormItem>
        <FormItem top='Количество билетов'>
          <Input
            required
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
            type={'number'}
            placeholder='Введите количество'
          />
        </FormItem>
        <SplitLayout>
          <SplitCol width={'50%'}>
            <FormItem top='Дата мероприятия'>
              <Input
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type={'date'}
                placeholder='Введите дату'
              />
            </FormItem>
          </SplitCol>
          <SplitCol width={'50%'}>
            <FormItem top='Время мероприятия'>
              <Input
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type={'time'}
                placeholder='Введите время'
              />
            </FormItem>
          </SplitCol>
        </SplitLayout>
        {error && <Banner
          header="Ошибка"
          subheader={error}
        />}

        <FormItem>
          <Button size='l' mode='primary' onClick={handleCreate}>
            Создать мероприятие
          </Button>
        </FormItem>
      </FormLayout>
    </ModalCard>
  )
}
