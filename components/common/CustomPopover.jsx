import { useState } from 'react';
import { Popover } from 'tamagui';

const CustomPopover = ({ trigger, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement="right-start"
      stayInFrame
      allowFlip
      offset={10}
      trapFocus
      allowEscape={false}
      closeOnOutsidePress={false}
      disableAdapt
    >
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        elevate
        padding="$3"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        animation="quick"
        backgroundColor="$bg"
        // width={200}
        // maxWidth={250}
        // minWidth={200}
      >
        <Popover.Arrow size={20} backgroundColor="$bg" borderWidth={1} borderColor="$borderColor" />
        {content}
      </Popover.Content>
    </Popover>
  );
};
export default CustomPopover;
