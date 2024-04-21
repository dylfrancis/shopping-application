import { Input } from '@chakra-ui/react';

export const SearchBar = (props: { onSearch: () => void }) => {
  const { onSearch } = props;
  return <Input onChange={onSearch} />;
};
