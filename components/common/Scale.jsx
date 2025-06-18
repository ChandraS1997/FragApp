import { Input, Label, Text, XStack, YStack } from 'tamagui';
import RulerIcon from '../../assets/icons/ruler.svg';
import CustomMenu from './CustomMenu';
import CustomPopover from './CustomPopover';
import SidebarButton from './SideBarButton';
import SwitchWithLabel from './SwitchWithLabel';

const Scale = ({ scaleSettings, setScaleSettings }) => {
  return (
    <>
      <CustomPopover
        trigger={<SidebarButton icon={RulerIcon} label="Scale" />}
        content={<ScalingContent scaleSettings={scaleSettings} setScaleSettings={setScaleSettings} />}
      />
    </>
  );
};
export default Scale;

const ScalingContent = ({ scaleSettings, setScaleSettings }) => {
  return (
    <>
      <YStack gap={8} padding={16} width={360}>
        <XStack justifyContent="space-between">
          <SwitchWithLabel label="Dual" size="$2" defaultChecked={false} setScaleSettings={setScaleSettings} />
          <SwitchWithLabel label="Ignore" size="$2" defaultChecked={false} setScaleSettings={setScaleSettings} />
        </XStack>
        {!scaleSettings.Dual && (
          <>
            <XStack >
              <Label size={14} color="$textSecondary" style={{ marginEnd: 15 }}>
                Scale Length
              </Label>
              <XStack width={114} gap={8}>
                <Input
                  placeholder="10"
                  width={114}
                  value={scaleSettings.ScaleLength}
                  onChangeText={(text) =>
                    setScaleSettings((prev) => ({ ...prev, ScaleLength: text }))
                  }
                />
                <CustomMenu
                  label={scaleSettings.Unit}
                  items={['mm', 'cm', 'm', 'in', 'ft']}
                  onSelect={(value) =>
                    setScaleSettings((prev) => ({ ...prev, Unit: value }))
                  }
                />
              </XStack>
            </XStack>
            <XStack >
              <Label size={14} color="$textSecondary" style={{ marginEnd: 20 }}>
                Scale Factor
              </Label>
              <XStack width={114} gap={8}>
                <Input
                  placeholder="px"
                  width={114}
                  value={scaleSettings.ScaleFactor}
                  onChangeText={(text) =>
                    setScaleSettings((prev) => ({ ...prev, ScaleFactor: text }))
                  }
                />
                <Text style={{ paddingTop: 12, paddingLeft: 8 }}>px/m</Text>
              </XStack>
            </XStack>
          </>
        )}
        {scaleSettings.Dual && (
             <>
            <XStack >
              <Label size={14} color="$textSecondary" style={{ marginEnd: 15 }}>
                Upper Length
              </Label>
              <XStack width={114} gap={8}>
                <Input
                  placeholder="10"
                  width={114}
                  value={scaleSettings.ScaleUpperLength}
                  onChangeText={(text) =>
                    setScaleSettings((prev) => ({ ...prev, ScaleUpperLength: text }))
                  }
                />
                <CustomMenu
                  label={scaleSettings.Unit}
                  items={['mm', 'cm', 'm', 'in', 'ft']}
                  onSelect={(value) =>
                    setScaleSettings((prev) => ({ ...prev, Unit: value }))
                  }
                />
              </XStack>
            </XStack>
            <XStack >
              <Label size={14} color="$textSecondary" style={{ marginEnd: 20 }}>
                Lower Length
              </Label>
              <XStack width={114} gap={8}>
                <Input
                  placeholder="px"
                  width={114}
                  value={scaleSettings.ScaleLowerLength}
                  onChangeText={(text) =>
                    setScaleSettings((prev) => ({ ...prev, ScaleLowerLength: text }))
                  }
                />
              </XStack>
            </XStack>
          </>
        )}
      </YStack>
    </>
  );
};
