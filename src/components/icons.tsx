import Image from 'next/image';

export function LogoIcon(props: { className?: string }) {
  return (
    <Image
      src="https://i.raster.app/uglogcfw1stdna/n1XG70x1T5Q.png"
      alt="Rungroj Carrent Logo"
      width={1080}
      height={1080}
      className={props.className}
      data-ai-hint="logo"
    />
  );
}
