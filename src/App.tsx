import React, { useEffect, useState } from 'react'
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  PlatformType,
  SplitCol,
  SplitLayout
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { View } from '@cteamdev/router'
import { Home } from './pages'
import { Navigation } from './components/navigation'
import { getPlatform } from './utils'
import { useSetAtomState } from '@mntm/precoil'
import { vkUserAtom } from './store'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import Events from './pages/Events'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Tickets from './pages/Tickets'

export const App: React.FC = () => {
  const platform: PlatformType = getPlatform()
  const setVkUser = useSetAtomState(vkUserAtom)
  const [isAdmin, setIsAdmin] = useState(true)


  useEffect(() => {
    const load = async () => {
      const vkUser: UserInfo = await bridge.send('VKWebAppGetUserInfo')
      setVkUser(vkUser)
    }
    load()
  }, [])

  return (
    <ConfigProvider platform={platform}>
      <AdaptivityProvider>
        <AppRoot>
          <Navigation >
            <View nav='/'>
              <Home nav='/' />
            </View>
            <View nav='/events'>
              <Events nav='/' />
            </View>
            <View nav='/favorite'>
              <Favorites nav='/' />
            </View>
            <View nav='/tickets'>
              <Tickets nav='/' />
            </View>
            <View nav='/profile'>
              <Profile nav='/' />
            </View>
          </Navigation>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
