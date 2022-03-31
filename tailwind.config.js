module.exports = {
  content: ["./src/**/*.{js,jsx}", "./node_modules/flowbite/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'main-green': '#52B76C',
        'hover-green': '#3D8951',
      },
      fontFamily: {
        'header': ['Nexa Bold', 'Helvetica', 'Arial', 'sans-serif'],
        'caption': ['Nexa Light', 'Helvetica', 'Arial', 'sans-serif'],
        'sans': ['Nexa Regular', 'Helvetica', 'Arial', 'sans-serif']
      },
      animation: {
          "jello-horizontal": "jello-horizontal 0.8s ease   both",
          "trace-path": "trace-path 4s",
          "fade": "fade 6s",
          "swing-in-top-fwd": "swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both",
          "scale-in-hor-center": "scale-in-hor-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
          "swing-out-top-bck": "swing-out-top-bck 0.55s cubic-bezier(0.600, -0.280, 0.735, 0.045)   both",
          "jello-vertical": "jello-vertical 0.8s ease   both",
          "flip-in-hor-top": "flip-in-hor-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
          "scale-in-bottom": "scale-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
      },
      keyframes: {
        "scale-in-bottom": {
          "0%": {
              transform: "scale(0)",
              "transform-origin": "50% 100%",
              opacity: "1"
          },
          to: {
              transform: "scale(1)",
              "transform-origin": "50% 100%",
              opacity: "1"
          }
      },
        "flip-in-hor-top": {
          "0%": {
              transform: "rotateX(-80deg)",
              opacity: "0"
          },
          to: {
              transform: "rotateX(0)",
              opacity: "1"
          }
      },
        "jello-vertical": {
          "0%,to": {
              transform: "scale3d(1, 1, 1)"
          },
          "30%": {
              transform: "scale3d(.75, 1.25, 1)"
          },
          "40%": {
              transform: "scale3d(1.25, .75, 1)"
          },
          "50%": {
              transform: "scale3d(.85, 1.15, 1)"
          },
          "65%": {
              transform: "scale3d(1.05, .95, 1)"
          },
          "75%": {
              transform: "scale3d(.95, 1.05, 1)"
          }
        },
        "swing-out-top-bck": {
          "0%": {
              transform: "rotateX(0deg)",
              "transform-origin": "top",
              opacity: "1"
          },
          to: {
              transform: "rotateX(-100deg)",
              "transform-origin": "top",
              opacity: "0"
          }
        },
        "scale-in-hor-center": {
          "0%": {
              transform: "scaleX(0)",
              opacity: "1"
          },
          to: {
              transform: "scaleX(1)",
              opacity: "1"
          }
        },
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
          "swing-in-top-fwd": {
            "0%": {
                transform: "rotateX(-100deg)",
                "transform-origin": "top",
                opacity: "0"
            },
            to: {
                transform: "rotateX(0deg)",
                "transform-origin": "top",
                opacity: "1"
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
    require('flowbite/plugin')
  ],
}
