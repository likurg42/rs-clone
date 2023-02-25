import useTheme from '../../../hooks/useTheme';
import './headerApp.scss';

const HeaderTasks: React.FC = () => {
  const { changeTheme, theme, themes } = useTheme();

  const handleTheme = () => {
    const newTheme = theme === themes.DARK ? null : themes.DARK;
    changeTheme(newTheme);
  };
  return (

    <header className="header-tasks">
      <div className="header__container-tasks">
        <div className="header__burger-tasks" />
      </div>
      <label className="header__switch switch">
        <input
          type="checkbox"
          className="switch__input"
          checked={theme === themes.DARK}
          onChange={handleTheme}
        />
        <span className="switch__span" />
      </label>
    </header>
  );
};

export default HeaderTasks;
