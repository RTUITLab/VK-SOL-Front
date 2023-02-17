import React from 'react';
import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';

function Events({ nav }: PanelProps) {
    return (
        <Panel nav={nav}>
            <PanelHeader>Мероприятия</PanelHeader>
        </Panel>
    );
}

export default Events;