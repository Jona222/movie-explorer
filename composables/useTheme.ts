import { ref } from "vue";

const theme = ref("dark");

if (process.client) {
    theme.value = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
}

const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme.value);
    document.documentElement.classList.toggle("dark", theme.value === "dark");
};

export const useTheme = () => {
    return { theme, toggleTheme };
};
