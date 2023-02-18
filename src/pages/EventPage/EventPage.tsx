import { back, push, replace, useCurrentState } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import { useQuery } from '@tanstack/react-query';
import { Icon16ClockOutline, Icon16DonateOultine, Icon16Location, Icon28AddOutline, Icon28CopyOutline, Icon28LikeOutline, Icon28UserOutline } from '@vkontakte/icons';
import { Button, Cell, CellButton, Counter, Div, Group, Header, Headline, IconButton, MiniInfoCell, Panel, PanelHeader, PanelHeaderBack, SimpleCell, Spinner, SplitCol, SplitLayout, TabsItem, Title } from '@vkontakte/vkui';
import { func } from 'prop-types';
import React, { useRef } from 'react';
import { api, APIEventType } from '../../api';
import { eventIdAtom } from '../../store';
import './eventpage.css'

type EventPagetypes = {
    nav: string
}

function EventPage(props: EventPagetypes) {

    const eventId = useAtomValue(eventIdAtom)
    const ref = useRef('')

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
                                    href={`https://yandex.ru/maps/213/moscow/search/${data.place}`} rel='noreferrer'
                                >
                                    <Headline style={{ color: '#2688EB', maxWidth: '100px' }} weight='semibold'>
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

            <Group>
                <Div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title>Вайтлист</Title>
                    <CellButton
                        onClick={() => push('/events/?modal=wallet')}
                        before={<Icon28AddOutline />}>Добавить</CellButton>
                </Div>
                {
                    data && data.white_list.map((item, index) => <SimpleCell key={index} after={<Icon28CopyOutline />}>
                        {item}
                    </SimpleCell>)
                }
                {
                    data && data.white_list.length === 0 && <SimpleCell>Вайтлист пока пуст</SimpleCell>
                }


            </Group>




        </Panel >
    );
}

export default EventPage;