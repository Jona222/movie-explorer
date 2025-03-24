import {ref} from "vue";

const theme = ref<"light" | "dark">("dark");

if (import.meta.client) {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
        theme.value = savedTheme
    } else {
        theme.value = "light"
    }
    document.documentElement.classList.toggle("dark", theme.value === "dark");
}

const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme.value);
    document.documentElement.classList.toggle("dark", theme.value === "dark");
};

export const useTheme = () => {
    return {theme, toggleTheme};
};
