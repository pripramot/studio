import Image from 'next/image';

export function LogoIcon(props: { className?: string }) {
  return (
    <Image
      src="/rungroj_logo.png"
      alt="Rungroj Carrent Logo"
      width={1080}
      height={1080}
      className={props.className}
      data-ai-hint="logo"
    />
  );
}