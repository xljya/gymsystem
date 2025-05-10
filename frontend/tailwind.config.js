module.exports = {
  // Updated content paths
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  // 启用 class 模式的暗色主题
  darkMode: ['class'],
  // class 前缀（默认为空）
  prefix: '',
  theme: {
    // 容器相关配置
    container: {
      center: true, // 居中
      padding: '2rem', // 内边距
      screens: {
        '2xl': '1400px', // 2xl 屏幕宽度
      },
    },
    extend: {
      // 扩展颜色
      colors: {
        border: 'hsl(var(--border))', // 边框色
        input: 'hsl(var(--input))', // 输入框色
        ring: 'hsl(var(--ring))', // ring 色
        background: 'hsl(var(--background))', // 背景色
        foreground: 'hsl(var(--foreground))', // 前景色
        // Added Les Mills colors from new config
        lesmills: {
          red: '#E40520',
          black: '#111111',
          gray: '#F5F5F5',
          'dark-gray': '#333333',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // 侧边栏相关颜色
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // 健身相关自定义颜色
        fitness: {
          red: '#E53935', // 健身红
          dark: '#1A1A1A', // 健身深色
          light: '#F9F9F9', // 健身浅色
          gray: '#707070', // 健身灰
        },
        gym: {
          primary: "#1A1F2C",
          accent: "#ea384c",
          light: "#F6F6F7",
          gray: "#8E9196",
        },
      },
      // 扩展圆角
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // 自定义 keyframes 动画
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // Renamed from 'pulse-soft' to 'pulse-light' based on new config
        'pulse-light': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      // 自定义动画
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Renamed from 'pulse-soft' to 'pulse-light'
        'pulse-light': 'pulse-light 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
      },
      // Added fontFamily from new config
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  // Changed plugin import to CommonJS style
  plugins: [require("tailwindcss-animate")],
};
