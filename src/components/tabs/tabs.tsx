import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import { TabShape } from '@utils/types';

type Props = {
  changeTab: (currentTab: string) => void;
  currentTab: string;
  tabs: TabShape[];
}

const Tabs = ({ changeTab, currentTab, tabs }: Props) => {
  return (
    <ul
      className={styles.tabs_list}
    >
      {
        tabs.map((tab) => (
          <li
            key={tab.type}
          >
            <Tab
              active={currentTab === tab.type}
              onClick={(currentTab: string) => changeTab(currentTab)}
              value={tab.type}
            >
              {tab.name}
            </Tab>
          </li>
        ))
      }
    </ul>
  );
};

export default Tabs;
