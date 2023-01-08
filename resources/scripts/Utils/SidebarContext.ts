import { createContext } from 'react';

export type SidebarContextType = {
  open: boolean;
  toggle: () => void;
}

const SidebarContext = createContext({
  open: false,
} as SidebarContextType);

SidebarContext.displayName = 'SidebarContext';

export default SidebarContext;
