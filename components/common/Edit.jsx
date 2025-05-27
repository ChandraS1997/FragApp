import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import { Image, XStack, YStack } from 'tamagui';
import draw from '../../assets/icons/draw.svg';
import line from '../../assets/icons/line.svg';
import box from '../../assets/icons/box.svg';
import lasso from '../../assets/icons/lasso.svg';
import lassoOutline from '../../assets/icons/lassoOutline.svg';
import IconTool from './IconTool';
import fines from '../../assets/icons/fines.svg';
import remove from '../../assets/icons/remove.svg';
import crop from '../../assets/icons/crop.svg';
import undo from '../../assets/icons/undo.svg';
import redo from '../../assets/icons/redo.svg';
import EditIcon from '../../assets/icons/edit.svg';

const Edit = () => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={EditIcon}
            label="Edit"
            hoverColor="$primary"
            defaultColor="$primary"
          />
        }
        content={<EditContent />}
      />
    </>
  );
};
export default Edit;

const EditContent = () => {
  return (
    <>
      <YStack gap={16} padding={16}>
        <XStack gap={16}>
          <IconTool svgIcon={draw} label="Free Draw" />
          <IconTool svgIcon={line} label="Line Draw" />
          <IconTool svgIcon={box} label="Box Delete" />
          <IconTool svgIcon={lasso} label="Lasso Delete" />
          <IconTool svgIcon={lassoOutline} label="Lasso Delete + Outline" />
        </XStack>
        <XStack gap={16}>
          <IconTool svgIcon={fines} label="Mark as Fines" />
          <IconTool svgIcon={remove} label="Remove" />
          <IconTool svgIcon={crop} label="Crop" />
          <IconTool svgIcon={undo} label="Undo" />
          <IconTool svgIcon={redo} label="Redo" />
        </XStack>
      </YStack>
    </>
  );
};
