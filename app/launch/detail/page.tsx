import styls from "./index.module.css";
import Image from "next/image";
import Image1 from "@/images/s1.png";
import Ins from "@/images/ins.svg";
import x from "@/images/x.svg";
import Link from "next/link";

const mediaList = [
  { id: 1, img: Ins },
  { id: 2, img: x },
];

const LaunchDetail = () => {
  return (
    <div className={styls.detail}>
      <div className={styls.header}>
        <h3 className={styls.title}>
          AccessOwl: Discover every hidden SaaS app and their users
        </h3>
        <p className={styls.desc}>
          Losing track of your SaaS apps? Uncover your Shadow IT with a
          single-click
        </p>

        <div className={styls.info}>
          <div className={styls.left}>
            <Image src={Image1} alt="" width={50} height={50} />
            <span className={styls.name}>By Fernando Fierro</span>
            <span className={styls.time}>5 days ago</span>
          </div>
          <div className={styls.right}>
            {mediaList.map((item) => (
              <Link href="/" key={item.id}>
                <Image alt="" width={24} height={24} src={item.img} />
              </Link>
            ))}
          </div>
        </div>

        <div className={styls.site_info}>
          <span className={styls.site}>http://www.accessowl.io/</span>
          <span className={styls.desc}>#b2b #saas #security #compliance</span>
        </div>
      </div>

      <div className={styls.content}>
        <p className={styls.text}>
          Losing track of who has access to which apps is a nightmare.
          In Mathias Nestler and my previous roles as CTO, COO, and CEO, the
          problem usually came up in one of three ways:
        </p>
        <p className={`${styls.text} ${styls.index}`}>
          1. Missed Employee Offboardings: If I don’t know which apps the
          employee used, it’s impossible to fully offboard them. There’s nothing
          worse than finding out an employee who left for your competition still
          has access to company data.
        </p>
        <p className={`${styls.text} ${styls.index}`}>
          2. Failing Compliance: The first question an auditor will ask is what
          systems you use. Knowing where your company data lives is at the core
          of any audit.
        </p>

        <p className={`${styls.text} ${styls.index}`}>
          3.Unwanted Costs: It sucks to find out that you pay for multiple apps
          that essentially do the same. You can only keep your team accountable
          if you know what they use.
        </p>

        <p className={styls.text}>
          In the world of IT administration this challenge is called ‘Shadow IT'
          - apps you are not aware being used by your team. Historically, the
          only options have been to repeatedly ask employees to fill out a
          Gsheet with any apps they remember using or to manually search through
          Google Workspace OAuth logs.
        </p>
        <p className={styls.text}>
          Here’s a better option: Uncover all SaaS apps and their users in a
          single click!
        </p>

        <h4 className={styls.title}>Scan now!</h4>

        <p className={styls.text}>
          The Shadow IT scanner will find any SaaS app your employees use in
          combination with Google or Microsoft sign-in.
        </p>

        <h4 className={styls.title}>FAQ</h4>
        <h6 className={styls.sub_title}>Why do you offer this for free?</h6>
        <p className={styls.text}>
          Knowing who has access to what should be the standard for all of us.
          We want to bring attention to the need to manage your access
          proactively, which is why we decided to offer a part of our product
          for free.
        </p>

        <h6 className={styls.sub_title}>How does it work?</h6>
        <p className={styls.text}>
          AccessOwl reads your organization’s OAuth logs and matches them with
          our SaaS database. As a result, you’ll see which apps have been used
          and by whom.
        </p>

        <h6 className={styls.sub_title}>
          What if a user signed up with email/password and didn’t use ‘Sign in
          with Google/Microsoft’?
        </h6>
        <p className={styls.text}>
          This feature is not currently part of the free scan. However, our core
          product offers advanced Shadow IT detection, which includes checking
          for invitation emails.
        </p>

        <h6 className={styls.sub_title}>Is this safe to use?</h6>
        <p className={styls.text}>
          Yes, reading OAuth logs is common practice for SaaS management
          vendors. The data is only extracted when you actively request a scan.
          AccessOwl is SOC 2 Type II audited and GDPR compliant.
        </p>

        <h6 className={styls.sub_title}>Start your Shadow IT scan now!</h6>
        <p className={styls.text}>
          Surprised by the results? Book a free 1:1 consultation with one of the
          AccessOwl founders to learn about best practices for keeping track of
          user access!
        </p>

        <Link className={styls.btn} href={"/launch"}>See All Launches</Link>
      </div>
    </div>
  );
};
export default LaunchDetail;
