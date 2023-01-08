import { createContext } from 'react';

export type SidebarContextType = {
  open: boolean;
  toggle: () => void;
}

const SidebarContext = createContext({
  open: false,
} as SidebarContextType);

if (import.meta.env.DEV) {
  SidebarContext.displayName = 'SidebarContext';
}

export default SidebarContext;
