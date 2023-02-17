import { Avatar, Group, Header, Panel, PanelHeader, PanelProps, SimpleCell, Switch } from '@vkontakte/vkui';
import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge'
import { useAtomValue } from '@mntm/precoil'
import { vkUserAtom } from '../store'
import { Icon28AddOutline, Icon28AddSquareOutline } from '@vkontakte/icons';

type ProfileProps = {
    isAdmin: boolean
    nav: string | undefined
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

function Profile({ nav, isAdmin, setIsAdmin }: ProfileProps) {
    const vkUser: UserInfo = useAtomValue(vkUserAtom)

    function handleChange() {
        setIsAdmin(prev => !prev)
    }

    function handleAddWallet() {
        console.log('add wallet');
    }

    return (
        <Panel nav={nav}>
            <PanelHeader>Профиль</PanelHeader>
            <Group>
                <SimpleCell
                    before={
                        <Avatar size={72} src={vkUser.photo_200} />
                    }
                >
                    {vkUser.first_name} {vkUser.last_name}
                </SimpleCell>

                <SimpleCell
                    before={<Switch onChange={handleChange} checked={isAdmin} />}
                >
                    Я администратор
                </SimpleCell>
            </Group>

            <Group>
                <Header>
                    Крипокошельки
                </Header>

                <SimpleCell
                    onClick={handleAddWallet}
                    before={<Icon28AddSquareOutline />}
                >
                    Добавить кошелёк
                </SimpleCell>
            </Group>
        </Panel>
    );
}

export default Profile;