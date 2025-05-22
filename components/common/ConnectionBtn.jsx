import { Button, Paragraph, Tooltip, TooltipGroup, Image } from 'tamagui';

import onlineSvg from '../../assets/online.svg';
const SvgIcon = () => <Image source={onlineSvg} width={18} height={18} />;

const ConnectionBtn = props => {
  return (
    <TooltipGroup>
      <Tooltip placement="bottom" {...props}>
        <Tooltip.Trigger>
          <Button
            size="$6"
            chromeless
            padding="$4"
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
