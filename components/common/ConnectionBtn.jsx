import { Button, Paragraph, Tooltip, TooltipGroup, Image } from 'tamagui';

import OnlineSvg from '../../assets/online.svg';
const SvgIcon = ({ color = '#888' }) => <OnlineSvg width={18} height={18} color={color} />;

const ConnectionBtn = props => {
  return (
    <TooltipGroup>
      <Tooltip placement="bottom" {...props}>
        <Tooltip.Trigger>
          <Button
            size="$5"
            width={60}
            height={60}
            chromeless
            paddingHorizontal={10}
            paddingVertical={0}
            borderRadius="$0"
            icon={SvgIcon}
            hoverStyle={{ backgroundColor: '$bg' }}
            pressStyle={{ backgroundColor: '$bg' }}
          />
        </Tooltip.Trigger>
        <Tooltip.Content
          enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
          scale={1}
          x={0}
          y={0}
          opacity={1}
          py="$2"
          backgroundColor="$bg"
        >
          <Tooltip.Arrow backgroundColor="$bg" />
          <Paragraph size="$2" lineHeight="$1" color="$textColor">
            Online
          </Paragraph>
        </Tooltip.Content>
      </Tooltip>
    </TooltipGroup>
  );
};

export default ConnectionBtn;
