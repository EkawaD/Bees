import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { WiDaySunny, WiMoonWaningCrescent3 } from 'react-icons/wi';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="right" m="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? (
          <WiDaySunny size="1.5em" color="orange" />
        ) : (
          <WiMoonWaningCrescent3 size="1.5em" color="blue" />
        )}
      </ActionIcon>
    </Group>
  );
}
