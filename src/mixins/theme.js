export default {
    data() {
        return {
            system: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
            userTheme: "light",
            userHeartbeatBar: localStorage.heartbeatBarTheme,
            styleElapsedTime: localStorage.styleElapsedTime,
            statusPageTheme: "light",
            forceStatusPageTheme: false,
            path: "",
        };
    },

    mounted() {
        localStorage.theme = "light";

        // Default Heartbeat Bar
        if (!this.userHeartbeatBar) {
            this.userHeartbeatBar = "normal";
        }

        // Default Elapsed Time Style
        if (!this.styleElapsedTime) {
            this.styleElapsedTime = "no-line";
        }

        document.body.classList.add(this.theme);
        this.updateThemeColorMeta();
    },

    computed: {
        theme() {
            // As entry can be status page now, set forceStatusPageTheme to true to use status page theme
            if (this.forceStatusPageTheme) {
                if (this.statusPageTheme === "auto") {
                    return this.system;
                }
                return this.statusPageTheme;
            }

            // Entry no need dark
            if (this.path === "") {
                return "light";
            }

            if (this.path.startsWith("/status-page") || this.path.startsWith("/status")) {
                if (this.statusPageTheme === "auto") {
                    return this.system;
                }
                return this.statusPageTheme;
            }

            return "light";
        },

        isDark() {
            return this.theme === "dark";
        },
    },

    watch: {
        "$route.fullPath"(path) {
            this.path = path;
        },

        userTheme(to, from) {
            localStorage.theme = to;
        },

        styleElapsedTime(to, from) {
            localStorage.styleElapsedTime = to;
        },

        theme(to, from) {
            document.body.classList.remove(from);
            document.body.classList.add(this.theme);
            this.updateThemeColorMeta();
        },

        userHeartbeatBar(to, from) {
            localStorage.heartbeatBarTheme = to;
        },

        heartbeatBarTheme(to, from) {
            document.body.classList.remove(from);
            document.body.classList.add(this.heartbeatBarTheme);
        },
    },

    methods: {
        /**
         * Update the theme color meta tag
         * @returns {void}
         */
        updateThemeColorMeta() {
            document.querySelector("#theme-color").setAttribute("content", "#1a87c8");
        },
    },
};
