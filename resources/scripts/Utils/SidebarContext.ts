import { createContext } from 'react';

export type SidebarContextType = {
  open: boolean;
  toggle: () => void;
  selectedItem?: string;
}

const SidebarContext = createContext({
  open: false,
  selectedItem: undefined,
} as SidebarContextType);

if (import.meta.env.DEV) {
  SidebarContext.displayName = 'SidebarContext';
}

export default SidebarContext;
