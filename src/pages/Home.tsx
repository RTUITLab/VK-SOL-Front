import React, { useEffect } from 'react'
import { Avatar, CardGrid, Group, Panel, PanelHeader, PanelProps, Search, SimpleCell, Spacing } from '@vkontakte/vkui'
import {
  Icon28BillheadOutline,
  Icon28ChevronRightOutline,
  Icon28CheckCircleOutline,
  Icon28CancelCircleOutline,
  Icon28PawOutline,
  Icon28WarningTriangleOutline,
  Icon28ArticleOutline,
  Icon20TicketOutline
} from '@vkontakte/icons'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { userAtom, vkUserAtom } from '../store'
import { setDoneSnackbar, setErrorSnackbar } from '../hooks'
import { push } from '@cteamdev/router'
import EventCard from '../components/eventCard/EventCard'
import Ticket from '../components/Ticket/Ticket'


export const Home: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const vkUser: UserInfo = useAtomValue(vkUserAtom)
  const user = useAtomValue(userAtom)
  const setUser = useSetAtomState(userAtom)


  return (
    <Panel nav={nav}>
      <PanelHeader>Главная</PanelHeader>
      <Search />
      <Spacing />
      <Group mode='plain'>
        <CardGrid size='l'>
          <EventCard
            image='https://levandrovskiy.ru/img/foo.png'
            eventName='Баста в Ледовом'
            description='Какое то описание'
            date='17 февраля 2023'
            time='17:00'
            address='Москва, пр. Вернадского, 78'
          // owner={true}
          />
          <EventCard
            image='https://levandrovskiy.ru/img/foo.png'
            eventName='Баста в Ледовом'
            description='Какое то описание'
            date='17 февраля 2023'
            time='17:00'
            address='Москва, пр. Вернадского, 78'
          />
          <EventCard
            image='https://levandrovskiy.ru/img/foo.png'
            eventName='Баста в Ледовом'
            description='Какое то описание'
            date='17 февраля 2023'
            time='17:00'
            address='Москва, пр. Вернадского, 78'
          />
        </CardGrid>
      </Group>
      {/* <Group>
        <SimpleCell
          before={
            <Avatar size={72} src={vkUser.photo_200} />
          }
          description='Это же ты!'
        >
          {vkUser.first_name} {vkUser.last_name}
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell
          before={<Icon28PawOutline />}
          after={<Icon28ChevronRightOutline />}
          onClick={() => push('/persik')}
        >
          Покажи Персика!
        </SimpleCell>
      </Group>

      <Group>
        <SimpleCell
          before={<Icon20TicketOutline />}
          after={<Icon28ChevronRightOutline />}
          onClick={() => push('/tickets')}
        >
          Билеты
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell
          before={<Icon28BillheadOutline />}
          onClick={() => push('/?modal=modal')}
        >
          Покажи модальную карточку
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell
          before={<Icon28WarningTriangleOutline />}
          onClick={() => push('/?popout=alert')}
        >
          Покажи алерт
        </SimpleCell>
        <SimpleCell
          id='ShowAlert'
          before={<Icon28ArticleOutline />}
          onClick={() => push('/?popout=action-sheet')}
        >
          Покажи список опций
        </SimpleCell>
      </Group>
      <Group>
        <SimpleCell
          before={<Icon28CheckCircleOutline />}
          onClick={() => setDoneSnackbar('Это добрый снекбар')}
        >
          Покажи добрый снекбар
        </SimpleCell>
        <SimpleCell
          before={<Icon28CancelCircleOutline />}
          onClick={() => setErrorSnackbar('Это злой снекбар')}
        >
          Покажи злой снекбар
        </SimpleCell>
      </Group> */}
    </Panel>
  )
}
