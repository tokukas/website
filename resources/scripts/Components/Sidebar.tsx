import ExpandableDrawer, {
  ExpandableDrawerProps,
} from '@/Components/ExpandableDrawer';
import SidebarContext, { SidebarContextType } from '@/Utils/SidebarContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerProps } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import * as React from 'react';
import SidebarItem, { TPropsSidebarItem } from './SidebarItem';

export type TPropsSidebar = Omit<DrawerProps & ExpandableDrawerProps,
  'variant' | 'open' | 'children'
> & {
  /**
   * Set the sidebar items.
   * 
   * @default []
   */
  items?: TPropsSidebarItem[];

  /**
   * Set the key of sidebar item that will be selected.
   *
   * Make sure the sidebar item has unique `key`.
   * 
   * If not set, the `selected` property of the sidebar item will be used.
   *
   * @default undefined
   */
  selectedItem?: string;
};

export default function Sidebar({
  items = [], selectedItem, ...props
}: TPropsSidebar) {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen?.(!open);
  };

  const sidebarContext = React.useMemo<SidebarContextType>(() => ({
    open,
    toggle,
  }), [open]);

  return (
    <SidebarContext.Provider value={sidebarContext}>
      <ExpandableDrawer
        variant="permanent"
        open={open}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <List>
          <SidebarItem
            name={open ? 'Collapse' : 'Expand'}
            icon={open
              ? <ChevronLeftIcon />
              : <ChevronRightIcon />}
            onClick={toggle}
          />
          <Divider />
          {items.map((item) => (
            <SidebarItem
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...item}
              key={item.key ?? item.name}
              selected={selectedItem && item.key
                ? selectedItem === item.key
                : item.selected}
            />
          ))}
        </List>
      </ExpandableDrawer>
    </SidebarContext.Provider>
  );
}

Sidebar.defaultProps = {
  items: undefined,
  selectedItem: undefined,
};