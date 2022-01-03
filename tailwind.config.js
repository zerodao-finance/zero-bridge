module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
          "jello-horizontal": "jello-horizontal 0.8s ease   both",
          "trace-path": "trace-path 4s",
          "fade": "fade 6s"
      },
      keyframes: {
          "jello-horizontal": {
              "0%,to": {
                  transform: "scale3d(1, 1, 1)",
                  opacity: 1
              },
              "30%": {
                  transform: "scale3d(1.25, .75, 1)"
              },
              "40%": {
                  transform: "scale3d(.75, 1.25, 1)"
              },
              "50%": {
                  transform: "scale3d(1.15, .85, 1)"
              },
              "65%": {
                  transform: "scale3d(.95, 1.05, 1)"
              },
              "75%": {
                  transform: "scale3d(1.05, .95, 1)",
                  opacity: 0
              }
          },
          "trace-path" : {
            '0%, to': {
              strokeDashoffset: '130',
              opacity:0

            },
            '1%': {
              strokeDashoffset: "130",
              opacity:1
            },
            
            '50%': {
              strokeDashoffset: '0',
              opacity: 1
            },

            "100%": {
              strokeDashoffset: '130',
              opacity: 0
            }

          },
           
          "fade" : {
            "0%, to": {
              backdropFilter: 'blur(24px)'
            },
            "50%": {
              backdropFilter: 'blur(24px)'
            },
            "75%": {
              backdropFilter: 'blur(24px)'
            },
            "100%": {
              backdropFilter: 'blur(0)'
            }
          }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
