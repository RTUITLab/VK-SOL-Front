import React from 'react'
import { Panel, PanelHeader, PanelHeaderButton, PanelHeaderContent, PanelProps, View } from '@vkontakte/vkui'
import { Icon28AddSquareOutline } from '@vkontakte/icons'
function Events({ nav }: PanelProps) {
  return (
    <Panel nav={nav}>
      <PanelHeader before={
        <PanelHeaderButton>
          <Icon28AddSquareOutline />
        </PanelHeaderButton>
      }
      ><PanelHeaderContent>Мероприятия</PanelHeaderContent></PanelHeader>
      
    </Panel>
  )
}

export default Events