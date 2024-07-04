import Image from "next/image";
import SIcon from "@/images/s1.png";
import styls from "./index.module.css";

const list = [
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
  {
    icon: SIcon,
    title: "Mailchimp",
    desc: "Email and advertising marketing automation platform",
  },
];

const SoftworeList = () => {
  return (
    <div className={styls.list}>
      {list.map((item, index) => (
        <div className={styls.list_item} key={index}>
          <div className={styls.left}>
            <Image src={item.icon} alt="" width={36} height={36} />
          </div>
          <div className={styls.right}>
            <h3 className={styls.title}>{item.title}</h3>
            <p className={styls.desc}>
              { item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoftworeList;
