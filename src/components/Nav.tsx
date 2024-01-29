import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

const links = [
  {
    path: '/',
    name: 'Home',
  },
  // {
  //   path: 'tours',
  //   name: 'Tours',
  // },
  {
    path: 'discography',
    name: 'Discography',
  },
  {
    path: 'blog',
    name: 'Blog',
  },
  {
    path: 'contact',
    name: 'Contact',
  },
];

const Nav = () => {

  return (
    <nav className='bg-'>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            className={`cursor-pointer border-b-2 border-transparent`}
            key={index}
            // smooth={!isDesktop ? false : true}
            // spy
            // offset={-50}
            // activeClass='active'
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;

