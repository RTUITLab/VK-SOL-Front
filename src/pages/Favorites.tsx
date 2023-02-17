import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';
import React from 'react';

function Favorites({ nav }: PanelProps) {
    return (
        <Panel nav={nav}>
            <PanelHeader>Избранное</PanelHeader>
        </Panel>
    );
}

export default Favorites;