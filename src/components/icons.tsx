import Image from 'next/image';

export function LogoIcon(props: { className?: string }) {
  return (
    <Image
      src="https://raster.app/uglogcfw1stdna/images?image=n1XG70x1T5Q"
      alt="Rungroj Carrent Logo"
      width={1080}
      height={1080}
      className={props.className}
      data-ai-hint="logo"
    />
  );
}
