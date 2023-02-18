import React from 'react'
import { Cell, Group, List, Panel, PanelHeader, PanelHeaderBack, PanelProps, Spacing } from '@vkontakte/vkui'
import { back } from '@cteamdev/router'
import Ticket from '../components/Ticket/Ticket'

function Tickets({ nav }: PanelProps) {
  return (
    <Panel nav={nav}>
      <PanelHeader >
        Мои Билеты
      </PanelHeader>
      <Group>
        <List>
          <Cell>
            <Ticket
              image='https://levandrovskiy.ru/img/foo.png'
              eventName='Баста в Ледовом'
              date='17 февраля 2023'
              time='17:00'
              address='Москва, пр. Вернадского, 78'
            />
          </Cell>
          <Spacing size={16} /> 
          <Cell>
            <Ticket
              image='https://levandrovskiy.ru/img/foo.png'
              eventName='Баста не в Ледовом'
              date='22 февраля 2023'
              time='22:00'
              address='Москва, пр. Вернадского, 78'
            />
          </Cell>
          <Spacing size={16} /> 
        </List>
      </Group>
    </Panel>
  )
}

export default Tickets