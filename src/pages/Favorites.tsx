import { Panel, PanelHeader, PanelHeaderContent, PanelProps } from '@vkontakte/vkui'
import React from 'react'

function Favorites({ nav }: PanelProps) {
  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Избранное</PanelHeaderContent></PanelHeader>
    </Panel>
  )
}

export default Favorites