/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: '#222E3C',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: '#EEF0F6',
                    foreground: 'hsl(var(--secondary-foreground))',
                    border: '#DADADB',
                },
                destructive: {
                    DEFAULT: '#DE5A5A',
                    light: '#FFEBEE',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                    sidebar: '#2B394A',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                caption: '#D2CFCF',
                tabs: {
                    DEFAULT: '#183028',
                    content: '#E6E8E7',
                },
                table: '#D6D6D6',
            },
            flex: {
                45: '1 1 45%',
            },
            boxShadow: {
                custom: '0px 2px 5px 0px #00000033',
                product: '0px 2px 10px 0 rgba(0, 0, 0, 0.05)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'scale-down': {
                    from: { scale: '1.2' },
                    to: { scale: '1.0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'scale-infinite': 'scale-down 20s cubic-bezier(.1,0,.9,1.01) infinite alternate-reverse forwards',
            },
            rounded: {
                inherit: 'inherit',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
