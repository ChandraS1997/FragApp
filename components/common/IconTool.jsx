import { Button, Paragraph, Tooltip, TooltipGroup } from 'tamagui';

const IconTool = ({ svgIcon, label }) => {
  return (
    <TooltipGroup>
      <Tooltip placement="bottom">
        <Tooltip.Trigger>
          <Button
            width={44}
            height={44}
            chromeless
            padding={4}
            borderRadius={8}
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
            icon={svgIcon}
            hoverStyle={{ backgroundColor: '$hoverBackground' }}
            pressStyle={{ backgroundColor: '$hoverBackground' }}
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
            {label}
          </Paragraph>
        </Tooltip.Content>
      </Tooltip>
    </TooltipGroup>
  );
};

export default IconTool;
