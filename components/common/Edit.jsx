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
import undo from '../../assets/icons/undo1.svg';
import redo from '../../assets/icons/redo.svg';
import edit from '../../assets/icons/edit.svg';

const Edit = () => {
  return (
    <>
      <CustomPopover
        trigger={
          <SidebarButton
            icon={<Image source={edit} style={{ width: 24, height: 24 }} />}
            label="Edit"
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
      <YStack gap={16}>
        <XStack gap={16}>
          <IconTool
            svgIcon={() => <Image source={draw} width={18} height={18} />}
            label="Free Draw"
          />
          <IconTool
            svgIcon={() => <Image source={line} width={18} height={18} />}
            label="Line Draw"
          />
          <IconTool
            svgIcon={() => <Image source={box} width={18} height={18} />}
            label="Box Delete"
          />
          <IconTool
            svgIcon={() => <Image source={lasso} width={18} height={18} />}
            label="Lasso Delete"
          />
          <IconTool
            svgIcon={() => <Image source={lassoOutline} width={18} height={18} />}
            label="Lasso Delete + Outline"
          />
        </XStack>
        <XStack gap={16}>
          <IconTool
            svgIcon={() => <Image source={fines} width={18} height={18} />}
            label="Mark as Fines"
          />
          <IconTool
            svgIcon={() => <Image source={remove} width={18} height={18} />}
            label="Remove"
          />
          <IconTool svgIcon={() => <Image source={crop} width={18} height={18} />} label="Crop" />
          <IconTool svgIcon={() => <Image source={undo} width={18} height={18} />} label="Undo" />
          <IconTool svgIcon={() => <Image source={redo} width={18} height={18} />} label="Redo" />
        </XStack>
      </YStack>
    </>
  );
};
