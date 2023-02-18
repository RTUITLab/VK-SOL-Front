import { Avatar, Group, Header, Panel, PanelHeader, PanelProps, SimpleCell, Switch } from '@vkontakte/vkui';
import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { userAtom, vkUserAtom } from '../store'
import { Icon28AddOutline, Icon28AddSquareOutline } from '@vkontakte/icons';

type ProfileProps = {
    nav: string | undefined
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

function Profile({ nav }: ProfileProps) {
    const vkUser: UserInfo = useAtomValue(vkUserAtom)
    const user = useAtomValue(userAtom)
    const setUser = useSetAtomState(userAtom)

    function handleChange() {
        // setIsAdmin(prev => !prev)
        setUser({
            ...user,
            isAdmin: !user.isAdmin
        })

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
                    before={<Switch onChange={handleChange} checked={user.isAdmin} />}
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