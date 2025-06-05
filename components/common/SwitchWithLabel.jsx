import { useId, useState } from 'react';
import { Label, Switch, XStack } from 'tamagui';

function SwitchWithLabel({ label, size = '$2', defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  const reactId = useId();
  const id = `switch-${size.replace('$', '')}-${reactId}`;

  return (
    <XStack alignItems="center" gap="$4">
      <Label
        paddingRight="$0"
        justifyContent="flex-end"
        size={14}
        htmlFor={id}
        color="$textSecondary"
      >
        {label}
      </Label>

      <Switch
        id={id}
        size={size}
        checked={checked}
        onCheckedChange={setChecked}
        backgroundColor={checked ? '#ffffff' : '#f5f5f5'}
        borderColor={checked ? '#267EF9' : '#e5e5e5'}
        borderWidth={1}
        width={52}
        height={32}
        justifyContent={checked ? 'flex-end' : 'flex-start'}
        paddingHorizontal={4}
        paddingVertical={2}
        alignItems="center"
        borderRadius={999}
      >
        <Switch.Thumb
          width={26}
          height={26}
          borderRadius={999}
          backgroundColor={checked ? '#267EF9' : '#e5e5e5'}
          animation="quick"
        />
      </Switch>
    </XStack>
  );
}
export default SwitchWithLabel;
