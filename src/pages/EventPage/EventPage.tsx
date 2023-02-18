import { back, replace, useCurrentState } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import { useQuery } from '@tanstack/react-query';
import { Icon16ClockOutline, Icon16DonateOultine, Icon16Location, Icon28LikeOutline, Icon28UserOutline } from '@vkontakte/icons';
import { Button, Cell, Counter, Group, Headline, IconButton, MiniInfoCell, Panel, PanelHeader, PanelHeaderBack, Spinner, TabsItem, Title } from '@vkontakte/vkui';
import React from 'react';
import { api, APIEventType } from '../../api';
import { eventIdAtom } from '../../store';
import './eventpage.css'

type EventPagetypes = {
    name: string,
    nav: string
}

function EventPage(props: EventPagetypes) {

    const eventId = useAtomValue(eventIdAtom)

    const { data, isLoading } = useQuery<APIEventType>({ queryKey: ['current_event'], queryFn: () => api.getEventById(eventId) })

    function handlechangeFavorite() {

    }

    return (
        <Panel nav={props.nav}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => replace('/')} />}
            >
                {data && data.name}
                {isLoading && ' Загрузка'}
            </PanelHeader>
            {data &&
                <Group>
                    <div className='event-page'>
                        <img className='event-page__image' src={`https://levandrovskiy.ru${data.cover}`} />
                        <div className='event-page__info'>
                            <Headline size={3} >
                                {data.description}
                            </Headline>
                            <div className='event-card__date'>
                                <MiniInfoCell
                                    before={<Icon16DonateOultine />}
                                    style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                                >
                                    {data.date.split('T')[0]}
                                </MiniInfoCell>
                                <MiniInfoCell
                                    before={<Icon16ClockOutline />}
                                    style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                                >
                                    {data.date.split('T')[1]}
                                </MiniInfoCell>


                            </div>
                            <MiniInfoCell
                                before={<Icon16Location fill='#2688EB' />}
                                style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                            >
                                <a
                                    className='event-card__location'
                                    target={'_blank'}
                                    href={`https://yandex.ru/maps/213/moscow/search/${props.address}`} rel='noreferrer'
                                >
                                    <Headline style={{ color: '#2688EB' }} weight='semibold'>
                                        {data.place}
                                    </Headline>

                                </a>

                            </MiniInfoCell>
                            <Button
                                size='l'
                                appearance='positive'
                                mode='outline'

                            >
                                Купить билет
                            </Button>
                        </div>
                        <div className='event-card__secondary'>
                            <IconButton onClick={handlechangeFavorite}>
                                <Icon28LikeOutline />
                            </IconButton>
                            <Cell indicator={<Counter>{data.amount}</Counter>}>
                                Всего билеты
                            </Cell>
                        </div>
                    </div>
                </Group>
            }




        </Panel >
    );
}

export default EventPage;