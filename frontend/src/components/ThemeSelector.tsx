import { PaletteIcon } from 'lucide-react';
import { THEMES } from '../constants';
import { useStore } from '../stores/useThemeStore';

const ThemeSelector = () => {
  const theme = useStore((state) => state.dataTheme);
  const setDataTheme = useStore((state) => state.setDataTheme);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </label>
      
      <ul
        tabIndex={0}
        className="dropdown-content z-[100] mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 flex flex-col gap-2 invisible opacity-0 transition-all duration-200"
      >
        {THEMES.map((themeOption) => (
          <li key={themeOption.name}> 
            <button
              className={`w-full px-4 py-3 rounded-xl items-center gap-3 transition-colors ${
                theme === themeOption.name ? 'bg-primary/10 text-primary' : 'hover:bg-base-content/5'
              } flex`}
              onClick={() => {
                setDataTheme(themeOption.name);
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
              }}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{themeOption.label}</span>
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;