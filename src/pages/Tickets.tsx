import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack, PanelProps } from '@vkontakte/vkui';
import { back } from '@cteamdev/router';

function Tickets({ nav }: PanelProps) {
    return (
        <Panel nav={nav}>
            <PanelHeader
            >
                Мои Билеты
            </PanelHeader>

        </Panel>
    );
}

export default Tickets;