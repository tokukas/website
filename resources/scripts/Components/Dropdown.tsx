/* eslint-disable max-len */
import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import React, {
  Fragment, useContext, useState, useMemo,
} from 'react';

type TDropdownContext = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  toggleOpen: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}

const DropDownContext = React.createContext({} as TDropdownContext);

type TPropsDropdown = {
  children: React.ReactNode;
}

function Dropdown({ children }: TPropsDropdown) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  const context = useMemo(() => (
    { open, setOpen, toggleOpen }), [open, setOpen, toggleOpen]);

  return (
    <DropDownContext.Provider value={context}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
}

type TPropsTrigger = {
  children: React.ReactNode;
}

function Trigger({ children }: TPropsTrigger) {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </>
  );
}

type TPropsContent = {
  align?: 'left' | 'right';
  width?: '48' | '56';
  contentClasses?: string;
  children: React.ReactNode;
}

function Content({
  align = 'right', width = '48', contentClasses = 'py-1 bg-white', children,
}: TPropsContent) {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = 'origin-top';

  if (align === 'left') {
    alignmentClasses = 'origin-top-left left-0';
  } else if (align === 'right') {
    alignmentClasses = 'origin-top-right right-0';
  }

  let widthClasses = '';

  if (width === '48') {
    widthClasses = 'w-48';
  }

  return (
    <Transition
      as={Fragment}
      show={open}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
        onClick={() => setOpen(false)}
      >
        <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>{children}</div>
      </div>
    </Transition>
  );
}

Content.defaultProps = {
  align: 'right',
  width: '48',
  contentClasses: 'py-1 bg-white',
};

type TPropsDropdownLink = {
  href: string;
  method?: 'post' | 'get';
  as?: 'a' | 'button';
  children: React.ReactNode;
}

function DropdownLink({
  href, method = 'post', as = 'a', children,
}: TPropsDropdownLink) {
  return (
    <Link
      href={href}
      method={method}
      as={as}
      className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
}

DropdownLink.defaultProps = {
  method: 'post',
  as: 'a',
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
