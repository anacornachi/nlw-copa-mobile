import {Button as ButtonNativeBase, Text, IButtonProps} from 'native-base';

type ButtonProps = {
  title: string;
  type?: 'primary' | 'secondary';
} & IButtonProps;

export default function Button({
  title,
  type = 'primary',
  ...props
}: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      textTransform="uppercase"
      bg={type === 'secondary' ? 'red.500' : 'yellow.500'}
      _pressed={{bg: type === 'secondary' ? 'red.600' : 'yellow.600'}}
      _loading={{
        _spinner: {color: 'white'},
      }}
      {...props}
    >
      <Text
        color={type === 'secondary' ? 'white' : 'black'}
        fontSize="sm"
        fontFamily="heading"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
