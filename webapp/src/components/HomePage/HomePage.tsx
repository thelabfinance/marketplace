import React, { useCallback, useEffect } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
// import { isMobile } from 'decentraland-dapps/dist/lib/utils'
import { Page } from 'decentraland-ui'
import { locations } from '../../modules/routing/locations'
import { VendorName } from '../../modules/vendor/types'
import { SortBy } from '../../modules/routing/types'
import { View } from '../../modules/ui/types'
import { HomepageView } from '../../modules/ui/nft/homepage/types'
import { Section } from '../../modules/vendor/decentraland/routing/types'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { Slideshow } from './Slideshow'
import { Props } from './HomePage.types'
import styled from 'styled-components'
import './HomePage.css'

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 142px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

const HomePage = (props: Props) => {
  const { homepage, homepageLoading, onNavigate, onFetchNFTsFromRoute } = props

  const sections = {
    [View.HOME_WEARABLES]: Section.WEARABLES,
    [View.HOME_LAND]: Section.LAND,
    [View.HOME_ENS]: Section.ENS
  }

  // const handleGetStarted = useCallback(() => onNavigate(locations.browse()), [
  //   onNavigate
  // ])

  const handleViewAll = useCallback(
    (section: Section) => onNavigate(locations.browse({ section })),
    [onNavigate]
  )

  const vendor = VendorName.DECENTRALAND

  useEffect(() => {
    let view: HomepageView
    for (view in homepage) {
      const section = sections[view]
      onFetchNFTsFromRoute({
        vendor,
        section,
        view,
        sortBy: SortBy.RECENTLY_LISTED,
        page: 1,
        onlyOnSale: true
      })
    }
    // eslint-disable-next-line
  }, [onFetchNFTsFromRoute])

  const views = Object.keys(homepage) as HomepageView[]

  return (
    <>
      <Navbar isFullscreen isOverlay />
      <SvgHero>
        <object type="image/svg+xml" data="nfthero.svg" width="888px">&nbsp;</object>
      </SvgHero>
      <Page className="HomePage">
        {views.map(view => (
          <Slideshow
            key={view}
            title={t(`home_page.${view}`)}
            nfts={homepage[view]}
            isLoading={homepageLoading[view]}
            onViewAll={() => handleViewAll(sections[view])}
          />
        ))}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
