import Cards from './components/card.jsx'
import Popular from './components/Popular.jsx'
import Weather from './components/weather.jsx'

export default function App() {
    return (
        <div className="flex justify-center">
            <Cards/>
            <div className="flex flex-col">
                <Popular/>
                <Weather />
            </div>
        </div>
    );
}
