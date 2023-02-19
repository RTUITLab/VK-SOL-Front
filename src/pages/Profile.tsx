import {
  Avatar,
  Card,
  Div,
  Group,
  Header,
  Headline,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  SimpleCell,
  Subhead,
  Switch,
  Title
} from '@vkontakte/vkui'
import React from 'react'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { userAtom, vkUserAtom } from '../store'
import { Icon28AddOutline, Icon28AddSquareOutline, Icon28RemoveCircleOutline } from '@vkontakte/icons'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../api'

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

  function handleAddWallet() {

    const uuid = uuidv4()

    const newWindow = window.open(window.location.href, 'NFT', 'popup')
    newWindow?.addEventListener('load', async () => {
      const provider = await newWindow?.phantom?.solana.connect()
      const address = await provider.publicKey.toString()
      await api.authorize(uuid, address)
        .then(() => {
          api.getAddress(uuid)
            .then(data => {
              setUser({ ...user, walletAddress: data.address })
              bridge.send('VKWebAppStorageSet', {
                key: 'address',
                value: data.address
              })
                .catch(() => console.log('err saving address in storage'))
              console.log(provider)
            })
            .catch(err => console.error('err', err))
        })
        .then(() => newWindow?.close())
        .catch(err => console.error('err', err))
    })
  }
  
  function handleRemoveWallet() {
    setUser({ ...user, walletAddress: '' })
    bridge.send('VKWebAppStorageSet', {
      key: 'address',
      value: ''
    })
  }

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Профиль</PanelHeaderContent></PanelHeader>
      <Group>
        <SimpleCell before={<Avatar size={72} src={vkUser.photo_200} />}>
          {vkUser.first_name} {vkUser.last_name}
        </SimpleCell>

        <SimpleCell onClick={handleChange} before={<Switch checked={user.isAdmin} onClick={(e)=>{e.stopPropagation()
          handleChange}}
                                                   />}
        >
          Я администратор
        </SimpleCell>
      </Group>

      <Group>
        <Header>Криптокошелёк</Header>
        {user.walletAddress !== '' &&
          <Group>
            <SimpleCell style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'no-wrap' }}>
              <Div>
                <img width={50} src='https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' />
                <Headline level='2'>Phantom</Headline >
              </Div>
              <Div><Headline level='1'>{user.walletAddress}</Headline></Div>
            </SimpleCell>
          </Group>}

        {user.walletAddress === '' ? <SimpleCell onClick={handleAddWallet} before={<Icon28AddSquareOutline />}>
          Подключить кошелёк
        </SimpleCell> : <SimpleCell onClick={handleRemoveWallet} before={<Icon28RemoveCircleOutline />}>
          Отключить кошелёк
        </SimpleCell>}
      </Group>
    </Panel>
  )
}

export default Profile
