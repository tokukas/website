import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export type BasicDialogProps = Omit<DialogProps, 'children'> & {
  /**
   *
   */
  open: boolean;
  /**
   *
   */
  title: string;
  /**
   *
   */
  content?: React.ReactNode;
  /**
   *
   */
  actions?: React.ReactNode;
  /**
   *
   */
  description?: string;
  /**
   * Display the top and bottom dividers in dialog content.
   *
   * @default false
   */
  dividers?: boolean;
  /**
   * If true, the dialog actions do not have additional margin.
   *
   * @default false
   */
  disableSpacing?: boolean;
};

export default function BasicDialog({
  open,
  title,
  actions,
  content,
  description,
  dividers,
  disableSpacing,
  ...props
}: BasicDialogProps) {
  const id = React.useId();

  return (
    <Dialog
      open={open}
      aria-labelledby={`${title}-dialog-title-${id}`}
      aria-describedby={description ? `${title}-dialog-description-${id}` : undefined}
      {...props}
    >
      <DialogTitle id={`${title}-dialog-title-${id}`}>
        {title}
      </DialogTitle>

      <DialogContent dividers={dividers}>
        {description && (
          <DialogContentText id={`${title}-dialog-description-${id}`}>
            {description}
          </DialogContentText>
        )}
        {content}
      </DialogContent>

      {actions && (
        <DialogActions disableSpacing={disableSpacing}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

BasicDialog.defaultProps = {
  actions: undefined,
  content: undefined,
  description: undefined,
  dividers: false,
  disableSpacing: false,
};
