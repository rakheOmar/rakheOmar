import { useEffect } from "react";

/**
 * Custom hook to apply theme transition animations using View Transitions API
 * @param {string} theme - Current theme ('light' or 'dark')
 * @param {string} variant - Animation variant ('polygon' or other variants)
 */
export function useThemeTransition(theme, variant = 'polygon') {
    useEffect(() => {
        if (!theme || theme === 'system') return;

        const styleId = 'theme-transition-style';
        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
        }

        let css = '';

        if (variant === 'polygon') {
            css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: ${theme === 'light' ? 'wipe-in-dark' : 'wipe-in-light'} 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `;
        }

        if (css) {
            style.textContent = css;
            document.head.appendChild(style);

            // Clean up animation styles after transition
            const cleanup = setTimeout(() => {
                const styleEl = document.getElementById(styleId);
                if (styleEl) {
                    styleEl.remove();
                }
            }, 3000);

            return () => {
                clearTimeout(cleanup);
            };
        }
    }, [theme, variant]);
}
