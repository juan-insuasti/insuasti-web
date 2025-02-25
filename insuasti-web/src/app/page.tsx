import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="flex h-screen flex-col items-start justify-center">
        <h1 className="px-4 text-left text-3xl font-bold md:px-8 md:text-4xl lg:px-16 lg:text-5xl">
          Hi, I&apos;m <span className="text-green-700">Juan Insuasti</span>!
        </h1>

        <p className="mt-1 px-4 text-left text-2xl md:mt-2 md:px-8 md:text-3xl lg:mt-4 lg:px-16 lg:text-4xl">
          A Frontend Developer turning design concepts into seamless digital experiences.
        </p>
        <div className="mx-4 mt-4 flex md:mx-8 lg:mx-16">
          <Link href="https://www.linkedin.com/in/jinsuasti/" target="_blank">
            <Image src="/social-linkedin.svg" alt="Linkedin" width={40} height={40} />
          </Link>
          <Link href="https://github.com/locke189" target="_blank">
            <Image src="/social-github.svg" alt="Github" width={40} height={40} />
          </Link>
        </div>
      </div>
    </div>
  );
}
