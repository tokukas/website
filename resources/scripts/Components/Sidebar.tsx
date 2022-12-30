import ExpandableDrawer, {
  ExpandableDrawerProps,
} from '@/Components/ExpandableDrawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerProps } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import * as React from 'react';
import SidebarItem, { TPropsSidebarItem } from './SidebarItem';

export type TPropsSidebar = Omit<DrawerProps & ExpandableDrawerProps,
  'variant'
> & {
  menuItems?: Omit<TPropsSidebarItem, 'open'>[];
  setOpen?: (open: boolean) => void;
};

export default function Sidebar({
  menuItems = [], open, setOpen, ...props
}: TPropsSidebar) {
  const handleSidebarToggle = () => {
    setOpen?.(!open);
  };

  return (
    <ExpandableDrawer
      variant="permanent"
      open={open}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <List>
        <SidebarItem
          open={open ?? false}
          name={open ? 'Collapse' : 'Expand'}
          icon={open
            ? <ChevronLeftIcon />
            : <ChevronRightIcon />}
          onClick={handleSidebarToggle}
        />
        <Divider />
        {menuItems.map((item) => (
          <SidebarItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
            key={item.name}
            open={open ?? false}
          />
        ))}
      </List>
    </ExpandableDrawer>
  );
}

Sidebar.defaultProps = {
  menuItems: undefined,
  setOpen: undefined,
};
