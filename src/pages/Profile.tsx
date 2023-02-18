import {
  Avatar,
  Card,
  Div,
  Group,
  Header,
  Headline,
  Panel,
  PanelHeader,
  SimpleCell,
  Subhead,
  Switch,
  Title
} from '@vkontakte/vkui'
import React from 'react'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { userAtom, vkUserAtom } from '../store'
import { Icon28AddOutline, Icon28AddSquareOutline } from '@vkontakte/icons'
import { UserInfo } from '@vkontakte/vk-bridge'

type ProfileProps = {
	nav: string | undefined
}

function Profile({ nav }: ProfileProps) {
  const vkUser: UserInfo = useAtomValue(vkUserAtom)
  const user = useAtomValue(userAtom)
  const setUser = useSetAtomState(userAtom)

  function handleChange() {
    setUser({
      ...user,
      isAdmin: !user.isAdmin
    })
  }

  async function handleAddWallet() {
    const provider = await window.parent?.phantom?.solana.connect()
    const address = await provider.publicKey.toString()
    setUser({ ...user, walletAddress:address })
  }

  return (
    <Panel nav={nav}>
      <PanelHeader>Профиль</PanelHeader>
      <Group>
        <SimpleCell before={<Avatar size={72} src={vkUser.photo_200} />}>
          {vkUser.first_name} {vkUser.last_name}
        </SimpleCell>

        <SimpleCell before={<Switch onChange={handleChange} checked={user.isAdmin} />}>
          Я администратор
        </SimpleCell>
      </Group>

      <Group>
        <Header>Криптокошелёк</Header>
        {user.walletAddress !=='' &&
        <Group>
          <SimpleCell style={{ display:'flex',flexDirection:'row',justifyContent:'space-around', flexWrap:'no-wrap' }}>
            <Div>
              <img width={50} src='https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' />
              <Headline level='2'>Phantom</Headline >
            </Div>
            <Div><Headline level='1'>{user.walletAddress}</Headline></Div>
          </SimpleCell>
        </Group>}

        <SimpleCell onClick={handleAddWallet} before={<Icon28AddSquareOutline />}>
          Добавить кошелёк
        </SimpleCell>
      </Group>
    </Panel>
  )
}

export default Profile
