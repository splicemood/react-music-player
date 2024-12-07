import { UnstyledButton } from '@mantine/core';
import classes from '@/components/Navbar/MobileNavbar.module.css';

export const LinkButton = ({ label, to }: { label: string; to: string }) => {
  return <UnstyledButton component={'a'} href={to} className={classes.control} children={label} />;
};
