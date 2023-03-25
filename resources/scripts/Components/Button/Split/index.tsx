import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button, { ButtonProps } from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import './index.css';

type TButtonProps = ButtonProps & {
  /**
   * Label for the button.
   */
  label: string;
};

export type SplitButtonProps = {
  /**
   * Buttons to be rendered in the split button menu.
   */
  buttons: TButtonProps[];
  /**
   * Default props for the button.
   */
  defaultProp?: ButtonProps;
}

export default function SplitButton({
  buttons,
  defaultProp,
}: SplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current
      && anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant={defaultProp?.variant ?? 'contained'}
        ref={anchorRef}
        aria-label="split button"
        disabled={defaultProp?.disabled ?? false}
      >
        <Button
          {...defaultProp}
          {...buttons[selectedIndex]}
        >
          {buttons[selectedIndex].label}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {buttons.map((button, index) => (
                    <MenuItem
                      key={button.label}
                      selected={index === selectedIndex}
                      disabled={button.disabled}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {button.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

SplitButton.defaultProps = {
  defaultProp: undefined,
};
