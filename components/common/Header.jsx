import { XStack, Text, Image } from 'tamagui';
import logo from '../../assets/logo.png';
import DatabaseSync from './DatabaseSync';
import LanguageSelector from './LanguageSelector';
import ConnectionBtn from './ConnectionBtn';

const Header = ({ title }) => {
  return (
    <XStack
      bg="$bg"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderColor="$borderColor"
      width="100%"
      height={60}
    >
      <XStack alignItems="center" gap="$4">
        <Image source={logo} width={100} style={{ resizeMode: 'cover' }} />

        <Text paddingHorizontal={16} fontSize={16} fontWeight="600">
          {title}
        </Text>
      </XStack>

      <XStack alignItems="center" gap={1}>
        <LanguageSelector />

        <XStack borderLeftWidth={1} borderColor="$borderColor">
          <DatabaseSync />
        </XStack>

        <XStack borderLeftWidth={1} borderColor="$borderColor">
          <ConnectionBtn />
        </XStack>
      </XStack>
    </XStack>
  );
};

export default Header;
