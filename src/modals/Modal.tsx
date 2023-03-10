import React, { useState } from 'react'
import { Banner, Button, FormItem, FormLayout, Input, ModalCard, ModalCardProps, Spinner, SplitCol, SplitLayout } from '@vkontakte/vkui'
import { back } from '@cteamdev/router'
import { useAtomValue } from '@mntm/precoil'
import { userAtom } from '../store'
import { EventType } from '../types/event'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { Icon16InfoCircle, Icon28InfoCircle } from '@vkontakte/icons'

export const Modal: React.FC<ModalCardProps> = ({ nav }: ModalCardProps) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(1)
  const [error, setError] = useState('')

  const user = useAtomValue(userAtom)

  function handlaSuccess() {

    console.log('yes')
  }
  function handlaError() {
    console.log('no')
  }

  const { mutate, isLoading } = useMutation({ mutationFn: api.createEvent, mutationKey: ['AllEvents'], onSuccess: handlaSuccess, onError: handlaError })


  function handleCreate() {
    const data: EventType = {
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
      mutate(data)
      setError('')
      back()
    } else {
      setError('Привяжите кошелёк на вкладке Профиль')
    }
  }

  return (
    <ModalCard
      nav={nav}
      onClose={back}
      header='Cоздание мероприятия'
    >
      {
        isLoading ? <Spinner size={'large'} style={{ margin: '20px 0' }} /> :

        <FormLayout onSubmit={handleCreate}>
            <Banner before={<Icon28InfoCircle />} header='Создание мероприятия может занять некоторое время'></Banner>
            <FormItem top='Название мероприятия'>
            <Input
                required
                maxLength={180}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type={'text'}
                placeholder='Введите название'
              />
          </FormItem>
            <FormItem top='Описание мероприятия'>
            <Input
                required
                maxLength={250}
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
                max={10}
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
                    min={`${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate()}`}
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
            header='Ошибка'
            subheader={error}
                    />}

            <FormItem>
            <Button size='l' mode='primary' type='submit'>
                Создать мероприятие
              </Button>
          </FormItem>
          </FormLayout>
      }
    </ModalCard>
  )
}
