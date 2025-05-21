import { XStack, Text, Image } from 'tamagui';
import logo from '../../assets/Logo.png';
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
    >
      <XStack alignItems="center" gap="$4">
        <Image source={logo} width={100} style={{ resizeMode: 'cover' }} />

        <Text paddingLeft="$2" fontSize="$8" fontWeight="700">
          {title}
        </Text>
      </XStack>

      <XStack alignItems="center">
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
