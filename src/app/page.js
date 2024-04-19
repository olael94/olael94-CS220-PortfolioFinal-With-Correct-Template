import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WorkWidget from "@/components/WorkWidget/WorkWidget";
import SkillsWidget from "@/components/SkillsWidget/SkillsWidget";
import SignupWidget from '@/components/SignupWidget/SignupWidget';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import IntroCard from '@/components/IntroCard/IntroCard';



//Links for Footer
const links = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Uses',
    url: '/uses',
  },
];

//Intro social links
const introLinks = [
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/oliver-rivera-software-engineer/', icon: 'linkedIn.png' },
  { title: 'GitHub', url: 'https://github.com/olael94', icon: 'github.png' },
  { title: 'X', url: 'https://x.com/oliverrivera94', icon: 'x.png' },
];

//WorkWidget component needed Array
const experiences = [
  {
    logo: '/IKEA.png',
    organization: 'IKEA',
    jobTitle: 'Designer',
    startYear: 2021,
    endYear: 2021,
  },
  {
    logo: '/HB.jpeg',
    organization: 'HB Workplaces',
    jobTitle: 'Design Intern',
    startYear: 2019,
    endYear: 2020,
  },
  {
    logo: '/Teleperformance.svg',
    organization: 'Teleperformance',
    jobTitle: 'Billing Agent',
    startYear: 2015,
    endYear: 2015,
  },
  {
    logo: '/microsoft.png',
    organization: 'Microsoft',
    jobTitle: 'Software Engineer',
    startYear: 2010,
    endYear: 2011,
  },
];

//SkillsWidget component needed Array
const skills = [
  { name: 'Java', proficiency: 80, icon: 'java.png' },
  { name: 'Python', proficiency: 50, icon: 'python.png' },
  { name: 'Javascript', proficiency: 45, icon: 'javascript.png' },
];

//Project Cards needed Array
const articles = [
  {
    date: 'Nov 15, 2021',
    title: 'Everything you need to know about React',
    content:
        'The ability to build stuff in React is one of the hottest skills to have today in software engineering. There is a lot of demand for React developers among startups as well as MNCs.',
    link: 'https://medium.com/the-research-nest/everything-you-need-to-know-about-react-ab24da4275ea',
  },
  {
    date: 'Sep 2, 2020',
    title: 'The Missing Introduction to React',
    content:
        'React is the world’s most popular JavaScript framework, but it’s not cool because it’s popular. It’s popular because it’s cool. Most React introductions jump right into showing you examples of how to use React, and skip the “why”.',
    link: 'https://medium.com/javascript-scene/the-missing-introduction-to-react-62837cb2fd76',
  },
];

export default function Home() {
  return (
      <div className="body">
        <header>
          <Navbar
              options={[
                {path: '/', label: 'Home'},
                {path: '/about', label: 'About'},
                {path: '/projects', label: 'Projects'},
                {path: '/uses', label: 'Uses'},
              ]}
          />
          <ThemeSwitcher />
        </header>
        <main>
          <div className="main-container">
            <section className="intro">
              <IntroCard
                  name={'Software Engineer, Father, and Believer'}
                  logo={'Me.jpg'}
                  content={'Software Engineering student with a background in Mechatronics Engineering and Design. I`m passionate about developing functional and well-designed software. With a creative problem-solving mindset, I aim to become an outstanding full-stack developer. I`ll bring my expertise while eagerly seeking growth in the tech community.'}
                  links={introLinks}
              />
            </section>
            <section className="articles-widgets-container">
              <section className="articles-container">
                {articles.map((article, index) => (
                    <ArticleCard
                        key={index}
                        date={article.date}
                        title={article.title}
                        content={article.content}
                        link={article.link}
                    />
                ))}
              </section>
              <section className="widgets-container">
                <SignupWidget
                    title={'Stay up to date'}
                    content={'Get notified when I publish something new, and unsubscribe at any time.'}
                />
                <WorkWidget
                    title={'Work'}
                    content={'My work experience.'}
                    experiences={experiences}
                />
                <SkillsWidget
                    title="My Skills"
                    content="Here are my skills:"
                    skills={skills}
                />
              </section>
            </section>
          </div>
        </main>
        <footer>
          <Footer links={links} />
        </footer>
      </div>
  );
}
