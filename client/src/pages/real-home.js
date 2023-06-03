import { HomeIntro } from '../components/homepage/home-intro'
import { SearchBar } from '../components/searchbar';
import { Map } from '../components/map';
import { HomeFeatured } from '../components/homepage/home-featured';
import { HomePlaces } from '../components/homepage/home-places';
import { HomeCategories } from '../components/homepage/home-categories';
import { HomeCommunity } from '../components/homepage/home-community';

export const RealHome = () => { 
    return (
        <div>
            <HomeIntro />
            <br />
            <SearchBar />
{/*             <Map />
 */}            <br />
            <HomeFeatured />
            <br />
            <HomePlaces/>
            <br />
            <HomeCategories />
            <br />
            <HomeCommunity />
        </div>
    )
};