import Cards from './components/card.jsx'
import Popular from './components/Popular.jsx'
import Weather from './components/weather.jsx'
import SongTable from './components/songTable.jsx'
import AnCard from './components/ancard.jsx'

export default function App() {
    return (
        <div className="flex justify-center">
            {/*<Cards/>*/}
            <div className="w-2/4">
                {/*<SongTable/>*/}
                <AnCard/>
            </div>
            <div className="flex flex-col w-2/4">
                <Popular/>
                <Weather/>
            </div>
        </div>
    );
}
