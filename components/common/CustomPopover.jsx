import { useState } from 'react';
import { Popover } from 'tamagui';

const CustomPopover = ({ trigger, content }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement="right-start"
      stayInFrame
      allowFlip
      offset={35}
      trapFocus
      allowEscape={false}
      closeOnOutsidePress={false}
      disableAdapt
    >
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Content
        borderRadius={8}
        elevate
        // padding="$3"
        padding={0}
        offset={100}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        animation="quick"
        backgroundColor="$bg"
        // width={200}
        // maxWidth={250}
        // minWidth={200}
      >
        <Popover.Arrow size={25} backgroundColor="$bg" borderWidth={1} borderColor="$borderColor" />
        {typeof content === 'function' ? content({ onClose: handleClose }) : content}
      </Popover.Content>
    </Popover>
  );
};
export default CustomPopover;
