import Select from 'react-select';
import { ISelectItem } from '@/common/types/select/single_item';

export type ISelectItems = {
    items: ISelectItem[];
    selectedOptions: ISelectItem[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<ISelectItem[]>>;
}

export default function MultiSelect({items, selectedOptions, setSelectedOptions}: ISelectItems) {

  const handleSelectChange = (selectedOptions: ISelectItem[]) => {
    console.log(selectedOptions)
    setSelectedOptions(selectedOptions);
  };

  return (
    <div className='lg:w-1/4 md:w-1/2 w-full'>
      <Select
        defaultValue={[]}
        isMulti
        name='categories'
        options={items}
        className='lg:w-full shadow appearance-none'
        classNamePrefix='select'
        placeholder='Select categories. All categories now'
        onChange={handleSelectChange}
        value={selectedOptions}
      />
    </div>
  );
}