/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

export default {
    content: [
        "./index.jsx.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],

    darkMode: "class",
    plugins: [nextui({
        defaultTheme: "light", // 来自主题对象的默认主题
        layout: {
            disabledOpacity: "0.3",
            radius: {
                small: "4px",
                medium: "6px",
                large: "8px",
            },
            borderWidth: {
                small: "1px",
                medium: "2px",
                large: "3px",
            },
        },
        themes:{
            light: {
                colors: {
                    background: "#f3f6fd",
                }
            },
        }
    })],
}

