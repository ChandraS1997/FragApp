import DataTable from './DataTable';
import EditIcon from '../../assets/icons/edit.svg';
import { YStack } from 'tamagui';
import EditParameters from './EditParameters';

const ParamsTable = () => {
  return (
    <>
      <YStack
        width={260}
        borderRadius={8}
        gap={16}
        padding={16}
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <DataTable title="Prediction" data={[{ Xmax: 78.2 }, { x50: 425.63 }, { b: 90.25 }]} />
        <DataTable
          title="Blast Parameters"
          data={[
            { Height: '15.00 mm' },
            { Burden: '8452 kg' },
            { 'Rock Factor': 10.23 },
            { accuracy: 45.0 },
            { Strength: '15.00' },
            { Density: 710.25 },
          ]}
          icon={EditIcon}
          PopoverComponent={EditParameters}
        />
      </YStack>
    </>
  );
};

export default ParamsTable;
