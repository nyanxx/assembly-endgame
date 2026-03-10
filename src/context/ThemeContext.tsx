import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

type Theme = "dark" | "light" | "system"

type ThemeContextState = {
    theme: Theme,
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextState | undefined>(undefined)

export const useThemeContext = (): ThemeContextState => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("ThemeContext Error")
    }
    return context
}

type ThemeProviderProps = PropsWithChildren & {
    defaultTheme?: Theme,
    storageKey?: string
}

export const ThemeProvider = ({
    children,
    defaultTheme = "system" as Theme,
    storageKey = "vite-ui-theme"
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") as Theme || defaultTheme)

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")


        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            localStorage.setItem(storageKey, theme)
            return
        }
        root.classList.add(theme)
        localStorage.setItem(storageKey, theme)

        // document.documentElement.setAttribute("data-theme", theme)
        // if (theme === "dark") {
        //     document.documentElement.classList.add("dark");
        // } else {
        //     document.documentElement.classList.remove("dark");
        // }
    
    }, [theme, storageKey])

    const toggleTheme = (): void => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}