import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import './styles/tailwind.css'
// Redux
import store from "./stores";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <BrowserRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>
            </NextThemesProvider>
        </NextUIProvider>
    </React.StrictMode>,
)
